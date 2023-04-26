import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Campaign as Entity } from "../../../../http/entities";
import { setPageIconAction } from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addCampaignSchema as schema } from "../../../validations";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        const { addCampaignPage: strings } = useLocale();
        super("Campaigns", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/campaigns`;
    }

    onLoad(params) {
        super.onLoad(params);
        this.dispatch(setPageIconAction("pe-7s-id"));
    }

    async onSubmit(data) {
        const promise = this.entity.store(data.title, data.isActive ? 1 : 0);
        super.onModifySubmit(promise);
    }
}
