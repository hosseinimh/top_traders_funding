import { BASE_URL, PAGE_ITEMS } from "../../constants";
import Entity from "./Entity";

export class Challenge extends Entity {
  constructor() {
    super();
  }

  async getPaginate(_pn = 1, _pi = PAGE_ITEMS) {
    return await this.handlePost(`${BASE_URL}/a/challenges`, {
      _pn,
      _pi,
    });
  }

  async getPaginateFromUser(_pn = 1, _pi = PAGE_ITEMS) {
    return await this.handlePost(`${BASE_URL}/u/challenges`, {
      _pn,
      _pi,
    });
  }

  async take(level) {
    return await this.handlePost(`${BASE_URL}/u/challenges/take`, {
      level,
    });
  }

  async store(balanceId, serverId, platformId, leverageId, level) {
    return await this.handlePost(
      `${BASE_URL}/u/challenges/store/${balanceId}/${serverId}/${platformId}/${leverageId}`,
      {
        level,
      }
    );
  }

  async changeStatus(id) {
    return await this.handlePost(
      `${BASE_URL}/a/challenges/change_status/${id}`
    );
  }
}
