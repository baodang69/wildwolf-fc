import { OmitType } from '@nestjs/mapped-types';
import { CreateMatchDto } from './create-match.dto';

// Khi tạo trận đấu với ảnh, chúng ta không cần trường 'images' trong DTO
// vì file ảnh sẽ được xử lý riêng bởi FileInterceptor.
export class CreateMatchWithImagesDto extends OmitType(CreateMatchDto, [
  'images',
] as const) {}
