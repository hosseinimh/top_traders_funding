import { useForm } from "react-hook-form";

import { AppRule as Entity } from "../../../../http/entities";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    const { appRulesPage: strings } = useLocale();
    super("AppRules", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      items: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  async fillForm() {
    const promise = this.entity.getAll();
    super.fillForm(promise);
  }
}
