# Simple API Test Script
$BASE_URL = "https://student-platform-jl4x.onrender.com"

Write-Host "Testing Student Learning Platform API..." -ForegroundColor Yellow

# Test 1: Login
Write-Host "`n1. Testing Login..." -ForegroundColor Cyan
try {
    $loginResponse = curl -Uri "$BASE_URL/auth/login" -Method POST -ContentType "application/json" -Body '{"email":"maria.garcia@example.com","password":"password123"}' -UseBasicParsing
    if ($loginResponse.StatusCode -eq 201) {
        Write-Host "Login successful!" -ForegroundColor Green
        $token = ($loginResponse.Content | ConvertFrom-Json).access_token
        Write-Host "Token: $token" -ForegroundColor Green
    } else {
        Write-Host "Login failed!" -ForegroundColor Red
    }
} catch {
    Write-Host "Login error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Register
Write-Host "`n2. Testing Registration..." -ForegroundColor Cyan
try {
    $timestamp = Get-Date -Format "yyyyMMddHHmmss"
    $registerResponse = curl -Uri "$BASE_URL/auth/register" -Method POST -ContentType "application/json" -Body "{""fullName"":""Test User $timestamp"",""email"":""testuser$timestamp@example.com"",""password"":""password123""}" -UseBasicParsing
    if ($registerResponse.StatusCode -eq 201) {
        Write-Host "Registration successful!" -ForegroundColor Green
    } else {
        Write-Host "Registration failed!" -ForegroundColor Red
        Write-Host "Status: $($registerResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "Registration error: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Protected endpoint
Write-Host "`n3. Testing Protected Endpoint..." -ForegroundColor Cyan
try {
    $profileResponse = curl -Uri "$BASE_URL/auth/profile" -Method GET -Headers @{Authorization="Bearer $token"} -UseBasicParsing
    if ($profileResponse.StatusCode -eq 200) {
        Write-Host "Profile access successful!" -ForegroundColor Green
    } else {
        Write-Host "Profile access failed!" -ForegroundColor Red
    }
} catch {
    Write-Host "Profile error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`nAPI Testing Complete!" -ForegroundColor Yellow
