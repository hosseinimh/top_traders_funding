import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../http/entities";
import {
    setPageAction,
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editUserSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { editUserPage: strings } = useLocale();
        super("Users", strings, form);
        this.entity = new Entity();
        this.callbackUrl =
            this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? `${BASE_PATH}/users`
                : BASE_PATH;
    }

    onLoad(params) {
        super.onLoad(params);
        this.validateIfNotValidateParams();
        const name =
            userId === this.userState?.user?.id ? "EditProfile" : "Users";
        this.dispatch(setPageAction(name));
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.fillForm(this.params);
    }

    validateIfNotValidateParams() {
        this.params.userId = utils.isId(this.params?.userId)
            ? parseInt(this.params?.userId)
            : this.userState?.user?.id;
        this.navigateIfNotValidId(this.params.userId);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchItem(data.userId);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
            ? await this.entity.get(id)
            : await this.entity.getFromUser();
    }

    handleFetchResult(result) {
        this.useForm.setValue("name", result.item.name);
        this.useForm.setValue("family", result.item.family);
        this.useForm.setValue("email", result.item.email);
        this.useForm.setValue("isActive", result.item.isActive);
        this.useForm.setValue(
            result.item.role === USER_ROLES.ADMINISTRATOR
                ? "administrator"
                : "user",
            "on"
        );
        this.dispatch(setPagePropsAction({ userId: result.item.id }));
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.name} ${result.item.family} - ${result.item.username} ]`,
                strings._subTitle
            )
        );
    }

    async onSubmit(data) {
        const promise =
            this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? this.handleSubmit(data)
                : this.handleSubmitFromUser(data);
        this.onModifySubmit(promise);
    }

    async handleSubmit(data) {
        const role = data.administrator
            ? USER_ROLES.ADMINISTRATOR
            : USER_ROLES.USER;
        return this.entity.update(
            this.params.userId,
            data.name,
            data.family,
            data.email,
            role,
            data.isActive ? 1 : 0
        );
    }

    async handleSubmitFromUser(data) {
        return this.entity.updateFromUser(data.name, data.family);
    }
}
