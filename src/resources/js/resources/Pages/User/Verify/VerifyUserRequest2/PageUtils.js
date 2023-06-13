import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../../http/entities";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import { setLoadingAction } from "../../../../../state/layout/layoutActions";
import { verifyUserRequest2Schema as schema } from "../../../../validations";
import { useLocale } from "../../../../../hooks";
import { setPagePropsAction } from "../../../../../state/page/pageActions";
import { fetchAuthAction } from "../../../../../state/user/userActions";
import {
  BASE_PATH,
  MESSAGE_CODES,
  MESSAGE_TYPES,
} from "../../../../../constants";
import { setMessageAction } from "../../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    const { verifyUserRequestPage: strings } = useLocale();
    super("VerifyUserRequest2", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      item: null,
    };
    this.callbackUrl = `${BASE_PATH}/users/verify_request1`;
  }

  onLoad() {
    super.onLoad();
    this.fillForm();
  }

  async fillForm() {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem();
      this.navigateIfItemNotFound(result);
      this.handleFetchResult(result);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  async fetchItem() {
    return await this.entity.getFromUser();
  }

  handleFetchResult(result) {
    this.useForm.setValue("mobile", result.item.mobile);
    this.useForm.setValue("tel", result.item.tel);
    this.useForm.setValue("email", result.item.email);
    this.useForm.setValue("address", result.item.address);
    this.dispatch(setPagePropsAction({ item: result.item }));
  }

  async onSubmit(data) {
    this.onSendRequest();
    const result = await this.entity.verifyRequest2(
      data.mobile,
      data.tel,
      data.email,
      data.address
    );
    this.dispatch(setLoadingAction(false));
    if (result === null) {
      this.handleModifyResultIfNull();
    } else {
      this.dispatch(
        setMessageAction(
          result?.emailVerifiedAt
            ? this.strings.submitted2EmailVerified
            : this.strings.submitted2,
          MESSAGE_TYPES.SUCCESS,
          MESSAGE_CODES.OK
        )
      );
      this.dispatch(fetchAuthAction());
    }
  }
}
