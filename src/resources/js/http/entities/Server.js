import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class Server extends Entity {
  constructor() {
    super();
  }

  async getAll() {
    return await this.handlePost(`${BASE_URL}/u/servers`);
  }

  async get(id) {
    return await this.handlePost(`${BASE_URL}/u/servers/show/${id}`);
  }

  async store(name, title) {
    return await this.handlePost(`${BASE_URL}/a/servers/store`, {
      name,
      title,
    });
  }

  async update(id, name, title) {
    return await this.handlePost(`${BASE_URL}/a/servers/update/${id}`, {
      name,
      title,
    });
  }
}
