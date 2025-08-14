# Match với Upload Ảnh API

## 🚀 **API Tạo Match + Upload Ảnh Cùng Lúc**

### **Endpoint:**
```
POST /matches/create-with-images
Content-Type: multipart/form-data
```

### **Request Body (Form Data):**

#### **Files:**
- `images` - Multiple files (tối đa 10 ảnh)

#### **Text Fields:**
- `opponent` - Tên đối thủ (required)
- `stadium` - Sân vận động (required)
- `summary` - Tóm tắt trận đấu (required)
- `our_goal` - Số bàn thắng của chúng ta (required)
- `opponent_goal` - Số bàn thắng đối thủ (required)
- `date` - Ngày giờ thi đấu (required, ISO format)
- `opponent_avatar` - URL logo đối thủ (optional)
- `status` - Trạng thái (optional: FINISH, COMING_SOON, HIDDEN)
- `our_scorer` - JSON string của cầu thủ ghi bàn (optional)
- `opponent_scorer` - JSON string của cầu thủ đối thủ ghi bàn (optional)

### **Ví dụ sử dụng:**

#### **1. Postman/Insomnia:**
```
Method: POST
URL: http://localhost:3000/matches/create-with-images
Body: form-data

Key: images | Type: File | Value: [chọn nhiều file ảnh]
Key: opponent | Type: Text | Value: Arsenal FC
Key: stadium | Type: Text | Value: Emirates Stadium
Key: summary | Type: Text | Value: Trận đấu hấp dẫn giữa hai đội
Key: our_goal | Type: Text | Value: 2
Key: opponent_goal | Type: Text | Value: 1
Key: date | Type: Text | Value: 2025-08-15T19:00:00.000Z
Key: status | Type: Text | Value: FINISH
Key: our_scorer | Type: Text | Value: [{"name":"Nguyễn Văn A","number_of_goal":1,"id":"60f7b3b3b3b3b3b3b3b3b3b3"}]
Key: opponent_scorer | Type: Text | Value: [{"name":"John Smith","number_of_goal":1}]
```

#### **2. JavaScript/Frontend:**
```javascript
const formData = new FormData();

// Thêm files
const fileInput = document.getElementById('images');
for (let i = 0; i < fileInput.files.length; i++) {
  formData.append('images', fileInput.files[i]);
}

// Thêm text data
formData.append('opponent', 'Arsenal FC');
formData.append('stadium', 'Emirates Stadium');
formData.append('summary', 'Trận đấu hấp dẫn');
formData.append('our_goal', '2');
formData.append('opponent_goal', '1');
formData.append('date', '2025-08-15T19:00:00.000Z');
formData.append('status', 'FINISH');

// Thêm scorer data (JSON string)
const ourScorer = [
  {
    name: "Nguyễn Văn A",
    number_of_goal: 1,
    id: "60f7b3b3b3b3b3b3b3b3b3b3"
  }
];
formData.append('our_scorer', JSON.stringify(ourScorer));

const opponentScorer = [
  {
    name: "John Smith", 
    number_of_goal: 1
  }
];
formData.append('opponent_scorer', JSON.stringify(opponentScorer));

// Gửi request
fetch('http://localhost:3000/matches/create-with-images', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch(error => {
  console.error('Error:', error);
});
```

#### **3. React Example:**
```jsx
const [files, setFiles] = useState([]);
const [matchData, setMatchData] = useState({
  opponent: '',
  stadium: '',
  summary: '',
  our_goal: 0,
  opponent_goal: 0,
  date: ''
});

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const formData = new FormData();
  
  // Thêm files
  files.forEach(file => {
    formData.append('images', file);
  });
  
  // Thêm match data
  Object.keys(matchData).forEach(key => {
    formData.append(key, matchData[key]);
  });
  
  try {
    const response = await fetch('/matches/create-with-images', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    console.log('Match created:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

return (
  <form onSubmit={handleSubmit}>
    <input 
      type="file" 
      multiple 
      accept="image/*"
      onChange={(e) => setFiles([...e.target.files])}
    />
    <input 
      type="text" 
      placeholder="Đối thủ"
      value={matchData.opponent}
      onChange={(e) => setMatchData({...matchData, opponent: e.target.value})}
    />
    {/* Các input khác... */}
    <button type="submit">Tạo Match với Ảnh</button>
  </form>
);
```

### **Response:**
```json
{
  "message": "Tạo trận đấu với ảnh thành công",
  "match": {
    "_id": "60f7b3b3b3b3b3b3b3b3b3b3",
    "opponent": "Arsenal FC",
    "stadium": "Emirates Stadium",
    "summary": "Trận đấu hấp dẫn",
    "our_goal": 2,
    "opponent_goal": 1,
    "images": [
      "https://res.cloudinary.com/xxx/image/upload/v1234567890/wildwolf/matches/abc123.jpg",
      "https://res.cloudinary.com/xxx/image/upload/v1234567890/wildwolf/matches/def456.jpg"
    ],
    "date": "2025-08-15T19:00:00.000Z",
    "status": "FINISH",
    "our_scorer": [...],
    "opponent_scorer": [...],
    "createdAt": "2025-08-14T10:00:00.000Z",
    "updatedAt": "2025-08-14T10:00:00.000Z"
  },
  "uploadedImages": [
    "https://res.cloudinary.com/xxx/image/upload/v1234567890/wildwolf/matches/abc123.jpg",
    "https://res.cloudinary.com/xxx/image/upload/v1234567890/wildwolf/matches/def456.jpg"
  ]
}
```

## 🔧 **Tính năng:**

✅ **Upload nhiều ảnh cùng lúc** (tối đa 10 ảnh)
✅ **Tự động resize ảnh** (1200x800, chất lượng auto)
✅ **Lưu ảnh lên Cloudinary** với folder organized
✅ **Validation đầy đủ** cho tất cả fields
✅ **Transform data** từ string sang number/object
✅ **Populate scorer info** tự động
✅ **Error handling** chi tiết

## 📝 **Lưu ý:**

1. **File size limit**: Tùy thuộc vào cấu hình Cloudinary
2. **File types**: Chỉ accept image files
3. **JSON fields**: `our_scorer` và `opponent_scorer` phải là JSON string hợp lệ
4. **Date format**: ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
5. **Status values**: FINISH, COMING_SOON, HIDDEN

## 🚀 **Ưu điểm:**

- **Một request duy nhất** thay vì nhiều requests
- **Atomic operation** - tạo match và upload ảnh cùng lúc
- **Better UX** - người dùng không cần chờ upload ảnh riêng
- **Consistent data** - đảm bảo match luôn có ảnh nếu upload thành công
