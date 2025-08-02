import { NextRequest, NextResponse } from 'next/server';

// Dữ liệu user giả lập - thay thế bằng database thực tế
const mockUsers = [
  {
    id: '1',
    email: 'admin@wildwolffc.com',
    password: 'admin123', // Trong thực tế, mật khẩu phải được hash
    name: 'Quản trị viên',
    role: 'Admin',
  },
  {
    id: '2',
    email: 'player@wildwolffc.com',
    password: 'player123',
    name: 'Cầu thủ WildWolf',
    role: 'Player',
  },
  {
    id: '3',
    email: 'coach@wildwolffc.com',
    password: 'coach123',
    name: 'Huấn luyện viên',
    role: 'Coach',
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Kiểm tra input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      );
    }

    // Tìm user
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }

    // Tạo token giả lập - trong thực tế sử dụng JWT
    const token = `mock-token-${user.id}-${Date.now()}`;

    // Trả về thông tin user (không bao gồm mật khẩu)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
      message: 'Đăng nhập thành công',
    });
  } catch (error) {
    console.error('Lỗi API login:', error);
    return NextResponse.json(
      { error: 'Lỗi server nội bộ' },
      { status: 500 }
    );
  }
}
