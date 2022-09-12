import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConcertSchema } from './schema/concert.schema';
import { ConcertService } from './concert/concert.service';
import { ConcertController } from './concert/concert.controller';
import { UsersSchema } from './schema/users.schema';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './auth/user-roles';
import { BookingModule } from './booking/booking.module';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { BookingSchema } from './schema/booking.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema}]),
    MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema}]),
    MongooseModule.forFeature([{name: 'Booking', schema: BookingSchema}]),
    UserModule,
    AuthModule,
    AccessControlModule.forRoles(roles),
    BookingModule
  ],
  controllers: [AppController, ConcertController, UsersController, BookingController],
  providers: [AppService, ConcertService, UsersService, BookingService],
})
export class AppModule {}