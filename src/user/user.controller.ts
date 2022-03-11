import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { user } from "@prisma/client";
import { AuthGuard } from "@nestjs/passport";
import { AuthzId } from "../authz-id.decorator";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async ownUser(@AuthzId() authId): Promise<user> {
    return this.userService.findUser(authId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createUser(@Body() userDto: CreateUserDto, @AuthzId() authId): Promise<user> {
    return await this.userService.createUser(userDto, 'max@mustermann.com', authId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateUser(@Body() userDto: UpdateUserDto, @AuthzId() authId): Promise<user> {
    return this.userService.updateUser(userDto, authId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@AuthzId() authId): Promise<user> {
    return this.userService.deleteUser(authId);
  }
}
