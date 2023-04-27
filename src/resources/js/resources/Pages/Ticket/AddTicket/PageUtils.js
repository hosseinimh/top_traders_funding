import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Ticket as Entity } from "../../../../http/entities";
import { setPageIconAction } from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
import { addTicketSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { addTicketPage: strings } = useLocale();
        super("Tickets", strings, form);
        this.entity = new Entity();
    }

    onLoad() {
        super.onLoad();
        this.validateIfNotValidateParams();
        this.dispatch(setPageIconAction("pe-7s-id"));
    }

    validateIfNotValidateParams() {
        const userId = utils.isId(this.pageState.params.userId)
            ? parseInt(this.pageState.params.userId)
            : this.userState?.user?.id;
        this.navigateIfNotValidId(userId);
        this.callbackUrl =
            userId === this.userState?.user?.id
                ? `${BASE_PATH}/tickets`
                : `${BASE_PATH}/tickets/${userId}`;
    }

    async onSubmit(data) {
        const role = data.administrator
            ? USER_ROLES.ADMINISTRATOR
            : USER_ROLES.USER;
        const promise = this.entity.store(
            data.username,
            data.password,
            data.confirmPassword,
            data.name,
            data.family,
            role,
            data.isActive ? 1 : 0
        );
        this.onModifySubmit(promise);
    }
}
