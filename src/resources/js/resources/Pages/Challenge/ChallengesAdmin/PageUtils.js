import { useForm } from "react-hook-form";

import { Challenge as Entity } from "../../../../http/entities";
import {
  setPageIconAction,
  setPagePropsAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import {
  BASE_PATH,
  CHALLENGE_STATUSES,
  MESSAGE_CODES,
  MESSAGE_TYPES,
} from "../../../../constants";
import utils from "../../../../utils/Utils";
import { useLocale } from "../../../../hooks";
import {
  setNotificationsAction,
  setShownModalAction,
} from "../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../state/message/messageActions";

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
      field: null,
      showModal: false,
      modal: null,
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
    this.dispatch(
      setMessageAction(
        this.strings.submitted,
        MESSAGE_TYPES.SUCCESS,
        MESSAGE_CODES.OK
      )
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

  onCopy(field) {
    this.dispatch(
      setPagePropsAction({
        action: "COPY",
        field,
      })
    );
  }

  onShowAccountModal(modal, item) {
    this.dispatch(
      setPagePropsAction({
        showModal: true,
        modal,
        item,
      })
    );
    this.dispatch(setShownModalAction("accountModal"));
  }

  onCloseModal() {
    if (!this.dispatch) {
      return;
    }
    this.dispatch(
      setPagePropsAction({
        showModal: false,
        modal: null,
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
      case "COPY":
        this.copyAction(props.field);

        break;
    }

    super.onAction(props);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/challenges/edit/${id}`);
    }
  }

  async verifiedAction({ id }) {
    if (utils.isId(id)) {
      await this.changeStatus(id, CHALLENGE_STATUSES.WAITING_TRADE);
    }
  }

  analyzeAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/challenges/${id}`);
    }
  }

  copyAction(field) {
    var element = document.querySelector(`#${field}`);
    if (!element) {
      return;
    }
    element.select();
    element.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(element.value);
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
