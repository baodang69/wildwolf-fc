# Authentication API Documentation

## 🔐 **Hệ thống Authentication hoàn chỉnh**

### ✅ **Tính năng:**
- 🔑 **JWT Authentication** - Token-based authentication
- 📱 **Facebook Login** - OAuth với Facebook
- 👥 **Role-based Authorization** - Phân quyền theo vai trò
- 🛡️ **Guards & Decorators** - Bảo vệ endpoints
- 🔒 **Password Hashing** - Mã hóa mật khẩu với bcrypt

---

## 📋 **API Endpoints**

### 🔓 **Public Endpoints (Không cần token)**

#### **POST /auth/register** - Đăng ký
```bash
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "fullname": "Nguyễn Văn A",
  "club": "WildWolf FC",
  "phone": "0123456789",
  "password": "password123",
  "role": "USER"  // Optional: USER, ADMIN, MANAGER
}
```

**Response:**
```json
{
  "message": "Đăng ký thành công",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "fullname": "Nguyễn Văn A",
    "club": "WildWolf FC",
    "phone": "0123456789",
    "role": "USER"
  }
}
```

#### **POST /auth/login** - Đăng nhập
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Đăng nhập thành công",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "email": "user@example.com",
    "fullname": "Nguyễn Văn A",
    "club": "WildWolf FC",
    "phone": "0123456789",
    "role": "USER"
  }
}
```

#### **GET /auth/facebook** - Đăng nhập Facebook
```bash
GET /auth/facebook
```
> Redirect đến Facebook OAuth

#### **GET /auth/facebook/callback** - Facebook callback
```bash
GET /auth/facebook/callback
```
> Xử lý callback từ Facebook và redirect về frontend với token

#### **POST /auth/validate-token** - Kiểm tra token
```bash
POST /auth/validate-token
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔒 **Protected Endpoints (Cần token)**

#### **GET /auth/profile** - Thông tin người dùng
```bash
GET /auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### **GET /auth/admin-only** - Chỉ Admin
```bash
GET /auth/admin-only
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
> Chỉ user có role `ADMIN` mới truy cập được

#### **GET /auth/manager-only** - Admin hoặc Manager
```bash
GET /auth/manager-only
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```
> Chỉ user có role `ADMIN` hoặc `MANAGER` mới truy cập được

---

## 🛡️ **Guards & Decorators**

### **@Public()** - Endpoint công khai
```typescript
@Public()
@Get('public-endpoint')
async publicEndpoint() {
  return { message: 'Ai cũng truy cập được' };
}
```

### **@UseGuards(JwtAuthGuard)** - Cần JWT token
```typescript
@UseGuards(JwtAuthGuard)
@Get('protected')
async protectedEndpoint(@CurrentUser() user: any) {
  return { message: 'Cần đăng nhập', user };
}
```

### **@Roles()** - Phân quyền theo role
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get('admin-only')
async adminOnly() {
  return { message: 'Chỉ admin' };
}
```

### **@CurrentUser()** - Lấy thông tin user hiện tại
```typescript
@UseGuards(JwtAuthGuard)
@Get('me')
async getCurrentUser(@CurrentUser() user: any) {
  return user;
}
```

---

## 🔧 **Cách sử dụng trong Controllers khác**

### **Bảo vệ toàn bộ controller:**
```typescript
@Controller('members')
@UseGuards(JwtAuthGuard) // Tất cả endpoints cần đăng nhập
export class MembersController {
  
  @Public() // Ngoại lệ: endpoint này công khai
  @Get('public-list')
  async getPublicList() {}
  
  @Roles(UserRole.ADMIN) // Chỉ admin
  @Post()
  async create() {}
}
```

### **Bảo vệ từng endpoint:**
```typescript
@Controller('blogs')
export class BlogsController {
  
  @Get() // Công khai
  async findAll() {}
  
  @UseGuards(JwtAuthGuard) // Cần đăng nhập
  @Post()
  async create(@CurrentUser() user: any) {}
  
  @UseGuards(JwtAuthGuard, RolesGuard) // Cần đăng nhập + role
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @Delete(':id')
  async delete() {}
}
```

---

## 🌐 **User Roles**

- **USER** - Người dùng thông thường
- **MANAGER** - Quản lý
- **ADMIN** - Quản trị viên

---

## 🔑 **JWT Token Format**

**Payload:**
```json
{
  "sub": "user_id",
  "email": "user@example.com", 
  "role": "USER",
  "iat": 1640995200,
  "exp": 1641600000
}
```

**Expires:** 7 ngày

---

## 🚀 **Test Commands**

```bash
# Đăng ký
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "fullname": "Test User",
    "club": "Test Club",
    "phone": "0123456789",
    "password": "password123"
  }'

# Đăng nhập
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Truy cập endpoint bảo vệ
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## ⚙️ **Environment Variables**

```env
JWT_SECRET=wildwolf-super-secret-key-2025
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
FRONTEND_URL=http://localhost:3001
```

Hệ thống authentication đã sẵn sàng! 🔐🚀
