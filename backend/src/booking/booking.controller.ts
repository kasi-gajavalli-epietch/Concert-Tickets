import {
  Body,
  Controller,
  Res,
  Injectable,
  Post,
  HttpStatus,
  Delete,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from 'src/dto/create-booking.dto';
import { UpdateBookingDto } from 'src/dto/update-booking.dto';
import { response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createBooking(
    @Res() response,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    try {
      const newBooking = await this.bookingService.createBooking(
        createBookingDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'You have made a new Booking for this concert!',
        newBooking,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Problem with your booking!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  // @UseGuards(AuthGuard('jwt'), ACGuard)
  // @UseRoles({
  //   possession: 'any',
  //   action: 'read',
  //   resource: 'bookings',
  // })
  async getAllBookings(@Res() response) {
    try {
      const bookingData = await this.bookingService.getAllBookings();
      return response.status(HttpStatus.OK).json({
        message: 'All bookings data found successfully',
        bookingData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getBookingsId(@Res() response, @Param('id') bookingId: string) {
    try {
      const bookingById = await this.bookingService.getBookingsId(bookingId);
      return response.status(HttpStatus.OK).json({
        message: 'Data found',
        bookingById,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'), ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'read',
    resource: 'bookings',
  })
  async deleteBooking(@Res() response, @Param('id') bookingId: string) {
    const deletedBooking = await this.bookingService.deleteBooking(bookingId);
    return response.status(HttpStatus.OK).json({
      message: 'Booking is deleted',
      deletedBooking,
    });
  }
}
