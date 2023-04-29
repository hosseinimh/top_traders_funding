import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { USER_ROLES } from "../../../../constants";
import { clearMessageAction } from "../../../../state/message/messageActions";
import { fetchLoginAction } from "../../../../state/user/userActions";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { loginUserSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor(role = USER_ROLES.USER) {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { loginUserPage: strings } = useLocale();
        super("Users", strings, form);
        this.role = [USER_ROLES.ADMINISTRATOR, USER_ROLES.USER].includes(role)
            ? role
            : USER_ROLES.USER;
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(data) {
        this.dispatch(setLoadingAction(true));
        this.dispatch(clearMessageAction());
        this.dispatch(
            fetchLoginAction(data.username, data.password, this.role)
        );
    }
}