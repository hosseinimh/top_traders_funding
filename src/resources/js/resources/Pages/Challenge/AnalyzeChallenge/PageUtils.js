import { useForm } from "react-hook-form";

import { Challenge as Entity } from "../../../../http/entities";
import {
  setPageIconAction,
  setPagePropsAction,
  setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
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
    };
    this.callbackUrl = `${BASE_PATH}/challenges`;
  }

  onLoad() {
    this.validateIfNotValidateParams();
    super.onLoad();
    this.dispatch(setPageIconAction("pe-7s-id"));
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

  async fetchItem(id) {
    return this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
      ? await this.entity.get(id)
      : await this.entity.getFromUser(id);
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
