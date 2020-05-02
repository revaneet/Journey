import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.interface';

@Injectable()
export class BookingService{
    url = 'http://localhost:53056/api/Booking';

    constructor(private http: HttpClient) {}

    async postBooking(booking:Booking)
    {
        return this.http.post(this.url,booking);
    }
    async getBookingById(bookingId:string)
    {                           
        return this.http.get<Booking>(this.url+`/${bookingId}`);
    }
}