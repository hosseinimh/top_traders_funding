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

    onLoad(params) {
        super.onLoad(params);
        this.validateIfNotValidateParams();
        this.dispatch(setPageIconAction("pe-7s-id"));
    }

    validateIfNotValidateParams() {
        this.params.userId = utils.isId(this.params?.userId)
            ? parseInt(this.params?.userId)
            : this.userState?.user?.id;
        this.navigateIfNotValidId(this.params.userId);
        this.callbackUrl =
            this.params.userId === this.userState?.user?.id
                ? `${BASE_PATH}/tickets`
                : `${BASE_PATH}/tickets/${this.params.userId}`;
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
