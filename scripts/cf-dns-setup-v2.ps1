$ErrorActionPreference = "Stop"

$ZONE_ID = "c584fe27d80aaa8a9237ca2fb857cd9c"
$ACCT_ID = "1fb4ac9a140c6e18cf7c8d3c5854aaa9"
$DOMAIN = "egepenakcayapi.com"
$PAGES_DOMAIN = "egepenakcayap--com2.pages.dev"
$PAGES_PROJECT = "egepenakcayap--com2"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Cloudflare DNS Setup - $DOMAIN" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tarayicida API Token sayfasi aciliyor..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Adimlar:" -ForegroundColor Green
Write-Host '  1. "Create Token" tikla' -ForegroundColor White
Write-Host '  2. "Edit zone DNS" satirinda "Use template" tikla' -ForegroundColor White
Write-Host '  3. Zone Resources: Specific zone > egepenakcayapi.com' -ForegroundColor White
Write-Host '  4. "Continue to summary" > "Create Token"' -ForegroundColor White
Write-Host '  5. Token kopyala, buraya yapistir' -ForegroundColor White
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

# Step 1: Verify token
Write-Host ""
Write-Host "[1/5] Token dogrulaniyor..." -ForegroundColor Yellow
try {
    $verify = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/user/tokens/verify" -Headers $headers
    Write-Host "  Token gecerli! Status: $($verify.result.status)" -ForegroundColor Green
} catch {
    Write-Host "  Token gecersiz veya suresi dolmus!" -ForegroundColor Red
    exit 1
}

# Step 2: List existing DNS records
Write-Host ""
Write-Host "[2/5] Mevcut DNS kayitlari kontrol ediliyor..." -ForegroundColor Yellow
try {
    $records = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Headers $headers
    Write-Host "  $($records.result.Count) kayit bulundu" -ForegroundColor Green
    foreach ($r in $records.result) {
        Write-Host "    $($r.type)`t$($r.name)`t-> $($r.content)" -ForegroundColor Gray
    }
} catch {
    Write-Host "  DNS kayitlari alinamadi: $_" -ForegroundColor Red
    exit 1
}

# Step 3: Add root CNAME
Write-Host ""
Write-Host "[3/5] Root CNAME ekleniyor (@) -> $PAGES_DOMAIN..." -ForegroundColor Yellow
$rootExists = $records.result | Where-Object { $_.name -eq $DOMAIN -and $_.type -eq "CNAME" }
if ($rootExists) {
    if ($rootExists.content -ne $PAGES_DOMAIN) {
        Write-Host "  Mevcut kayit guncelleniyor..." -ForegroundColor Yellow
        $body = @{ type = "CNAME"; name = "@"; content = $PAGES_DOMAIN; proxied = $true } | ConvertTo-Json
        try {
            $null = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($rootExists.id)" -Method Patch -Headers $headers -Body $body
            Write-Host "  Root CNAME guncellendi!" -ForegroundColor Green
        } catch { Write-Host "  Guncelleme hatasi: $_" -ForegroundColor Red }
    } else {
        Write-Host "  Root CNAME zaten dogru sekilde mevcut" -ForegroundColor Green
    }
} else {
    $body = @{ type = "CNAME"; name = "@"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        $null = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Method Post -Headers $headers -Body $body
        Write-Host "  Root CNAME basariyla eklendi!" -ForegroundColor Green
    } catch {
        Write-Host "  Root CNAME eklenemedi: $_" -ForegroundColor Red
    }
}

# Step 4: Add www CNAME
Write-Host ""
Write-Host "[4/5] WWW CNAME ekleniyor -> $PAGES_DOMAIN..." -ForegroundColor Yellow
$wwwExists = $records.result | Where-Object { $_.name -eq "www.$DOMAIN" -and $_.type -eq "CNAME" }
if ($wwwExists) {
    if ($wwwExists.content -ne $PAGES_DOMAIN) {
        Write-Host "  Mevcut kayit guncelleniyor..." -ForegroundColor Yellow
        $body = @{ type = "CNAME"; name = "www"; content = $PAGES_DOMAIN; proxied = $true } | ConvertTo-Json
        try {
            $null = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$($wwwExists.id)" -Method Patch -Headers $headers -Body $body
            Write-Host "  WWW CNAME guncellendi!" -ForegroundColor Green
        } catch { Write-Host "  Guncelleme hatasi: $_" -ForegroundColor Red }
    } else {
        Write-Host "  WWW CNAME zaten dogru sekilde mevcut" -ForegroundColor Green
    }
} else {
    $body = @{ type = "CNAME"; name = "www"; content = $PAGES_DOMAIN; proxied = $true; ttl = 1 } | ConvertTo-Json
    try {
        $null = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" -Method Post -Headers $headers -Body $body
        Write-Host "  WWW CNAME basariyla eklendi!" -ForegroundColor Green
    } catch {
        Write-Host "  WWW CNAME eklenemedi: $_" -ForegroundColor Red
    }
}

# Step 5: Check custom domain status
Write-Host ""
Write-Host "[5/5] Custom domain durumu kontrol ediliyor..." -ForegroundColor Yellow

# Use wrangler token for pages API (it has pages:write)
$cfgPath = Join-Path $env:APPDATA "xdg.config\.wrangler\config\default.toml"
$cfg = [System.IO.File]::ReadAllText($cfgPath)
$null = $cfg -match 'oauth_token\s*=\s*"([^"]+)"'
$wranglerToken = $Matches[1]

$pagesHeaders = @{
    "Authorization" = "Bearer $wranglerToken"
    "Content-Type" = "application/json"
}

try {
    $domains = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/accounts/$ACCT_ID/pages/projects/$PAGES_PROJECT/domains" -Headers $pagesHeaders
    foreach ($d in $domains.result) {
        $status = if ($d.status -eq "active") { "Green" } else { "Yellow" }
        Write-Host "  $($d.name): status=$($d.status), verify=$($d.verification_data.status), ssl=$($d.validation_data.status)" -ForegroundColor $status
    }
} catch {
    Write-Host "  Custom domain durumu alinamadi" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  ISLEM TAMAMLANDI!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  DNS degisiklikleri birkac dakika icinde yayilacak." -ForegroundColor White
Write-Host "  Site: https://$DOMAIN" -ForegroundColor Cyan
Write-Host "  WWW:  https://www.$DOMAIN" -ForegroundColor Cyan
Write-Host ""
