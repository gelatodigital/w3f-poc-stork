const axios = require("axios");

export class PullServiceClient {
  client: any;

  constructor(baseURL: any, authToken: string) {
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        Authorization: `Basic ${authToken}`,
      },
    });
  }

  async getLatestPrice(assets: string) {
    try {
      const response = await this.client.get(
        `/v1/prices/latest?assets=${assets}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
