import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { UserRole } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
      role: registerDto.role || UserRole.USER,
    });

    const payload = { sub: user._id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Đăng ký thành công',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Đăng nhập thành công',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        club: user.club,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async facebookLogin(facebookUser: any) {
    if (!facebookUser.email) {
      throw new UnauthorizedException('Không thể lấy email từ Facebook');
    }

    // Tìm user theo email
    let user = await this.usersService.findByEmail(facebookUser.email);

    if (!user) {
      // Tạo user mới từ Facebook
      user = await this.usersService.create({
        email: facebookUser.email,
        fullname: facebookUser.fullname,
        club: '',
        phone: '',
        password: await bcrypt.hash(Math.random().toString(36), 12), // Random password
        role: UserRole.USER,
      });
    }

    // Tạo JWT token
    const payload = { sub: user._id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return {
      message: 'Đăng nhập Facebook thành công',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
        club: user.club,
        phone: user.phone,
        role: user.role,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Token không hợp lệ');
      }

      return {
        valid: true,
        user: {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
          club: user.club,
          phone: user.phone,
          role: user.role,
        },
      };
    } catch (error) {
      return {
        valid: false,
        message: 'Token không hợp lệ hoặc đã hết hạn',
      };
    }
  }
}
