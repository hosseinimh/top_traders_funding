import { useForm } from "react-hook-form";

import { ChallengeLeverage as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    const { challengeLeveragesPage: strings } = useLocale();
    super("ChallengeLeverages", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      item: null,
      items: null,
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  addAction() {
    this.navigate(`${BASE_PATH}/challenge_leverages/add`);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/challenge_leverages/edit/${id}`);
    }
  }

  async fillForm() {
    const promise = this.entity.getAll();
    super.fillForm(promise);
  }
}
