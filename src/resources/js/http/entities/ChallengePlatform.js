import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class ChallengePlatform extends Entity {
  constructor() {
    super();
  }

  async getAll() {
    return await this.handlePost(`${BASE_URL}/u/challenge_platforms`);
  }

  async get(id) {
    return await this.handlePost(
      `${BASE_URL}/u/challenge_platforms/show/${id}`
    );
  }

  async store(value) {
    return await this.handlePost(`${BASE_URL}/a/challenge_platforms/store`, {
      value,
    });
  }

  async update(id, value) {
    return await this.handlePost(
      `${BASE_URL}/a/challenge_platforms/update/${id}`,
      {
        value,
      }
    );
  }
}
