import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../http/entities";
import {
  setPageIconAction,
  setPagePropsAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { searchUserSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
  constructor() {
    const form = useForm({
      resolver: yupResolver(schema),
    });
    const { usersPage: strings } = useLocale();
    super("Users", strings, form);
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

  onChangePassword(item) {
    this.dispatch(
      setPagePropsAction({
        action: "CHANGE_PASSWORD",
        item,
      })
    );
  }

  onTickets(item) {
    this.dispatch(
      setPagePropsAction({
        action: "TICKETS",
        item,
      })
    );
  }

  onAction(props) {
    switch (props.action) {
      case "CHANGE_PASSWORD":
        this.changePasswordAction(props.item);

        break;
      case "SET_PAGE":
        props.action = null;
        this.onSubmit({
          username: this.useForm.getValues("username") ?? "",
          nameFamily: this.useForm.getValues("nameFamily") ?? "",
          email: this.useForm.getValues("email") ?? "",
        });

        break;
      case "TICKETS":
        this.ticketsAction(props.item);

        break;
    }

    super.onAction(props);
  }

  addAction() {
    this.navigate(`${BASE_PATH}/users/add`);
  }

  editAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/users/edit/${id}`);
    }
  }

  changePasswordAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/users/change_password/${id}`);
    }
  }

  ticketsAction({ id }) {
    if (utils.isId(id)) {
      this.navigate(`${BASE_PATH}/tickets/${id}`);
    }
  }

  async fillForm(data = null) {
    const promise = this.entity.getPaginate(
      data?.username ?? "",
      data?.nameFamily ?? "",
      data?.email ?? "",
      this.pageState.props?.pageNumber ?? 1
    );
    super.fillForm(promise);
  }
}
