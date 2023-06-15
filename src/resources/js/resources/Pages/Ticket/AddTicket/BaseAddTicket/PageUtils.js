import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Ticket as Entity, User } from "../../../../../http/entities";
import {
  setPageAction,
  setPagePropsAction,
  setPageTitleAction,
} from "../../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../../utils/BasePageUtils";
import {
  BASE_PATH,
  MESSAGE_CODES,
  MESSAGE_TYPES,
  USER_ROLES,
} from "../../../../../constants";
import { addTicketSchema as schema } from "../../../../validations";
import { useLocale } from "../../../../../hooks";
import { setLoadingAction } from "../../../../../state/layout/layoutActions";
import { setMessageAction } from "../../../../../state/message/messageActions";

export class PageUtils extends BasePageUtils {
  constructor(userId) {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    let { addTicketPage: strings, validation } = useLocale();
    strings = { ...strings, ...validation };
    super("Tickets", strings, form);
    this.entity = new Entity();
    this.initialPageProps = {
      userId,
      file: null,
    };
    this.callbackUrl =
      userId === this.userState?.user?.id
        ? `${BASE_PATH}/tickets`
        : `${BASE_PATH}/tickets/${userId}`;
  }

  onLoad() {
    this.validateIfNotValidateParams();
    super.onLoad();
    const name =
      this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
        ? "Users"
        : "Tickets";
    this.dispatch(setPageAction(name));
    this.dispatch(setPagePropsAction(this.initialPageProps));
    this.fillForm(this.initialPageProps);
  }

  validateIfNotValidateParams() {
    this.navigateIfNotValidId(this.initialPageProps.userId);
  }

  async fillForm(data) {
    try {
      this.dispatch(setLoadingAction(true));
      const result = await this.fetchItem(data.userId);
      this.navigateIfItemNotFound(result);
      this.navigateIfAdministrator(result);
      this.handleFetchResult(result);
    } catch {
    } finally {
      this.dispatch(setLoadingAction(false));
    }
  }

  async fetchItem(id) {
    const user = new User();
    return this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
      ? await user.get(id)
      : await user.getFromUser();
  }

  navigateIfAdministrator(result) {
    if (result.role === USER_ROLES.ADMINISTRATOR) {
      this.showErrorAndNavigate(this.strings.administratorTicketsError);
    }
  }

  handleFetchResult(result) {
    if (this.userState?.user?.role === USER_ROLES.ADMINISTRATOR) {
      this.dispatch(
        setPageTitleAction(
          `${this.strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.username} ]`,
          this.strings._subTitle
        )
      );
    }
  }

  async onSubmit(data) {
    if (this.pageState?.props?.file?.size > 2 * 1024 * 1024) {
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
        this.pageState?.props?.file?.type
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
    const promise =
      this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
        ? this.entity.store(
            this.pageState?.props?.userId,
            data.type,
            data.subject,
            data.content,
            this.pageState?.props?.file
          )
        : this.entity.storeFromUser(
            data.type,
            data.subject,
            data.content,
            this.pageState?.props?.file
          );
    this.onModifySubmit(promise);
  }
}
