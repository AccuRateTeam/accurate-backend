import { HttpException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { user } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {
  }

  public async createUser(userDto: CreateUserDto, email: string, authId: string): Promise<user> {
    if (await this.findUser(authId)) {
      throw new HttpException('Du hast bereits ein Profil erstellt.', 400)
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
      throw new HttpException('User konnte nicht gefunden werden.', 400);
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
    return await this.prisma.user.findFirst({
      where: {
        user_auth_id: authId
      }
    });
  }

  public async deleteUser(authId: string): Promise<user> {
    if (!(await this.findUser(authId))) {
      throw new HttpException('User konnte nicht gefunden werden.', 400);
    }

    return await this.prisma.user.delete({
      where: {
        user_auth_id: authId
      }
    });
  }
}
