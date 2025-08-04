# Members API Documentation

## 📋 Endpoints

### 👥 **GET /members** - Lấy danh sách thành viên

**Query Parameters:**
- `status` (optional): `PLAYING` | `INJURED` | `HIDDEN`
- `position` (optional): `GK` | `DF` | `MF` | `FW` | `FLEX`
- `role` (optional): `CAPTAIN` | `VICE_CAPTAIN` | `PLAYER`
- `number` (optional): Tìm theo số áo

**Examples:**
```bash
# Lấy tất cả thành viên
GET /members

# Lấy thành viên đang thi đấu
GET /members?status=PLAYING

# Lấy thủ môn
GET /members?position=GK

# Lấy đội trưởng
GET /members?role=CAPTAIN

# Tìm theo số áo
GET /members?number=10
```

### 🎯 **GET /members/:id** - Lấy thông tin 1 thành viên

```bash
GET /members/60f7b3b3b3b3b3b3b3b3b3b3
```

### 📊 **GET /members/stats** - Thống kê đội hình

```bash
GET /members/stats
```

**Response:**
```json
{
  "byPosition": [
    {
      "_id": "GK",
      "count": 2,
      "playing": 2,
      "injured": 0
    },
    {
      "_id": "DF",
      "count": 8,
      "playing": 7,
      "injured": 1
    }
  ],
  "total": {
    "totalMembers": 25,
    "totalPlaying": 22,
    "totalInjured": 3,
    "captains": 1,
    "viceCaptains": 2
  }
}
```

### 🔢 **GET /members/available-numbers** - Số áo khả dụng

```bash
GET /members/available-numbers
```

**Response:**
```json
[1, 3, 5, 12, 15, 18, 22, 25, 30, ...]
```

### 🏃 **GET /members/position/:position** - Lấy theo vị trí

```bash
GET /members/position/GK
GET /members/position/DF
GET /members/position/MF
GET /members/position/FW
GET /members/position/FLEX
```

### 👑 **GET /members/role/:role** - Lấy theo vai trò

```bash
GET /members/role/CAPTAIN
GET /members/role/VICE_CAPTAIN
GET /members/role/PLAYER
```

### ➕ **POST /members** - Tạo thành viên mới

**Request Body:**
```json
{
  "fullname": "Nguyễn Văn A",
  "avatar": "https://example.com/avatar.jpg",
  "dob": "1995-05-15",
  "number": 10,
  "summary": "Tiền vệ tấn công xuất sắc với khả năng ghi bàn tốt",
  "role": "PLAYER",
  "position": "MF",
  "status": "PLAYING"
}
```

### ✏️ **PATCH /members/:id** - Cập nhật thành viên

```bash
PATCH /members/60f7b3b3b3b3b3b3b3b3b3b3
```

**Request Body:** (Partial update)
```json
{
  "position": "FW",
  "summary": "Cập nhật mô tả cầu thủ"
}
```

### 🔄 **PATCH /members/:id/status** - Cập nhật trạng thái

```bash
PATCH /members/60f7b3b3b3b3b3b3b3b3b3b3/status
```

**Request Body:**
```json
{
  "status": "INJURED"
}
```

### 🗑️ **DELETE /members/:id** - Xóa thành viên

```bash
DELETE /members/60f7b3b3b3b3b3b3b3b3b3b3
```

## 📝 Schema

### Member Schema
```typescript
{
  fullname: string;         // Họ tên đầy đủ
  avatar: string;           // URL ảnh đại diện
  dob: Date;               // Ngày sinh
  number: number;          // Số áo (1-99, unique)
  summary: string;         // Mô tả về cầu thủ
  role: MemberRole;        // Vai trò trong đội
  position: MemberPosition; // Vị trí thi đấu
  status: MemberStatus;    // Trạng thái hiện tại
  createdAt: Date;         // Tự động tạo
  updatedAt: Date;         // Tự động cập nhật
}
```

### Enums

#### MemberStatus
- `PLAYING`: Đang thi đấu
- `INJURED`: Bị chấn thương
- `HIDDEN`: Bị ẩn

#### MemberPosition
- `GK`: Thủ môn (Goalkeeper)
- `DF`: Hậu vệ (Defender)
- `MF`: Tiền vệ (Midfielder)
- `FW`: Tiền đạo (Forward)
- `FLEX`: Đa năng (Flexible)

#### MemberRole
- `CAPTAIN`: Đội trưởng
- `VICE_CAPTAIN`: Đội phó
- `PLAYER`: Cầu thủ

## 🚀 Features

✅ **CRUD Operations** - Tạo, đọc, cập nhật, xóa thành viên
✅ **Filtering** - Lọc theo trạng thái, vị trí, vai trò, số áo
✅ **Unique Jersey Numbers** - Kiểm tra số áo không trùng lặp
✅ **Squad Statistics** - Thống kê đội hình theo vị trí và trạng thái
✅ **Available Numbers** - Danh sách số áo còn trống
✅ **Position/Role Queries** - Truy vấn theo vị trí và vai trò
✅ **Validation** - Validate dữ liệu đầu vào
✅ **Error Handling** - Xử lý lỗi bằng tiếng Việt
✅ **Sorting** - Sắp xếp theo số áo

## 🔧 Validation Rules

- **fullname**: Bắt buộc, chuỗi
- **avatar**: Bắt buộc, URL ảnh
- **dob**: Bắt buộc, định dạng ngày
- **number**: Bắt buộc, số từ 1-99, không trùng lặp
- **summary**: Bắt buộc, mô tả cầu thủ
- **role**: Tùy chọn, mặc định PLAYER
- **position**: Tùy chọn, mặc định FLEX
- **status**: Tùy chọn, mặc định PLAYING
