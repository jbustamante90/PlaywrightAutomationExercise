import { APIRequestContext, APIResponse } from "@playwright/test";

interface tokenData {
  username: string;
  password: string;
}
const url = process.env.API_URL;
export class AuthApi {
  constructor(private request: APIRequestContext) {}

  //methods
  async postAuth(data: tokenData) {
    const headers = { "Content-Type": "application/json" };
    const response = this.request.post(`${url}/auth`, {
      headers: headers,
      data: data,
    });
    return response;
  }

  async createToken(username: string, password: string) {
    const data = { username: username, password: password };
    const response = await this.postAuth(data);
    return (await response.json()).token;
  }
}
