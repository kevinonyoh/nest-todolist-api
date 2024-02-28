/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  
  async signIn(data: CreateAuthDto){
       const {email, password} = data;
       
       const user = await this.usersService.getUserByEmail(email);

       if(!user) throw new UnauthorizedException("This user does not exist");

      const val = bcrypt.compareSync(password, user?.password);

      if(!val) throw new UnauthorizedException("Incorrect password");

      const accessToken = await this.jwtService.signAsync({ id: user.id, email });
      
  
      return { accessToken }  

  }
}
