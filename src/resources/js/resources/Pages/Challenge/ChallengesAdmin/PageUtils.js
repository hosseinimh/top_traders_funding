import { useForm } from "react-hook-form";

import { Challenge as Entity } from "../../../../http/entities";
import {
  setPageIconAction,
  setPagePropsAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    const { challengesAdminPage: strings } = useLocale();
    super("Challenges", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      pageNumber: 1,
      itemsCount: 0,
      item: null,
      items: null,
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.dispatch(setPageIconAction("pe-7s-users"));
    this.fillForm();
  }

  onVerified(item) {
    this.dispatch(
      setPagePropsAction({
        action: "VERIFIED",
        item,
      })
    );
  }

  onAnalyze(item) {
    this.dispatch(
      setPagePropsAction({
        action: "ANALYZE",
        item,
      })
    );
  }

  onAccount(item) {
    this.dispatch(
      setPagePropsAction({
        action: "ACCOUNT",
        item,
      })
    );
  }

  onAction(props) {
    switch (props.action) {
      case "VERIFIED":
        this.verifiedAction(props.item);

        break;
      case "ANALYZE":
        this.analyzeAction(props.item);

        break;
    }

    super.onAction(props);
  }

  async verifiedAction({ id }) {
    if (utils.isId(id)) {
      await this.entity.changeStatus(id);
      await this.fillForm();
    }
  }

  analyzeAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/challenges/${id}`);
    }
  }

  async fillForm(data = null) {
    const promise = this.entity.getPaginate(
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }
}
