import { useForm } from "react-hook-form";

import {
  ChallengeTrade,
  Challenge as Entity,
  MetaApi,
} from "../../../../http/entities";
import {
  setPagePropsAction,
  setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import {
  BASE_PATH,
  CHALLENGE_STATUSES,
  USER_ROLES,
} from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    const { analyzeChallengePage: strings } = useLocale();
    super("AnalyzeChallenge", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      item: null,
      challengeId: null,
      challengeRule: null,
      accountData: null,
    };
    this.callbackUrl = `${BASE_PATH}/challenges`;
  }

  onLoad() {
    this.validateIfNotValidateParams();
    super.onLoad();
    this.fillForm(this.pageState.params);
  }

  validateIfNotValidateParams() {
    this.navigateIfNotValidId(this.pageState.params.challengeId);
  }

  async fillForm(data) {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem(data.challengeId);
      this.navigateIfItemNotFound(result);
      const accountDataResult = await this.fetchAccount(result.item);
      this.handleFetchResult(result, accountDataResult);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  async fetchData() {
    try {
      const result = await this.fetchItem(this.pageState?.props?.challengeId);
      if (result?.item) {
        const accountDataResult = await this.fetchAccount(result.item);
        if (accountDataResult?.accountData?.deals?.deals) {
          this.updateChallengeTrades(
            this.pageState?.props?.challengeId,
            accountDataResult?.accountData?.deals?.deals
          );
        }
        this.dispatch(
          setPagePropsAction({
            item: result.item,
            accountData: accountDataResult?.accountData ?? null,
          })
        );
      }
    } catch {}
  }

  async fetchItem(id) {
    const result =
      this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
        ? await this.entity.get(id)
        : await this.entity.getFromUser(id);

    if (result?.item?.status === CHALLENGE_STATUSES.WAITING_VERIFICATION) {
      return null;
    }
    return result;
  }

  async fetchAccount(item) {
    const metaApi = new MetaApi();
    return await metaApi.get(item.metaApiToken, item.metaApiAccountId);
  }

  handleFetchResult(result, accountDataResult) {
    this.dispatch(
      setPageTitleAction(
        `${this.strings._title} [ ${result.item.levelText} ]`,
        this.strings._subTitle
      )
    );
    this.dispatch(
      setPagePropsAction({
        item: result.item,
        challengeId: result.item.id,
        challengeRule: result.challengeRule,
        accountData: accountDataResult?.accountData ?? null,
      })
    );
  }

  async updateChallengeTrades(challengeId, deals) {
    const challengeTrade = new ChallengeTrade();
    const challengeTrades = deals.map((deal) => {
      return {
        deal_id: deal.id,
        platform: deal.platform,
        type: deal.type,
        time: deal.time,
        broker_time: deal.brokerTime,
        commission: deal.commission,
        swap: deal.swap,
        profit: deal.profit,
        symbol: deal?.symbol ?? null,
        magic: deal?.magic ?? null,
        order_id: deal?.orderId ?? null,
        position_id: deal?.positionId ?? null,
        reason: deal?.reason ?? null,
        entry_type: deal?.entryType ?? null,
        volume: deal?.volume ?? null,
        price: deal?.price ?? null,
        account_currency_exchange_rate: deal.accountCurrencyExchangeRate,
        update_sequence_number: deal?.updateSequenceNumber ?? null,
        comment: deal?.comment ?? null,
      };
    });
    await challengeTrade.store(challengeId, challengeTrades);
  }
}
