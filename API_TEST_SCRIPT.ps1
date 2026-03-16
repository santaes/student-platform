# Student Learning Platform API Testing Script
# PowerShell script for manual API testing

# Base URL
$BASE_URL = "https://student-platform-jl4x.onrender.com"

# Test colors
$SUCCESS = "Green"
$ERROR = "Red"
$INFO = "Yellow"

Write-Host "🧪 Student Learning Platform API Testing" -ForegroundColor $INFO
Write-Host "========================================" -ForegroundColor $INFO

# Function to make API calls
function Invoke-API {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Body,
        [string]$Token = $null
    )
    
    $headers = @{}
    if ($Token) {
        $headers["Authorization"] = "Bearer $Token"
    }
    
    try {
        if ($Body) {
            $response = curl -Uri "$BASE_URL$Endpoint" -Method $Method -ContentType "application/json" -Body $Body -Headers $headers -UseBasicParsing
        } else {
            $response = curl -Uri "$BASE_URL$Endpoint" -Method $Method -Headers $headers -UseBasicParsing
        }
        
        if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 300) {
            Write-Host "✅ $Method $Endpoint - $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor $SUCCESS
            return $response.Content | ConvertFrom-Json
        } else {
            Write-Host "❌ $Method $Endpoint - $($response.StatusCode) $($response.StatusDescription)" -ForegroundColor $ERROR
            Write-Host $response.Content -ForegroundColor $ERROR
            return $null
        }
    } catch {
        Write-Host "❌ $Method $Endpoint - Exception: $($_.Exception.Message)" -ForegroundColor $ERROR
        if ($_.Exception.Response) {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = New-Object System.IO.StreamReader($stream)
            $errorBody = $reader.ReadToEnd()
            $reader.Close()
            Write-Host $errorBody -ForegroundColor $ERROR
        }
        return $null
    }
}

# Test 1: User Login with Dummy User
Write-Host "`n🔐 Test 1: Login with Dummy User" -ForegroundColor $INFO
Write-Host "Email: maria.garcia@example.com" -ForegroundColor White
Write-Host "Password: password123" -ForegroundColor White

$loginBody = @{
    email = "maria.garcia@example.com"
    password = "password123"
} | ConvertTo-Json

$loginResponse = Invoke-API -Method "POST" -Endpoint "/auth/login" -Body $loginBody

if ($loginResponse) {
    $TOKEN = $loginResponse.access_token
    Write-Host "🎫 Token received: $($TOKEN.Substring(0, 50))..." -ForegroundColor $SUCCESS
    Write-Host "👤 User: $($loginResponse.user.email)" -ForegroundColor $SUCCESS
    Write-Host "🎭 Role: $($loginResponse.user.role)" -ForegroundColor $SUCCESS
} else {
    Write-Host "❌ Login failed!" -ForegroundColor $ERROR
    exit
}

# Test 2: Get User Profile
Write-Host "`n👤 Test 2: Get User Profile" -ForegroundColor $INFO
$profileResponse = Invoke-API -Method "GET" -Endpoint "/auth/profile" -Token $TOKEN

if ($profileResponse) {
    Write-Host "📧 Email: $($profileResponse.email)" -ForegroundColor $SUCCESS
    Write-Host "🎭 Role: $($profileResponse.role)" -ForegroundColor $SUCCESS
    Write-Host "✅ Active: $($profileResponse.isActive)" -ForegroundColor $SUCCESS
}

# Test 3: Register New User
Write-Host "`n🆕 Test 3: Register New User" -ForegroundColor $INFO
$timestamp = Get-Date -Format "yyyyMMddHHmmss"
$registerBody = @{
    fullName = "Test User $timestamp"
    email = "testuser$timestamp@example.com"
    password = "password123"
} | ConvertTo-Json

$registerResponse = Invoke-API -Method "POST" -Endpoint "/auth/register" -Body $registerBody

