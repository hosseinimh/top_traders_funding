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
      deals: null,
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

  async fetchData() {
    try {
      const result = await this.fetchItem(
        this.pageState.params.challengeId || this.pageState.props.challengeId,
        true
      );
      if (result?.deals) {
        this.dispatch(
          setPagePropsAction({
            item: result.item,
            deals: result.deals,
            dealsDetails: result.dealsDetails,
          })
        );
      }
    } catch {}
  }

  async fetchItem(id, withDeals = false) {
    const result = withDeals
      ? await this.entity.getWithDeals(id)
      : await this.entity.get(id);
    return result?.item?.status === CHALLENGE_STATUSES.WAITING_VERIFICATION
      ? null
      : result;
  }
}
