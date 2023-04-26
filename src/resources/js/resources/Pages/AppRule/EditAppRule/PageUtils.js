import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppRule as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editAppRuleSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { editAppRulePage: strings } = useLocale();
        super("AppRules", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/app_rules/admin`;
    }

    onLoad(params) {
        super.onLoad(params);
        this.validateIfNotValidateParams();
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.fillForm({ appRuleId: params.appRuleId });
    }

    validateIfNotValidateParams() {
        this.navigateIfNotValidId(this.params?.appRuleId);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            const result = await this.fetchItem(data.appRuleId);
            this.navigateIfItemNotFound(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return await this.entity.get(id);
    }

    handleFetchResult(result) {
        this.useForm.setValue("title", result.item.title);
        this.useForm.setValue("body", result.item.body);
        this.dispatch(setPagePropsAction({ appRuleId: result.item.id }));
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.title} ]`,
                strings._subTitle
            )
        );
    }

    async onSubmit(data) {
        const promise = this.entity.update(
            this.params.appRuleId,
            data.title,
            data.body
        );
        super.onModifySubmit(promise);
    }
}
