import { useForm } from "react-hook-form";

import { Challenge as Entity } from "../../../../http/entities";
import {
  setPagePropsAction,
  setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, CHALLENGE_STATUSES } from "../../../../constants";
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
      challengeRule: null,
      trades: null,
    };
    this.callbackUrl = `${BASE_PATH}/challenges`;
    this.fetchData = this.fetchData.bind(this);
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
      this.handleFetchResult(result);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  async fetchData() {
    try {
      const result = await this.fetchItem(
        this.pageState.params.challengeId || this.pageState.props.challengeId,
        true
      );
      if (result?.trades) {
        this.dispatch(
          setPagePropsAction({
            item: result.item,
            trades: result.trades,
          })
        );
      }
    } catch {}
  }

  async fetchItem(id, withTrades = false) {
    const result = withTrades
      ? await this.entity.getWithTrades(id)
      : await this.entity.get(id);
    return result?.item?.status === CHALLENGE_STATUSES.WAITING_VERIFICATION
      ? null
      : result;
  }

  handleFetchResult(result) {
    this.dispatch(
      setPageTitleAction(
        `${this.strings._title} [ ${result.item.levelText} ]`,
        this.strings._subTitle
      )
    );
    this.dispatch(
      setPagePropsAction({
        item: result.item,
        challengeRule: result.challengeRule,
      })
    );
  }
}
