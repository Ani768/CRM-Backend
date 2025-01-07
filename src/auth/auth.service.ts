import { Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/users.entities";
import { Repository } from "typeorm/repository/Repository";
import * as bcrypt from 'bcrypt';


@Injectable({})
export class AuthService{
    constructor(
        @InjectRepository(User)
        private readonly userRespoditory: Repository<User>,
        private readonly jwtService: JwtService
    ){}
    
    async register(name:string,email:string,password:string){
        const exisitngUser = await this.userRespoditory.findOne({where:{email}});
        if(exisitngUser){
            throw new UnauthorizedException('Email is already registered');
        }
        const hashedPassowrd = await bcrypt.hash(password,10);
        const newUser = this.userRespoditory.create({name,email,password:hashedPassowrd});
        await this.userRespoditory.save(newUser);
        return{message:'User created successfuly'};
    }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRespoditory.findOne({ where: { email } });
        if (user && (await bcrypt.compare(password, user.password))) {
          return user; 
        }
        throw new UnauthorizedException('Invalid credentials');
      }

    async login(user:User){
        const payload = {sub:user.id,email:user.email};
        return {accesstoken: this.jwtService.sign(payload)};
    }  

}