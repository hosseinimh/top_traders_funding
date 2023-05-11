import { useForm } from "react-hook-form";

import { Challenge as Entity } from "../../../../http/entities";
import {
  setPageIconAction,
  setPagePropsAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, CHALLENGE_STATUSES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { useLocale } from "../../../../hooks";
import { setNotificationsAction } from "../../../../state/layout/layoutActions";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    const { challengesAdminPage: strings } = useLocale();
    super("Challenges", strings, form);
    this.entity = new Entity();
    this.loadModals([{ name: "verifyModal" }]);
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

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/challenges/edit/${id}`);
    }
  }

  verifyAction({ id }) {
    if (utils.isId(id)) {
      this.modals[0].modal.show();
    }
  }

  async verifiedAction({ id }) {
    if (utils.isId(id)) {
      this.modals[0].modal.hide();
      await this.changeStatus(id, CHALLENGE_STATUSES.WAITING_TRADE);
    }
  }

  onVerify(item) {
    this.dispatch(
      setPagePropsAction({
        action: "VERIFY",
        item,
      })
    );
  }

  onVerified() {
    this.dispatch(
      setPagePropsAction({
        action: "VERIFIED",
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
      case "VERIFY":
        this.verifyAction(props.item);

        break;
      case "VERIFIED":
        this.verifiedAction(this.pageState?.props?.item);

        break;
      case "ANALYZE":
        this.analyzeAction(props.item);

        break;
    }

    super.onAction(props);
  }

  analyzeAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/challenges/${id}`);
    }
  }

  async fillForm() {
    const promise = this.entity.getPaginate(
      this.pageState.props?.pageNumber ?? 1
    );
    await super.fillForm(promise);
  }

  async changeStatus(id, challengeStatus) {
    const result = await this.entity.changeStatus(id, challengeStatus);
    if (result) {
      this.dispatch(
        setNotificationsAction({
          ...this.layoutState?.notifications,
          waitingChallengesCount: result?.waitingChallengesCount,
        })
      );
    }
    await this.fillForm();
  }
}
