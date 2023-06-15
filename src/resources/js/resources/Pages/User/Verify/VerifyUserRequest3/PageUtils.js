import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../../http/entities";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import { setLoadingAction } from "../../../../../state/layout/layoutActions";
import { verifyUserRequest3Schema as schema } from "../../../../validations";
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
    let { verifyUserRequestPage: strings, validation } = useLocale();
    strings = { ...strings, ...validation };
    super("VerifyUserRequest3", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      item: null,
      selfieFile: null,
      identityFile: null,
      action: null,
    };
    this.callbackUrl = BASE_PATH;
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
    this.dispatch(setPagePropsAction({ item: result.item }));
  }

  onSetSelfieFile(file) {
    this.useForm?.setValue("selfieFile", file);
    this.dispatch(
      setPagePropsAction({
        selfieFile: file,
      })
    );
  }

  onSetIdentityFile(file) {
    this.useForm?.setValue("identityFile", file);
    this.dispatch(
      setPagePropsAction({
        identityFile: file,
      })
    );
  }

  async onSubmit() {
    if (this.pageState?.props?.selfieFile?.size > 4 * 1024 * 1024) {
      this.dispatch(
        setMessageAction(
          this.strings.fileMaxSizeMessage,
          MESSAGE_TYPES.ERROR,
          MESSAGE_CODES.FORM_INPUT_INVALID
        )
      );
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/gif"].includes(
        this.pageState?.props?.selfieFile?.type
      )
    ) {
      this.dispatch(
        setMessageAction(
          this.strings.fileTypeMessage,
          MESSAGE_TYPES.ERROR,
          MESSAGE_CODES.FORM_INPUT_INVALID
        )
      );
      return;
    }
    if (this.pageState?.props?.identityFile?.size > 4 * 1024 * 1024) {
      this.dispatch(
        setMessageAction(
          this.strings.fileMaxSizeMessage,
          MESSAGE_TYPES.ERROR,
          MESSAGE_CODES.FORM_INPUT_INVALID
        )
      );
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/gif"].includes(
        this.pageState?.props?.identityFile?.type
      )
    ) {
      this.dispatch(
        setMessageAction(
          this.strings.fileTypeMessage,
          MESSAGE_TYPES.ERROR,
          MESSAGE_CODES.FORM_INPUT_INVALID
        )
      );
      return;
    }
    this.onSendRequest();
    const result = await this.entity.verifyRequest3(
      this.pageState?.props?.selfieFile,
      this.pageState?.props?.identityFile
    );
    this.dispatch(setLoadingAction(false));
    if (result === null) {
      this.handleModifyResultIfNull();
    } else {
      this.dispatch(fetchAuthAction());
      this.handleModifyResultAndNavigateIfOK();
    }
  }
}
