import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AppRule as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { editAppRulePage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editAppRuleSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("AppRules", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            appRuleId: null,
        };
        this.callbackUrl = `${BASE_PATH}/app_rules/admin`;
    }

    onLoad(params) {
        super.onLoad();
        const data = { appRuleId: params?.appRuleId };
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.dispatch(setPagePropsAction(data));
        this.fillForm(data);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            this.navigateIfNotValidId(data.appRuleId);
            const result = await this.fetchItem(data.appRuleId);
            this.navigateIfItemNotFound(result);
            this.updateForm(result);
            this.handleFetchResult(result);
        } catch {
        } finally {
            this.dispatch(setLoadingAction(false));
        }
    }

    async fetchItem(id) {
        return await this.entity.get(id);
    }

    updateForm(result) {
        this.useForm.setValue("title", result.item.title);
        this.useForm.setValue("body", result.item.body);
    }

    handleFetchResult(result) {
        this.dispatch(setPagePropsAction({ appRuleId: result.item.id }));
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.title} ]`,
                strings._subTitle
            )
        );
    }

    async onSubmit(data) {
        this.onSendRequest();
        const result = await this.entity.update(
            this.pageState?.props?.appRuleId,
            data.title,
            data.body
        );
        this.handleModifyResultAndNavigate(result);
    }
}
