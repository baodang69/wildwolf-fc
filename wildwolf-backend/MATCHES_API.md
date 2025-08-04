# Matches API Documentation

## 📋 Endpoints

### 🏆 **GET /matches** - Lấy danh sách trận đấu

**Query Parameters:**
- `status` (optional): `FINISH` | `COMING_SOON` | `HIDDEN`
- `opponent` (optional): Tìm kiếm theo tên đối thủ
- `startDate` (optional): Ngày bắt đầu (YYYY-MM-DD)
- `endDate` (optional): Ngày kết thúc (YYYY-MM-DD)

**Examples:**
```bash
# Lấy tất cả trận đấu
GET /matches

# Lấy trận đấu đã kết thúc
GET /matches?status=FINISH

# Tìm kiếm theo đối thủ
GET /matches?opponent=Arsenal

# Lấy trận đấu trong khoảng thời gian
GET /matches?startDate=2025-01-01&endDate=2025-12-31
```

### 🎯 **GET /matches/:id** - Lấy thông tin 1 trận đấu

```bash
GET /matches/60f7b3b3b3b3b3b3b3b3b3b3
```

### 📊 **GET /matches/stats** - Lấy thống kê trận đấu

```bash
GET /matches/stats
```

**Response:**
```json
{
  "totalMatches": 25,
  "totalWins": 15,
  "totalDraws": 5,
  "totalLosses": 5,
  "totalGoalsScored": 45,
  "totalGoalsConceded": 20
}
```

### ➕ **POST /matches** - Tạo trận đấu mới

**Request Body:**
```json
{
  "opponent": "Arsenal FC",
  "stadium": "Emirates Stadium",
  "opponent_avatar": "https://example.com/arsenal-logo.png",
  "summary": "Trận đấu hấp dẫn giữa hai đội bóng hàng đầu",
  "our_goal": 2,
  "opponent_goal": 1,
  "images": [
    "https://example.com/match1.jpg",
    "https://example.com/match2.jpg"
  ],
  "date": "2025-08-15T19:00:00.000Z",
  "status": "FINISH",
  "our_scorer": [
    {
      "name": "Nguyễn Văn A",
      "number_of_goal": 1,
      "id": "60f7b3b3b3b3b3b3b3b3b3b3"
    },
    {
      "name": "Trần Văn B", 
      "number_of_goal": 1,
      "id": "60f7b3b3b3b3b3b3b3b3b3b4"
    }
  ],
  "opponent_scorer": [
    {
      "name": "John Smith",
      "number_of_goal": 1
    }
  ]
}
```

### ✏️ **PATCH /matches/:id** - Cập nhật trận đấu

```bash
PATCH /matches/60f7b3b3b3b3b3b3b3b3b3b3
```

**Request Body:** (Partial update)
```json
{
  "our_goal": 3,
  "summary": "Cập nhật tóm tắt trận đấu"
}
```

### 🔄 **PATCH /matches/:id/status** - Cập nhật trạng thái

```bash
PATCH /matches/60f7b3b3b3b3b3b3b3b3b3b3/status
```

**Request Body:**
```json
{
  "status": "FINISH"
}
```

### 🗑️ **DELETE /matches/:id** - Xóa trận đấu

```bash
DELETE /matches/60f7b3b3b3b3b3b3b3b3b3b3
```

## 📝 Schema

### Match Schema
```typescript
{
  opponent: string;           // Tên đối thủ
  our_scorer: OurScorer[];   // Danh sách cầu thủ ghi bàn của chúng ta
  stadium: string;           // Sân vận động
  opponent_avatar: string;   // Logo đối thủ
  opponent_scorer: OpponentScorer[]; // Danh sách cầu thủ ghi bàn đối thủ
  summary: string;           // Tóm tắt trận đấu
  our_goal: number;          // Số bàn thắng của chúng ta
  opponent_goal: number;     // Số bàn thắng đối thủ
  images: string[];          // Danh sách hình ảnh
  date: Date;               // Ngày giờ thi đấu
  status: Status;           // Trạng thái trận đấu
  createdAt: Date;          // Tự động tạo
  updatedAt: Date;          // Tự động cập nhật
}
```

### OurScorer Schema
```typescript
{
  name: string;             // Tên cầu thủ
  number_of_goal: number;   // Số bàn thắng (min: 1)
  id: ObjectId;            // ID cầu thủ (ref: Member)
}
```

### OpponentScorer Schema
```typescript
{
  name: string;             // Tên cầu thủ đối thủ
  number_of_goal: number;   // Số bàn thắng (min: 1)
}
```

### Status Enum
- `FINISH`: Trận đấu đã kết thúc
- `COMING_SOON`: Trận đấu sắp diễn ra
- `HIDDEN`: Trận đấu bị ẩn

## 🚀 Features

✅ **CRUD Operations** - Tạo, đọc, cập nhật, xóa trận đấu
✅ **Filtering** - Lọc theo trạng thái, đối thủ, thời gian
✅ **Population** - Tự động populate thông tin cầu thủ ghi bàn
✅ **Statistics** - Thống kê tổng quan về trận đấu
✅ **Validation** - Validate dữ liệu đầu vào
✅ **Error Handling** - Xử lý lỗi bằng tiếng Việt
