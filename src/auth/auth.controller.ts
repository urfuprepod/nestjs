import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    this.authService.login(userDto)
  }

  @Post('/login')
  registration(@Body() userDto: CreateUserDto) {
    this.authService.registration(userDto);
  }
}
