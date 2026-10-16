import { APIRequestContext, APIResponse } from "@playwright/test";
import bookingBody from "./reqBodys/booking.json";
const url = process.env.API_URL;

export class BookingApi {
  constructor(private request: APIRequestContext) {}

  //methods
  async createBooking(data: typeof bookingBody) {
    const headers = {
      "Content-Type": "application/json",
    };
    const resp = await this.request.post(`${url}/booking`, {
      headers: headers,
      data: data,
    });
    return resp;
  }

  async readBooking(id: string) {
    const headers = {
      Accept: "application/json",
    };
    const resp = await this.request.get(`${url}/booking/${id}`, {
      headers: headers,
    });
    return resp;
  }

  async updateBooking(id: string, token: string, data: typeof bookingBody) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    };
    const resp = await this.request.put(`${url}/booking/${id}`, {
      headers: headers,
      data: data,
    });
    return resp;
  }

  async deleteBooking(id: string, token: string) {
    const headers = {
      "Content-Type": "application/json",
      Cookie: `token=${token}`,
    };
    const resp = await this.request.delete(`${url}/booking/${id}`, {
      headers: headers,
    });
    return resp;
  }
}
