import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from 'src/dto/create-booking.dto';
import { IBooking } from 'src/interface/booking.interface';


@Injectable()
export class BookingService {
    getBookingsId: any;
    constructor(@InjectModel('Booking')private bookingModel: Model<IBooking>){}
    async createBooking(createBookingDto: CreateBookingDto): Promise<IBooking>{
        const newBooking=await new this.bookingModel(createBookingDto)
        return newBooking.save();
    }

    async deleteBooking(bookingId: string): Promise<IBooking> {
        const deletedBooking = await this.bookingModel.findByIdAndDelete(bookingId);
        return deletedBooking;
    }

    async getAllBookings(): Promise<IBooking[]> {
        const bookingData = await this.bookingModel.find();
        if (!bookingData || bookingData.length == 0) {
          throw new NotFoundException('Bookings data not found!');
        }
        return bookingData;
      }
    
   async getBookingById(bookingId:string):Promise<IBooking> {
      const bookingById=await (await this.bookingModel.findById(bookingId)).exec();
      if (!bookingById) {
        throw new NotFoundException(`Booking #${bookingId} not found`);
      }
      return bookingById;
    }
}