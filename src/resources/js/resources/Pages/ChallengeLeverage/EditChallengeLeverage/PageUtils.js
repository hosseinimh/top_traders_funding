import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ChallengeLeverage as Entity } from "../../../../http/entities";
import {
  setPageIconAction,
  setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editChallengeLeverageSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    const { sditEditChallengeLeveragePage: strings } = useLocale();
    super("ChallengeLeverages", strings, form);
    this.entity = new Entity();
    this.callbackUrl = `${BASE_PATH}/challenge_leverages`;
  }

  onLoad() {
    this.validateIfNotValidateParams();
    super.onLoad();
    this.dispatch(setPageIconAction("pe-7s-id"));
    this.fillForm(this.pageState.params);
  }

  validateIfNotValidateParams() {
    this.navigateIfNotValidId(this.pageState.params.balanceId);
  }

  async fillForm(data) {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem(data.balanceId);
      this.navigateIfItemNotFound(result);
      this.handleFetchResult(result);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  async fetchItem(id) {
    return await this.entity.get(id);
  }

  handleFetchResult(result) {
    this.useForm.setValue("name", result.item.name);
    this.useForm.setValue("title", result.item.title);
    this.dispatch(
      setPageTitleAction(
        `${this.strings._title} [ ${result.item.name} ]`,
        this.strings._subTitle
      )
    );
  }

  async onSubmit(data) {
    const promise = this.entity.update(
      this.pageState.params.balanceId,
      data.value
    );
    super.onModifySubmit(promise);
  }
}
