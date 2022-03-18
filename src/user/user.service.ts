import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { user } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import {ApiException} from '../api.exception';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {
  }

  public async createUser(userDto: CreateUserDto, email: string, authId: string): Promise<user> {
    if (await this.findUser(authId)) {
      throw new ApiException('Du hast bereits ein Profil erstellt.', 400)
    }

    if (await this.prisma.user.findFirst({
      where: {
        user_email: email
      }
    })) {
      throw new ApiException('Diese E-Mail Adresse wird bereits verwendet.', 400);
    }

    return await this.prisma.user.create({
      data: {
        user_name: userDto.user_name,
        user_email: email,
        user_auth_id: authId
      }
    });
  }

  public async updateUser(userDto: UpdateUserDto, authId: string): Promise<user> {
    if (!(await this.findUser(authId))) {
      throw new ApiException('User konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.user.update({
      where: {
        user_auth_id: authId,
      },
      data: {
        user_name: userDto.user_name
      }
    });
  }

  public async findUser(authId: string): Promise<user> {
    const user = await this.prisma.user.findFirst({
      where: {
        user_auth_id: authId
      }
    });
    if (!user) {
      throw new ApiException('Event konnte nicht gefunden werden.', 404);
    }
    return user;
  }

  public async deleteUser(authId: string): Promise<user> {
    if (!(await this.findUser(authId))) {
      throw new ApiException('User konnte nicht gefunden werden.', 404);
    }

    return await this.prisma.user.delete({
      where: {
        user_auth_id: authId
      }
    });
  }
}
