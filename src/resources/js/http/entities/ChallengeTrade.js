import { BASE_URL } from "../../constants";
import Entity from "./Entity";

export class ChallengeTrade extends Entity {
  constructor() {
    super();
  }

  async store(challengeId, trades) {
    return await this.handlePost(
      `${BASE_URL}/u/challenge_trades/store/${challengeId}`,
      {
        trades,
      }
    );
  }
}
