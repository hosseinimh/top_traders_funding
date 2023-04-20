import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { clearMessageAction } from "../../../../state/message/messageActions";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { signupPage as strings } from "../../../../constants/strings";
import { signupSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Users", strings, form);
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(data) {
        this.dispatch(setLoadingAction(true));
        this.dispatch(clearMessageAction());
    }
}
