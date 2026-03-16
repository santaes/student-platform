# Manual API Testing Guide

## 🧪 Quick Start

The Student Learning Platform API is fully functional and ready for manual testing!

### 🌐 **Live Endpoints**
- **Backend**: https://student-platform-jl4x.onrender.com
- **API Docs**: https://student-platform-jl4x.onrender.com/api
- **Frontend**: https://student-platform-frontend-71i9.onrender.com

---

## 🚀 **Quick Test Commands**

### **1. Login Test**
```bash
curl -X POST https://student-platform-jl4x.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria.garcia@example.com","password":"password123"}'
```

### **2. Register New User**
```bash
curl -X POST https://student-platform-jl4x.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"password123"}'
```

### **3. Get User Profile** (requires token)
```bash
# First get token from login, then:
curl -X GET https://student-platform-jl4x.onrender.com/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📋 **Complete Test Results**

### ✅ **Authentication Tests**
- **Login**: ✅ Working (201 status)
- **Registration**: ✅ Working (201 status) 
- **Profile Access**: ✅ Working with valid token (200 status)
- **Invalid Login**: ✅ Properly rejected (401 status)
- **Unauthorized Access**: ✅ Protected routes require token (401 status)

### ✅ **Content Tests**
- **Roadmap**: ✅ User can access learning roadmaps
- **Homework**: ✅ User can view homework assignments
- **Resources**: ✅ User can access learning resources

---

## 🎯 **Testing Workflows**

### **Workflow 1: Complete User Journey**
```bash
# 1. Register new user
curl -X POST https://student-platform-jl4x.onrender.com/auth/register \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","email":"john@example.com","password":"password123"}'

# 2. Login with new user
curl -X POST https://student-platform-jl4x.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# 3. Access protected content (use token from step 2)
curl -X GET https://student-platform-jl4x.onrender.com/auth/profile \
  -H "Authorization: Bearer TOKEN_FROM_STEP_2"
```

### **Workflow 2: Dummy User Testing**
```bash
# Login with existing dummy user
curl -X POST https://student-platform-jl4x.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"maria.garcia@example.com","password":"password123"}'

# Access learning content
curl -X GET https://student-platform-jl4x.onrender.com/roadmap \
  -H "Authorization: Bearer TOKEN_FROM_LOGIN"
```

---

## 🔧 **PowerShell Testing Script**

Run this script for comprehensive testing:
```powershell
# Save as test_api.ps1 and run:
powershell -ExecutionPolicy Bypass -File test_api.ps1

# Or use the included script:
powershell -ExecutionPolicy Bypass -File simple_api_test.ps1
```

---

## 📊 **Test Results Summary**

| Endpoint | Method | Status | Description |
|----------|--------|--------|-------------|
| `/auth/login` | POST | ✅ 201 | User authentication |
| `/auth/register` | POST | ✅ 201 | User registration |
| `/auth/profile` | GET | ✅ 200 | User profile (protected) |
| `/roadmap` | GET | ✅ 200 | Learning roadmap (protected) |
| `/homework` | GET | ✅ 200 | Homework list (protected) |
| `/resources` | GET | ✅ 200 | Learning resources (protected) |

---

## 🛠️ **Testing Tools**

### **1. Swagger UI**
- Visit: https://student-platform-jl4x.onrender.com/api
- Interactive API testing in browser
- Auto-generated documentation

### **2. Postman**
- Import curl commands as requests
- Save authentication tokens
- Create test collections

### **3. Browser DevTools**
- Open Network tab
- Monitor API calls from frontend
- Debug request/response headers

---

## 🔍 **Debugging Tips**

### **Common Issues & Solutions**

1. **401 Unauthorized**
   - Check if token is valid
   - Verify Authorization header format: `Bearer TOKEN`
   - Ensure token hasn't expired

2. **400 Bad Request**
   - Check JSON syntax
   - Verify required fields are present
   - Ensure email format is valid

3. **CORS Issues**
   - Backend allows all origins currently
   - Check if frontend URL is correct

### **Error Response Format**
```json
{
  "message": "Error description",
  "error": "Error type",
  "statusCode": 400
}
```

---

## 🎉 **Success Indicators**

### **Working Correctly When:**
- ✅ Login returns 201 status with JWT token
- ✅ Registration creates new user account
- ✅ Protected endpoints require valid token
- ✅ User can access learning content
- ✅ Invalid credentials are rejected
- ✅ Frontend and backend communicate without CORS errors

### **Test Data**
- **Dummy User 1**: maria.garcia@example.com / password123
- **Dummy User 2**: oleks.petrov@example.com / password123
- **New Users**: Can register any valid email

---

## 📱 **Mobile Testing**

### **Testing with Mobile Apps**
```bash
# Use these endpoints for mobile app integration:
POST /auth/login
POST /auth/register  
GET /auth/profile
GET /roadmap
GET /homework
GET /resources
```

### **Headers Required**
```
Content-Type: application/json
Authorization: Bearer <jwt-token>
```

---

## 🚀 **Production Ready**

The API is fully deployed and production-ready:
- ✅ Authentication system working
- ✅ Database seeded with content
- ✅ CORS properly configured
- ✅ Error handling implemented
- ✅ Security measures in place

**Ready for integration with any client application!** 🎯
