import { beforeEach } from "node:test";
import { test, expect } from "../fixtures/base";
import bookingBody from "../api/reqBodys/booking.json";

const username = process.env.API_USER!;
const password = process.env.API_PASSWORD!;
let token: string;

test.beforeEach(async ({ apis }) => {
  //authentication
  token = await apis.auth.createToken(username, password);
});

test("API Test", async ({ apis }) => {
  const bookingApi = apis.booking;

  //create booking
  const postResp = await bookingApi.createBooking(bookingBody);
  expect(postResp.status()).toBe(200);
  const id = (await postResp.json()).bookingid;

  //read booking
  const getResp = await bookingApi.readBooking(id);
  expect(await getResp.json()).toEqual(bookingBody);

  //update booking
  let data = bookingBody;
  data.bookingdates.checkout = "2019-01-07";
  const pustResp = await bookingApi.updateBooking(id, token, data);
  expect(await pustResp.json()).toEqual(data);

  //delete booking
  const deleteResp = await bookingApi.deleteBooking(id, token);
  expect(deleteResp.status()).toBe(201);
  const checkResp = await bookingApi.readBooking(id);
  expect(checkResp.status()).toBe(404);
});
