import * as MetaApiConnection from "./MetaApiConnection";

export class MetaApi {
  async connect(token, accountId) {
    const api = new MetaApiConnection(token);
    const account = await api.metatraderAccountApi.getAccount(accountId);
    await account.waitConnected();
    this.connection = account.getStreamingConnection();
    await this.connection.connect();
  }

  async sync2() {
    try {
      await this.connection.waitSynchronized();
      this.terminalState = this.connection.terminalState;
      if (this.terminalState.connected) {
        return {
          accountInformation: this.terminalState.accountInformation,
          positions: this.terminalState.positions,
          openOrders: this.terminalState.orders,
          historyStorage: this.connection.historyStorage,
        };
      }
    } catch {}
    return null;
  }

  async sync(token, accountId) {
    try {
      const api = new MetaApiConnection(token);
      const account = await api.metatraderAccountApi.getAccount(accountId);
      let connection = account.getRPCConnection();
      await connection.connect();
      await connection.waitSynchronized();
      return {
        accountInformation: await connection.getAccountInformation(),
        positions: await connection.getPositions(),
        openOrders: await connection.getOrders(),
        historyOrders: await connection.getHistoryOrdersByTimeRange(
          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          new Date()
        ),
        historyDeals: await connection.getDealsByTimeRange(
          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          new Date()
        ),
      };
    } catch {
      return null;
    }
  }
}
