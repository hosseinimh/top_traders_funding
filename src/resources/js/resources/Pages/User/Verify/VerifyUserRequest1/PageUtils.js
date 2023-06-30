import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../../http/entities";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import { setLoadingAction } from "../../../../../state/layout/layoutActions";
import { verifyUserRequest1Schema as schema } from "../../../../validations";
import { useLocale } from "../../../../../hooks";
import { setPagePropsAction } from "../../../../../state/page/pageActions";
import { fetchAuthAction } from "../../../../../state/user/userActions";
import {
  BASE_PATH,
  MESSAGE_CODES,
  MESSAGE_TYPES,
} from "../../../../../constants";
import { setMessageAction } from "../../../../../state/message/messageActions";
import utils from "../../../../../utils/Utils";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    const { verifyUserRequestPage: strings } = useLocale();
    super("VerifyUserRequest1", strings, form);
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
    this.useForm.setValue("name", result.item.name);
    this.useForm.setValue("family", result.item.family);
    this.useForm.setValue("fatherName", result.item.fatherName);
    this.useForm.setValue("nationalNo", result.item.nationalNo);
    this.useForm.setValue("identityNo", result.item.identityNo);
    if (result.item.birthDate) {
      this.useForm.setValue(
        "birthDate",
        utils.toLocaleDateString(
          result.item.birthDate,
          this.layoutState?.locale
        )
      );
    }
    this.useForm.setValue("gender", result.item.gender);
    this.dispatch(setPagePropsAction({ item: result.item }));
  }

  async onSubmit(data) {
    this.onSendRequest();
    const result = await this.entity.verifyRequest1(
      data.name,
      data.family,
      data.fatherName,
      data.nationalNo,
      data.identityNo,
      data.birthDate.replaceAll("/", ""),
      data.gender
    );
    this.dispatch(setLoadingAction(false));
    if (result === null) {
      this.handleModifyResultIfNull();
    } else {
      this.dispatch(
        setMessageAction(
          this.strings.submitted1,
          MESSAGE_TYPES.SUCCESS,
          MESSAGE_CODES.OK
        )
      );
      this.dispatch(fetchAuthAction());
    }
  }
}
