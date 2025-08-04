# Contacts API Documentation

## 🎯 **Tính năng đặc biệt: Tự động tạo trận đấu**

Khi status của appointment được set thành `CONFIRMED`, hệ thống sẽ **tự động tạo một trận đấu** với dữ liệu mặc định từ schema matches.

---

## 📋 Endpoints

### 📅 **GET /contacts** - Lấy danh sách lịch hẹn

**Query Parameters:**
- `status` (optional): `PENDING` | `CONFIRMED` | `CANCELLED`
- `opponent` (optional): ID của đối thủ
- `startDate` (optional): Ngày bắt đầu (YYYY-MM-DD)
- `endDate` (optional): Ngày kết thúc (YYYY-MM-DD)

**Examples:**
```bash
# Lấy tất cả lịch hẹn
GET /contacts

# Lấy lịch hẹn đang chờ xác nhận
GET /contacts?status=PENDING

# Lấy lịch hẹn của một đối thủ
GET /contacts?opponent=60f7b3b3b3b3b3b3b3b3b3b3

# Lấy lịch hẹn trong khoảng thời gian
GET /contacts?startDate=2025-08-01&endDate=2025-08-31
```

### 🎯 **GET /contacts/:id** - Lấy thông tin 1 lịch hẹn

```bash
GET /contacts/60f7b3b3b3b3b3b3b3b3b3b3
```

### 📊 **GET /contacts/stats** - Thống kê lịch hẹn

```bash
GET /contacts/stats
```

**Response:**
```json
{
  "byStatus": [
    {
      "_id": "PENDING",
      "count": 5
    },
    {
      "_id": "CONFIRMED", 
      "count": 3
    }
  ],
  "total": {
    "totalAppointments": 10,
    "pending": 5,
    "confirmed": 3,
    "cancelled": 2
  }
}
```

### ⏰ **GET /contacts/upcoming** - Lịch hẹn sắp tới

```bash
# Lấy lịch hẹn trong 7 ngày tới (mặc định)
GET /contacts/upcoming

# Lấy lịch hẹn trong 14 ngày tới
GET /contacts/upcoming?days=14
```

### ➕ **POST /contacts** - Tạo lịch hẹn mới

**Request Body:**
```json
{
  "opponent": "60f7b3b3b3b3b3b3b3b3b3b3",
  "appointmenttime": "2025-08-15T19:00:00.000Z",
  "stadium": "Sân vận động Mỹ Đình",
  "note": "Trận đấu giao hữu",
  "status": "PENDING",
  "opponent_club": "Arsenal FC"
}
```

### ✏️ **PATCH /contacts/:id** - Cập nhật lịch hẹn

```bash
PATCH /contacts/60f7b3b3b3b3b3b3b3b3b3b3
```

**Request Body:** (Partial update)
```json
{
  "stadium": "Sân vận động Quốc gia",
  "note": "Cập nhật ghi chú"
}
```

**⚡ Tự động tạo trận đấu:**
```json
{
  "status": "CONFIRMED"
}
```
> Khi set status = "CONFIRMED", hệ thống sẽ tự động tạo trận đấu!

### 🔄 **PATCH /contacts/:id/status** - Cập nhật trạng thái

```bash
PATCH /contacts/60f7b3b3b3b3b3b3b3b3b3b3/status
```

**Request Body:**
```json
{
  "status": "CONFIRMED"
}
```

### ✅ **PATCH /contacts/:id/confirm** - Xác nhận lịch hẹn (Shortcut)

```bash
PATCH /contacts/60f7b3b3b3b3b3b3b3b3b3b3/confirm
```

> **Tự động tạo trận đấu** khi gọi endpoint này!

### ❌ **PATCH /contacts/:id/cancel** - Hủy lịch hẹn (Shortcut)

```bash
PATCH /contacts/60f7b3b3b3b3b3b3b3b3b3b3/cancel
```

### 🗑️ **DELETE /contacts/:id** - Xóa lịch hẹn

```bash
DELETE /contacts/60f7b3b3b3b3b3b3b3b3b3b3
```

---

## 🤖 **Auto Match Creation Logic**

Khi appointment được **CONFIRMED**, hệ thống tự động tạo trận đấu với:

### 📝 **Dữ liệu được copy:**
- `opponent`: Lấy từ `opponent_club` hoặc `opponent.fullname`
- `stadium`: Copy từ appointment
- `date`: Copy từ `appointmenttime`
- `summary`: "Trận đấu được tạo tự động từ lịch hẹn. {note}"

### 🔧 **Dữ liệu mặc định:**
- `our_scorer`: `[]` (mảng rỗng)
- `opponent_scorer`: `[]` (mảng rỗng)
- `our_goal`: `0`
- `opponent_goal`: `0`
- `images`: `[]` (mảng rỗng)
- `opponent_avatar`: `""` (chuỗi rỗng)
- `status`: `COMING_SOON`

---

## 📝 Schema

### Appointment Schema
```typescript
{
  opponent: ObjectId;          // Ref to User
  appointmenttime: Date;       // Thời gian hẹn
  stadium: string;            // Sân vận động
  note: string;               // Ghi chú (default: "Chưa có ghi chú")
  status: AppointmentStatus;  // Trạng thái
  opponent_club: string;      // Tên câu lạc bộ đối thủ
  createdAt: Date;           // Tự động tạo
  updatedAt: Date;           // Tự động cập nhật
}
```

### AppointmentStatus Enum
- `PENDING`: Đang chờ xác nhận
- `CONFIRMED`: Đã xác nhận ⚡ **Tự động tạo trận đấu**
- `CANCELLED`: Đã hủy

---

## 🚀 Features

✅ **CRUD Operations** - Tạo, đọc, cập nhật, xóa lịch hẹn
✅ **Auto Match Creation** - Tự động tạo trận đấu khi confirm
✅ **Filtering** - Lọc theo trạng thái, đối thủ, thời gian
✅ **Population** - Tự động populate thông tin đối thủ
✅ **Statistics** - Thống kê lịch hẹn theo trạng thái
✅ **Upcoming Events** - Lấy lịch hẹn sắp tới
✅ **Shortcut Actions** - Confirm/Cancel nhanh
✅ **Validation** - Validate dữ liệu đầu vào
✅ **Error Handling** - Xử lý lỗi bằng tiếng Việt

---

## 🔥 **Workflow Example**

```bash
# 1. Tạo lịch hẹn mới
POST /contacts
{
  "opponent": "60f7b3b3b3b3b3b3b3b3b3b3",
  "appointmenttime": "2025-08-15T19:00:00.000Z",
  "stadium": "Sân Mỹ Đình",
  "opponent_club": "Arsenal FC"
}

# 2. Xác nhận lịch hẹn (TỰ ĐỘNG TẠO TRẬN ĐẤU)
PATCH /contacts/{id}/confirm

# 3. Kiểm tra trận đấu đã được tạo
GET /matches?status=COMING_SOON
```

**🎯 Kết quả:** Trận đấu mới được tạo tự động với status `COMING_SOON`!
