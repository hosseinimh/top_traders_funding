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
      challengeId: this?.pageState?.params?.challengeId,
      challengeRule: null,
      deals: null,
      dealsDetails: null,
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
      const result = await this.getItem(data.challengeId);
      this.navigateIfItemNotFound(result);
      this.handleFetchResult(result);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  handleFetchResult(result) {
    this.dispatch(
      setPageTitleAction(
        `${this.strings._title} [ ${result.item.levelText} ]`,
        this.strings._subTitle
      )
    );
  }

  async getAndFetchDeals() {
    try {
      await this.getItem(this.pageState?.params?.challengeId, true);
    } catch {}
  }

  async getItem(id, fetchDeals = false) {
    const result = fetchDeals
      ? await this.entity.getAndFetchDeals(id)
      : await this.entity.get(id);
    if (result?.item?.status === CHALLENGE_STATUSES.WAITING_VERIFICATION) {
      return null;
    }
    let props = {
      item: result.item,
      challengeId: result.item.id,
      deals: result.deals,
      dealsDetails: result.dealsDetails,
    };
    if (!fetchDeals) {
      props.challengeRule = result.challengeRule;
    }
    this.dispatch(setPagePropsAction(props));
    return result;
  }
}
