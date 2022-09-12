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
import { CreateConcertDto } from 'src/dto/create-concert.dto';
import { UpdateConcertDto } from 'src/dto/update-concert.dto';
import { ConcertService } from './concert.service';

@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource: 'concert',
  })
  async createConcert(
    @Res() response,
    @Body() createConcertDto: CreateConcertDto,
  ) {
    try {
      const newConcert = await this.concertService.createConcert(
        createConcertDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Concert has been created successfully',
        newConcert,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Concert not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'update',
    resource: 'concert',
  })
  async updateConcert(
    @Res() response,
    @Param('id') concertId: string,
    @Body() updateConcertDto: UpdateConcertDto,
  ) {
    try {
      const existingConcert = await this.concertService.updateConcert(
        concertId,
        updateConcertDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Concert has been successfully updated',
        existingConcert,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get()
  async getConcerts(@Res() response) {
    try {
      const concertData = await this.concertService.getAllConcerts();
      return response.status(HttpStatus.OK).json({
        message: 'All concerts data found successfully',
        concertData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getConcert(@Res() response, @Param('id') concertId: string) {
    try {
      const existingConcert = await this.concertService.getConcert(concertId);
      return response.status(HttpStatus.OK).json({
        message: 'Concert found successfully',
        existingConcert,
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
    resource: 'concert',
  })
  async deleteConcert(@Res() response, @Param('id') concertId: string) {
    try {
      const deletedConcert = await this.concertService.deleteConcert(concertId);
      return response.status(HttpStatus.OK).json({
        message: 'Concert deleted successfully',
        deletedConcert,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
