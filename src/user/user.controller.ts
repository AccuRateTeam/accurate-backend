import {Body, Controller, Get, HttpException, Patch, Post, UseGuards} from "@nestjs/common";
import { user } from "@prisma/client";
import { AuthzId } from "../authz/authz-id.decorator";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {HttpGuard} from '../authz/http.guard';
import {ApiException} from '../api.exception';
import {HttpExceptionHandler} from '../exception.handlers';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @UseGuards(HttpGuard)
  @Get()
  async ownUser(@AuthzId() authId): Promise<user> {
    return this.userService.findUser(authId).catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Post()
  async createUser(@Body() userDto: CreateUserDto, @AuthzId() authId): Promise<user> {
    return await this.userService.createUser(userDto, userDto.user_email, authId).catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Patch()
  async updateUser(@Body() userDto: UpdateUserDto, @AuthzId() authId): Promise<user> {
    return this.userService.updateUser(userDto, authId).catch(HttpExceptionHandler);
  }
}
