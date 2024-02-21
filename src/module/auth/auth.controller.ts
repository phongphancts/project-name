import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserAuthDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create_account.dto';


@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {

    constructor(private readonly authService: AuthService){}
  
    @Post("/login")
    async Login(@Body() loginUserAuthDto: LoginUserAuthDto) {
        
      return this.authService.login(loginUserAuthDto.email, loginUserAuthDto.password);
    }

    @Post("signup")
    async SignUp(@Body() createUserDTO: CreateUserDto) {
      return this.authService.signUp(createUserDTO);
    }

}
