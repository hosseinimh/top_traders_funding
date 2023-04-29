import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class ChallengeServer extends Entity {
  constructor() {
    super();
  }

  async getAll() {
    return await this.handlePost(`${BASE_URL}/u/challenge_servers`);
  }

  async get(id) {
    return await this.handlePost(`${BASE_URL}/u/challenge_servers/show/${id}`);
  }

  async store(name, title) {
    return await this.handlePost(`${BASE_URL}/a/challenge_servers/store`, {
      name,
      title,
    });
  }

  async update(id, name, title) {
    return await this.handlePost(
      `${BASE_URL}/a/challenge_servers/update/${id}`,
      {
        name,
        title,
      }
    );
  }
}
