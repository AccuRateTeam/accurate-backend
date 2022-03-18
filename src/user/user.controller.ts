import {Body, Controller, Get, HttpException, Patch, Post, UseGuards} from "@nestjs/common";
import { user } from "@prisma/client";
import { AuthzId } from "../authz/authz-id.decorator";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {HttpGuard} from '../authz/http.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @UseGuards(HttpGuard)
  @Get()
  async ownUser(@AuthzId() authId): Promise<user> {
    const user = this.userService.findUser(authId);
    if (!user) {
      throw new HttpException('User konnte nicht gefunden werden.', 404);
    }

    return user;
  }

  @UseGuards(HttpGuard)
  @Post()
  async createUser(@Body() userDto: CreateUserDto, @AuthzId() authId): Promise<user> {
    return await this.userService.createUser(userDto, userDto.user_email, authId);
  }

  @UseGuards(HttpGuard)
  @Patch()
  async updateUser(@Body() userDto: UpdateUserDto, @AuthzId() authId): Promise<user> {
    return this.userService.updateUser(userDto, authId);
  }
}
