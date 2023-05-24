import axios from "axios";
import Entity from "./Entity";

axios.defaults.withCredentials = false;

const createConfig = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return config;
};

export class MetaApi extends Entity {
  constructor() {
    super();
    this.basePath = "https://toptradersfunfing.com";
  }

  async get(token, accountId) {
    return await this.handlePost(`${this.basePath}`, {
      token,
      accountId,
    });
  }
}
