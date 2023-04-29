import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class ChallengeLeverage extends Entity {
  constructor() {
    super();
  }

  async getAll() {
    return await this.handlePost(`${BASE_URL}/u/challenge_leverages`);
  }

  async get(id) {
    return await this.handlePost(
      `${BASE_URL}/u/challenge_leverages/show/${id}`
    );
  }

  async store(value) {
    return await this.handlePost(`${BASE_URL}/a/challenge_leverages/store`, {
      value,
    });
  }

  async update(id, value) {
    return await this.handlePost(
      `${BASE_URL}/a/challenge_leverages/update/${id}`,
      {
        value,
      }
    );
  }
}
