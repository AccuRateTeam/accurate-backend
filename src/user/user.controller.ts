import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { user } from '@prisma/client';
import { AuthzId } from '../common/decorators/authz-id.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpGuard } from '../common/guards/http.guard';
import { HttpExceptionHandler } from '../common/exception.handlers';
import { PrivateUser } from './serializers/private-user.serializer';
import { PublicUser } from './serializers/public-user.serializer';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(HttpGuard)
  @Get(':id')
  async findUser(@Param('id') id: string): Promise<PublicUser> {
    const user = await this.userService.findUser(id);
    if (!user)
      throw new HttpException('User konnte nicht gefunden werden.', 404);
    return new PublicUser(user);
  }

  @UseGuards(HttpGuard)
  @Get()
  async ownUser(@AuthzId() authId): Promise<PrivateUser> {
    const user =  await this.userService.findUser(authId).catch(HttpExceptionHandler);
    if (!user)
      throw new HttpException('User konnte nicht gefunden werden.', 404);
    return new PrivateUser(user);
  }

  @UseGuards(HttpGuard)
  @Post()
  async createUser(
    @Body() userDto: CreateUserDto,
    @AuthzId() authId
  ): Promise<user> {
    return await this.userService
      .createUser(userDto, userDto.user_email, authId)
      .catch(HttpExceptionHandler);
  }

  @UseGuards(HttpGuard)
  @Patch()
  async updateUser(
    @Body() userDto: UpdateUserDto,
    @AuthzId() authId
  ): Promise<user> {
    return await this.userService
      .updateUser(authId, userDto)
      .catch(HttpExceptionHandler);
  }
}
