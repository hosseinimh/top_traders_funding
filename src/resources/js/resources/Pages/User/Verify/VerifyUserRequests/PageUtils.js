import { useForm } from "react-hook-form";

import { User as Entity } from "../../../../../http/entities";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import { useLocale } from "../../../../../hooks";
import { setPagePropsAction } from "../../../../../state/page/pageActions";
import { setShownModalAction } from "../../../../../state/layout/layoutActions";
import {
  BASE_URL,
  USER_VERIFICATION_REJECT_REASON,
} from "../../../../../constants";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm();
    const { verifyUserRequestsPage: strings } = useLocale();
    super("VerifyUserRequests", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      pageNumber: 1,
      itemsCount: 0,
      item: null,
      items: null,
      modal: null,
      verified: true,
      rejectReason: USER_VERIFICATION_REJECT_REASON.IMAGE_NOT_VALID,
      action: null,
    };
    this.callbackUrl = `${BASE_URL}/users/verify_requests`;
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  onVerifiedChanged(verified) {
    this.dispatch(setPagePropsAction({ verified }));
  }

  onRejectReasonChanged(rejectReason) {
    this.dispatch(setPagePropsAction({ rejectReason }));
  }

  async fillForm() {
    const promise = this.entity.getPaginateVerifyRequests(
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }

  onShowModal(e, modal, item) {
    e.stopPropagation();
    this.dispatch(
      setPagePropsAction({
        modal,
        item,
        verified: true,
      })
    );
    this.dispatch(setShownModalAction(modal));
  }

  onHideModal() {
    this.dispatch(
      setPagePropsAction({
        modal: null,
        item: null,
      })
    );
    this.dispatch(setShownModalAction(null));
  }

  async onVerifyRequest(userId) {
    this.strings.submitted = this.strings.verifySubmitted;
    const promise = this.entity.verifyRequest(userId);
    this.onSelfSubmit(promise);
    this.onHideModal();
  }

  async onRejectRequest(userId) {
    this.strings.submitted = this.strings.rejectSubmitted;
    const promise = this.entity.rejectRequest(
      userId,
      this.pageState?.props?.rejectReason
    );
    this.onSelfSubmit(promise);
    this.onHideModal();
  }
}
