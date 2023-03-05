import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }
    
    @UseGuards(JwtAuthGuard)  // этот декоратор с параметром стратегии JwtAuthGuard обеспечивает доступ к роту по accessToken
    @Post('/test')
    test() {
        return true;
    }

}
