import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Campaign as Entity } from "../../../../http/entities";
import { setPageIconAction } from "../../../../state/page/pageActions";
import { addCampaignPage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import { addCampaignSchema as schema } from "../../../validations";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm({
            resolver: yupResolver(schema),
        });
        super("Campaigns", strings, form);
        this.entity = new Entity();
        this.callbackUrl = `${BASE_PATH}/campaigns`;
    }

    onLoad() {
        super.onLoad();
        this.dispatch(setPageIconAction("pe-7s-id"));
    }

    async onSubmit(data) {
        this.onSendRequest();
        const result = await this.entity.store(
            data.title,
            data.isActive ? 1 : 0
        );
        this.handleModifyResultAndNavigate(result);
    }
}