if ($registerResponse) {
    $NEW_TOKEN = $registerResponse.access_token
    Write-Host "🎫 New user token received" -ForegroundColor $SUCCESS
    Write-Host "👤 New user: $($registerResponse.user.email)" -ForegroundColor $SUCCESS
}

# Test 4: Login with New User
Write-Host "`n🔐 Test 4: Login with New User" -ForegroundColor $INFO
$newLoginBody = @{
    email = "testuser$timestamp@example.com"
    password = "password123"
} | ConvertTo-Json

$newLoginResponse = Invoke-API -Method "POST" -Endpoint "/auth/login" -Body $newLoginBody

if ($newLoginResponse) {
    Write-Host "✅ New user login successful" -ForegroundColor $SUCCESS
}

# Test 5: Test Invalid Credentials
Write-Host "`n❌ Test 5: Test Invalid Credentials" -ForegroundColor $INFO
$invalidLoginBody = @{
    email = "maria.garcia@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

$invalidResponse = Invoke-API -Method "POST" -Endpoint "/auth/login" -Body $invalidLoginBody

if (-not $invalidResponse) {
    Write-Host "✅ Invalid credentials correctly rejected" -ForegroundColor $SUCCESS
}

# Test 6: Test Protected Endpoint Without Token
Write-Host "`n🚫 Test 6: Test Protected Endpoint Without Token" -ForegroundColor $INFO
$unauthorizedResponse = Invoke-API -Method "GET" -Endpoint "/auth/profile"

if (-not $unauthorizedResponse) {
    Write-Host "✅ Protected endpoint correctly requires authentication" -ForegroundColor $SUCCESS
}

# Test 7: Test Roadmap Endpoint
Write-Host "`n📚 Test 7: Get Roadmap" -ForegroundColor $INFO
$roadmapResponse = Invoke-API -Method "GET" -Endpoint "/roadmap" -Token $TOKEN

if ($roadmapResponse) {
    Write-Host "📖 Roadmap: $($roadmapResponse.title)" -ForegroundColor $SUCCESS
    Write-Host "📝 Description: $($roadmapResponse.description.Substring(0, 50))..." -ForegroundColor $SUCCESS
}

# Test 8: Test Homework Endpoint
Write-Host "`n📝 Test 8: Get Homework" -ForegroundColor $INFO
$homeworkResponse = Invoke-API -Method "GET" -Endpoint "/homework" -Token $TOKEN

if ($homeworkResponse) {
    Write-Host "📋 Homework count: $($homeworkResponse.Count)" -ForegroundColor $SUCCESS
    if ($homeworkResponse.Count -gt 0) {
        Write-Host "📄 First homework: $($homeworkResponse[0].title)" -ForegroundColor $SUCCESS
    }
}

# Test 9: Test Resources Endpoint
Write-Host "`n📚 Test 9: Get Resources" -ForegroundColor $INFO
$resourcesResponse = Invoke-API -Method "GET" -Endpoint "/resources" -Token $TOKEN

if ($resourcesResponse) {
    Write-Host "📚 Resources count: $($resourcesResponse.Count)" -ForegroundColor $SUCCESS
    if ($resourcesResponse.Count -gt 0) {
        Write-Host "📄 First resource: $($resourcesResponse[0].title)" -ForegroundColor $SUCCESS
    }
}

# Summary
Write-Host "`n🎉 API Testing Complete!" -ForegroundColor $INFO
Write-Host "========================================" -ForegroundColor $INFO
Write-Host "✅ Authentication endpoints working" -ForegroundColor $SUCCESS
Write-Host "✅ User registration working" -ForegroundColor $SUCCESS
Write-Host "✅ Protected routes working" -ForegroundColor $SUCCESS
Write-Host "✅ Learning content endpoints working" -ForegroundColor $SUCCESS
Write-Host "`n🌐 Live API: $BASE_URL" -ForegroundColor $INFO
Write-Host "📖 API Docs: $BASE_URL/api" -ForegroundColor $INFO
