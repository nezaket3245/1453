$ErrorActionPreference = "Stop"

# Config
$PORT = 8976
$CLIENT_ID = "54d11594-84e4-41aa-b438-e81b8fa78ee7"
$REDIRECT_URI = "http://localhost:${PORT}/oauth/callback"
$ACCT_ID = "2f8a9910120689f4f86f06fb6637f9b2"
$ZONE_ID = "eb9c646f745f401bf12f0722fe86b9bf"
$DOMAIN = "egepenakcayapi.com"
$PAGES_DOMAIN = "akcapen-yeni.pages.dev"
$SCOPES = "account:read user:read workers:write workers_kv:write workers_routes:write workers_scripts:write workers_tail:read d1:write pages:write zone:read zone:edit ssl_certs:write ai:write queues:write pipelines:write offline_access"

# PKCE
$rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
$codeVerifierBytes = New-Object byte[] 32
$rng.GetBytes($codeVerifierBytes)
$codeVerifier = [Convert]::ToBase64String($codeVerifierBytes) -replace '\+','-' -replace '/','_' -replace '='
$sha256 = [System.Security.Cryptography.SHA256Managed]::new()
$challengeBytes = $sha256.ComputeHash([System.Text.Encoding]::ASCII.GetBytes($codeVerifier))
$codeChallenge = [Convert]::ToBase64String($challengeBytes) -replace '\+','-' -replace '/','_' -replace '='
$state = -join ((1..32) | ForEach-Object { '{0:x}' -f (Get-Random -Maximum 16) })

$authUrl = "https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=$CLIENT_ID&redirect_uri=$([uri]::EscapeDataString($REDIRECT_URI))&scope=$([uri]::EscapeDataString($SCOPES))&state=$state&code_challenge=$codeChallenge&code_challenge_method=S256"

Write-Host "=== Cloudflare DNS Setup (PowerShell) ===" -ForegroundColor Cyan
Write-Host ""

# Start HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:${PORT}/")
$listener.Start()
Write-Host "[1/6] HTTP listener baslatildi (port $PORT)" -ForegroundColor Green

# Open browser
Write-Host "[2/6] Tarayici aciliyor..." -ForegroundColor Yellow
Start-Process $authUrl
Write-Host "        >>> TARAYICIDA 'Allow' BUTONUNA TIKLAYIN <<<" -ForegroundColor Red
Write-Host ""

# Wait for callback
Write-Host "       Callback bekleniyor..." -ForegroundColor DarkGray
$context = $listener.GetContext()
$request = $context.Request
$rawUrl = $request.RawUrl
Write-Host "       Callback URL: $rawUrl" -ForegroundColor DarkGray

$code = $null
if ($rawUrl -match '[?&]code=([^&]+)') {
    $code = $Matches[1]
}
$returnedState = $null
if ($rawUrl -match '[?&]state=([^&]+)') {
    $returnedState = $Matches[1]
}

# Send response to browser
$response = $context.Response
$responseString = "<html><body><h2>Basarili! Bu sayfayi kapatabilirsiniz.</h2></body></html>"
$buffer = [System.Text.Encoding]::UTF8.GetBytes($responseString)
$response.ContentLength64 = $buffer.Length
$response.ContentType = "text/html; charset=utf-8"
$response.OutputStream.Write($buffer, 0, $buffer.Length)
$response.Close()
$listener.Stop()

if (-not $code) {
    Write-Host "HATA: Authorization code alinamadi!" -ForegroundColor Red
    exit 1
}
Write-Host "[3/6] Authorization code alindi!" -ForegroundColor Green

# Exchange code for token
Write-Host "       Token aliniyor..." -ForegroundColor Yellow
$tokenBody = "grant_type=authorization_code&code=$code&redirect_uri=$([uri]::EscapeDataString($REDIRECT_URI))&client_id=$CLIENT_ID&code_verifier=$codeVerifier"
$tokenRes = Invoke-RestMethod -Uri "https://dash.cloudflare.com/oauth2/token" -Method Post -ContentType "application/x-www-form-urlencoded" -Body $tokenBody
$token = $tokenRes.access_token

if (-not $token) {
    Write-Host "HATA: Token alinamadi!" -ForegroundColor Red
    exit 1
}
Write-Host "       Token alindi! Scopes: $($tokenRes.scope)" -ForegroundColor Green
Write-Host ""

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# Step 4: Add DNS records
Write-Host "[4/6] DNS kayitlari ekleniyor..." -ForegroundColor Yellow

