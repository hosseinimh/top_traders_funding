import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { User as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { changePasswordUserSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { changePasswordUserPage: strings } = useLocale();
        super("ChangePasswordUser", strings, form);
        this.entity = new Entity();
        this.callbackUrl =
            this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? `${BASE_PATH}/users`
                : BASE_PATH;
    }

    onLoad(params) {
        super.onLoad(params);
        this.validateIfNotValidateParams();
        this.dispatch(setPageIconAction("pe-7s-pen"));
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
                ? this.entity.changePassword(
                      this.params.userId,
                      data.newPassword,
                      data.confirmPassword
                  )
                : this.entity.changePasswordFromUser(
                      data.newPassword,
                      data.confirmPassword
                  );
        this.onModifySubmit(promise);
    }
}
