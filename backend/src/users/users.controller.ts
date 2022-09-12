import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { CreateUsersDto } from 'src/dto/create-users.dto';
import { UpdateUsersDto } from 'src/dto/update-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource: 'users',
  })
  async createUsers(@Res() response, @Body() createUsersDto: CreateUsersDto) {
    try {
      const newUsers = await this.usersService.createUsers(createUsersDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Users has been created successfully',
        newUsers,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Users not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource: 'users',
  })
  async updateUsers(
    @Res() response,
    @Param('id') usersId: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    try {
      const existingUsers = await this.usersService.updateUsers(
        usersId,
        updateUsersDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Users has been successfully updated',
        existingUsers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'read',
    resource: 'users',
  })
  async getUserss(@Res() response) {
    try {
      const usersData = await this.usersService.getAllUserss();
      return response.status(HttpStatus.OK).json({
        message: 'All users data found successfully',
        usersData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'read',
    resource: 'users',
  })
  async getUsers(@Res() response, @Param('id') usersId: string) {
    try {
      const existingUsers = await this.usersService.getUsers(usersId);
      return response.status(HttpStatus.OK).json({
        message: 'Users found successfully',
        existingUsers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'delete',
    resource: 'users',
  })
  async deleteUsers(@Res() response, @Param('id') usersId: string) {
    try {
      const deletedUsers = await this.usersService.deleteUsers(usersId);
      return response.status(HttpStatus.OK).json({
        message: 'Users deleted successfully',
        deletedUsers,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
