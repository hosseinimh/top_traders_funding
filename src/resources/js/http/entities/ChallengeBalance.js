import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class ChallengeBalance extends Entity {
  constructor() {
    super();
  }

  async getAll() {
    return await this.handlePost(`${BASE_URL}/u/challenge_balances`);
  }

  async get(id) {
    return await this.handlePost(`${BASE_URL}/u/challenge_balances/show/${id}`);
  }

  async store(value) {
    return await this.handlePost(`${BASE_URL}/a/challenge_balances/store`, {
      value,
    });
  }

  async update(id, value) {
    return await this.handlePost(
      `${BASE_URL}/a/challenge_balances/update/${id}`,
      {
        value,
      }
    );
  }
}
