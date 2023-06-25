import { useForm } from "react-hook-form";

import { User as Entity } from "../../../../../http/entities";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import { useLocale } from "../../../../../hooks";
import { setPagePropsAction } from "../../../../../state/page/pageActions";
import { setShownModalAction } from "../../../../../state/layout/layoutActions";

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
      action: null,
    };
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
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
    const promise = this.entity.verifyRequest(userId);
    this.onModifySubmit(promise);
    this.onHideModal();
  }
}
