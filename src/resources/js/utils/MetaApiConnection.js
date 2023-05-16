// import * as MetaApi from "./MetaApiConnection2";

export class MetaApiConnection {
  async connect(token, accountId) {
    try {
      const api = new window["MetaApi"](token);
      const account = await api.metatraderAccountApi.getAccount(accountId);
      await account.waitConnected();
      this.connection = account.getStreamingConnection();
      await this.connection.connect();
    } catch (e) {
      console.log(e);
    }
  }
  /*
  async sync() {
    try {
      await this.connection.waitSynchronized();
      return {
        accountInformation: await this.connection.getAccountInformation(),
        positions: await this.connection.getPositions(),
        openOrders: await this.connection.getOrders(),
        historyOrders: await this.connection.getHistoryOrdersByTimeRange(
          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          new Date()
        ),
        deals: await this.connection.getDealsByTimeRange(
          new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
          new Date()
        ),
      };
    } catch {
      return null;
    }
  }
*/
  async testMetaApiSynchronization(token, accountId) {
    try {
      // const MetaApi = window["MetaApi"];
      const api = new window["MetaApi"](token);
      console.log(api.metatraderAccountApi);
      const account = await api.metatraderAccountApi.getAccount(accountId);

      console.log(
        "Waiting for API server to connect to broker (may take couple of minutes)"
      );
      await account.waitConnected();

      // connect to MetaApi API
      let connection = account.getRPCConnection();
      await connection.connect();

      // wait until terminal state synchronized to the local state
      console.log(
        "Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)"
      );
      await connection.waitSynchronized();

      // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
      console.log("Testing MetaAPI RPC API");
      console.log(
        "account information:",
        JSON.stringify(await connection.getAccountInformation())
      );
      console.log(
        "positions:",
        JSON.stringify(await connection.getPositions())
      );
      //console.log(await connection.getPosition('1234567'));
      console.log("open orders:", JSON.stringify(await connection.getOrders()));
      //console.log(await connection.getOrder('1234567'));
      console.log(
        "history orders by ticket:",
        JSON.stringify(await connection.getHistoryOrdersByTicket("1234567"))
      );
      console.log(
        "history orders by position:",
        JSON.stringify(await connection.getHistoryOrdersByPosition("1234567"))
      );
      console.log(
        "history orders (~last 3 months):",
        JSON.stringify(
          await connection.getHistoryOrdersByTimeRange(
            new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            new Date()
          )
        )
      );
      console.log(
        "history deals by ticket:",
        JSON.stringify(await connection.getDealsByTicket("1234567"))
      );
      console.log(
        "history deals by position:",
        JSON.stringify(await connection.getDealsByPosition("1234567"))
      );
      console.log(
        "history deals (~last 3 months):",
        JSON.stringify(
          await connection.getDealsByTimeRange(
            new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
            new Date()
          )
        )
      );
      console.log(
        "server time",
        JSON.stringify(await connection.getServerTime())
      );

      // calculate margin required for trade
      console.log(
        "margin required for trade",
        JSON.stringify(
          await connection.calculateMargin({
            symbol: "GBPUSD",
            type: "ORDER_TYPE_BUY",
            volume: 0.1,
            openPrice: 1.1,
          })
        )
      );

      // trade
      console.log("Submitting pending order");
      try {
        let result = await connection.createLimitBuyOrder(
          "GBPUSD",
          0.07,
          1.0,
          0.9,
          2.0,
          {
            comment: "comm",
            clientId: "TE_GBPUSD_7hyINWqAlE",
          }
        );
        console.log("Trade successful, result code is " + result.stringCode);
      } catch (err) {
        console.log("Trade failed with result code " + err.stringCode);
      }
    } catch (err) {
      console.log(err);
    }
    return;
  }
}
