$ErrorActionPreference = "Stop"

$ZONE_ID = "eb9c646f745f401bf12f0722fe86b9bf"
$DOMAIN = "egepenakcayapi.com"
$PAGES_DOMAIN = "akcapen-yeni.pages.dev"

Write-Host "=== Cloudflare DNS Setup (API Token) ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "API Token gerekli. Olusturmak icin:" -ForegroundColor Yellow
Write-Host '  1. Tarayicida acilan sayfada "Create Token" tiklayin' -ForegroundColor White
Write-Host '  2. "Edit zone DNS" sablonunda "Use template" tiklayin' -ForegroundColor White
Write-Host '  3. Zone: "Specific zone" > "egepenakcayapi.com" secin' -ForegroundColor White
Write-Host '  4. "Continue to summary" > "Create Token" tiklayin' -ForegroundColor White
Write-Host '  5. Token kopyalayin ve buraya yapistirun' -ForegroundColor White
Write-Host ""

Start-Process "https://dash.cloudflare.com/profile/api-tokens"
Start-Sleep -Seconds 2

$token = Read-Host "API Token'i yapistirun"

if (-not $token -or $token.Length -lt 10) {
    Write-Host "Gecersiz token!" -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

# Verify token
Write-Host ""
Write-Host "[1/4] Token dogrulaniyor..." -ForegroundColor Yellow
try {
    $verify = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/user/tokens/verify" -Headers $headers -Method Get
    Write-Host "       Token gecerli! Status: $($verify.result.status)" -ForegroundColor Green
} catch {
    Write-Host "       Token gecersiz!" -ForegroundColor Red
    exit 1
}

# List existing DNS
Write-Host "[2/4] Mevcut DNS kayitlari..." -ForegroundColor Yellow
try {
    $dnsRes = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=50" -Headers $headers -Method Get
    Write-Host "       $($dnsRes.result.Count) kayit bulundu"
    foreach ($r in $dnsRes.result) {
        Write-Host "       $($r.type)`t$($r.name)`t-> $($r.content)" -ForegroundColor DarkGray
    }
} catch {
    Write-Host "       DNS okunamadi: $_" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Add root CNAME
Write-Host "[3/4] DNS kayitlari ekleniyor..." -ForegroundColor Yellow
$existingRoot = $dnsRes.result | Where-Object { $_.name -eq $DOMAIN -and ($_.type -eq "CNAME" -or $_.type -eq "A") }
if ($existingRoot -and $existingRoot.content -eq $PAGES_DOMAIN) {
    Write-Host "       Root CNAME zaten dogru" -ForegroundColor Green
} elseif ($existingRoot) {
    $body = @{ type = "CNAME"; name = "@"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($existingRoot.id)" -Headers $headers -Method Patch -Body $body | Out-Null
        Write-Host "       Root CNAME guncellendi!" -ForegroundColor Green
    } catch { Write-Host "       Root guncelleme hatasi: $_" -ForegroundColor Red }
} else {
    $body = @{ type = "CNAME"; name = "@"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Headers $headers -Method Post -Body $body | Out-Null
        Write-Host "       Root CNAME eklendi: $DOMAIN -> $PAGES_DOMAIN" -ForegroundColor Green
    } catch { Write-Host "       Root ekleme hatasi: $_" -ForegroundColor Red }
}

# Add www CNAME
$existingWww = $dnsRes.result | Where-Object { $_.name -eq "www.$DOMAIN" -and ($_.type -eq "CNAME" -or $_.type -eq "A") }
if ($existingWww -and $existingWww.content -eq $PAGES_DOMAIN) {
    Write-Host "       www CNAME zaten dogru" -ForegroundColor Green
} elseif ($existingWww) {
    $body = @{ type = "CNAME"; name = "www"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($existingWww.id)" -Headers $headers -Method Patch -Body $body | Out-Null
        Write-Host "       www CNAME guncellendi!" -ForegroundColor Green
    } catch { Write-Host "       www guncelleme hatasi: $_" -ForegroundColor Red }
} else {
    $body = @{ type = "CNAME"; name = "www"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Headers $headers -Method Post -Body $body | Out-Null
        Write-Host "       www CNAME eklendi: www.$DOMAIN -> $PAGES_DOMAIN" -ForegroundColor Green
    } catch { Write-Host "       www ekleme hatasi: $_" -ForegroundColor Red }
}
Write-Host ""

# Final check
Write-Host "[4/4] Son durum..." -ForegroundColor Yellow
$finalDns = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=50" -Headers $headers -Method Get
foreach ($r in $finalDns.result) {
    Write-Host "       $($r.type)`t$($r.name)`t-> $($r.content)`t(proxied:$($r.proxied))" -ForegroundColor White
}

$zone = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" -Headers $headers -Method Get -ErrorAction SilentlyContinue
Write-Host ""
Write-Host "       Zone: $($zone.result.status)" -ForegroundColor White
Write-Host "       NS: $($zone.result.name_servers -join ', ')" -ForegroundColor Cyan

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "TAMAMLANDI!" -ForegroundColor Green
Write-Host "Domain registrar'da NS degistirin:" -ForegroundColor Yellow
Write-Host "  jule.ns.cloudflare.com" -ForegroundColor Cyan
Write-Host "  lamar.ns.cloudflare.com" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Green