# Check existing records
try {
    $dnsRes = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=50" -Headers $headers -Method Get
    Write-Host "       Mevcut kayit sayisi: $($dnsRes.result.Count)"
    foreach ($r in $dnsRes.result) {
        Write-Host "       $($r.type)`t$($r.name)`t-> $($r.content)" -ForegroundColor DarkGray
    }
} catch {
    Write-Host "       DNS okuma hatasi: $_" -ForegroundColor Red
}

# Add root CNAME (@)
$existingRoot = $dnsRes.result | Where-Object { $_.name -eq $DOMAIN -and ($_.type -eq "CNAME" -or $_.type -eq "A") }
if ($existingRoot -and $existingRoot.content -eq $PAGES_DOMAIN) {
    Write-Host "       Root CNAME zaten dogru" -ForegroundColor Green
} elseif ($existingRoot) {
    Write-Host "       Root kayit guncelleniyor..."
    $body = @{ type = "CNAME"; name = "@"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        $upd = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($existingRoot.id)" -Headers $headers -Method Patch -Body $body
        Write-Host "       Root CNAME guncellendi!" -ForegroundColor Green
    } catch { Write-Host "       Guncelleme hatasi: $_" -ForegroundColor Red }
} else {
    Write-Host "       Root CNAME ekleniyor: $DOMAIN -> $PAGES_DOMAIN"
    $body = @{ type = "CNAME"; name = "@"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        $add = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Headers $headers -Method Post -Body $body
        Write-Host "       Root CNAME eklendi!" -ForegroundColor Green
    } catch { Write-Host "       Ekleme hatasi: $_" -ForegroundColor Red }
}

# Add www CNAME
$existingWww = $dnsRes.result | Where-Object { $_.name -eq "www.$DOMAIN" -and ($_.type -eq "CNAME" -or $_.type -eq "A") }
if ($existingWww -and $existingWww.content -eq $PAGES_DOMAIN) {
    Write-Host "       www CNAME zaten dogru" -ForegroundColor Green
} elseif ($existingWww) {
    Write-Host "       www kayit guncelleniyor..."
    $body = @{ type = "CNAME"; name = "www"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        $upd = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($existingWww.id)" -Headers $headers -Method Patch -Body $body
        Write-Host "       www CNAME guncellendi!" -ForegroundColor Green
    } catch { Write-Host "       Guncelleme hatasi: $_" -ForegroundColor Red }
} else {
    Write-Host "       www CNAME ekleniyor: www.$DOMAIN -> $PAGES_DOMAIN"
    $body = @{ type = "CNAME"; name = "www"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        $add = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Headers $headers -Method Post -Body $body
        Write-Host "       www CNAME eklendi!" -ForegroundColor Green
    } catch { Write-Host "       Ekleme hatasi: $_" -ForegroundColor Red }
}
Write-Host ""

# Step 5: SSL settings
Write-Host "[5/6] SSL ayarlari yapiliyor..." -ForegroundColor Yellow
try {
    $sslBody = '{"value":"full"}' 
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl" -Headers $headers -Method Patch -Body $sslBody | Out-Null
    Write-Host "       SSL: Full" -ForegroundColor Green
} catch { Write-Host "       SSL ayarlanamadi" -ForegroundColor DarkYellow }

try {
    $httpsBody = '{"value":"on"}'
    Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/always_use_https" -Headers $headers -Method Patch -Body $httpsBody | Out-Null
    Write-Host "       Always HTTPS: ON" -ForegroundColor Green
} catch { Write-Host "       HTTPS ayarlanamadi" -ForegroundColor DarkYellow }
Write-Host ""

# Step 6: Final check
Write-Host "[6/6] Son durum kontrolu..." -ForegroundColor Yellow
try {
    $finalDns = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=50" -Headers $headers -Method Get
    Write-Host "       DNS Kayitlari:"
    foreach ($r in $finalDns.result) {
        Write-Host "       $($r.type)`t$($r.name)`t-> $($r.content)`t(proxied:$($r.proxied))" -ForegroundColor White
    }
} catch { Write-Host "       DNS okunamadi" -ForegroundColor DarkYellow }

try {
    $zone = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" -Headers $headers -Method Get
    Write-Host ""
    Write-Host "       Zone Status: $($zone.result.status)" -ForegroundColor White
    Write-Host "       Nameservers:" -ForegroundColor White
    foreach ($ns in $zone.result.name_servers) { Write-Host "         $ns" -ForegroundColor Cyan }
} catch {}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "TAMAMLANDI!" -ForegroundColor Green
Write-Host ""
Write-Host "Domain registrar'da NS kayitlarini degistirin:" -ForegroundColor Yellow
Write-Host "  NS1: jule.ns.cloudflare.com" -ForegroundColor Cyan
Write-Host "  NS2: lamar.ns.cloudflare.com" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
