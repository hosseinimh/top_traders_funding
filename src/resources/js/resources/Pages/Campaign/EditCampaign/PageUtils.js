import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Campaign as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
    setPageTitleAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { editCampaignSchema as schema } from "../../../validations";
import { useLanguage } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { editCampaignPage: strings } = useLanguage();
        super("Campaigns", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            campaignId: null,
        };
        this.callbackUrl = `${BASE_PATH}/campaigns`;
    }

    onLoad(params) {
        super.onLoad();
        const data = { campaignId: params?.campaignId };
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.dispatch(setPagePropsAction(data));
        this.fillForm(data);
    }

    async fillForm(data) {
        try {
            this.dispatch(setLoadingAction(true));
            this.navigateIfNotValidId(data.campaignId);
            const result = await this.fetchItem(data.campaignId);
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
        this.useForm.setValue("isActive", result.item.isActive);
    }

    handleFetchResult(result) {
        this.dispatch(setPagePropsAction({ campaignId: result.item.id }));
        this.dispatch(
            setPageTitleAction(
                `${strings._title} [ ${result.item.title} ]`,
                strings._subTitle
            )
        );
    }

    async onSubmit(data) {
        const promise = this.entity.update(
            this.pageState?.props?.campaignId,
            data.title,
            data.isActive ? 1 : 0
        );
        super.onModifySubmit(promise);
    }
}
