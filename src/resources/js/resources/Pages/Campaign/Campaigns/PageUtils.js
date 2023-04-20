import { useForm } from "react-hook-form";

import { Campaign as Entity } from "../../../../http/entities";
import { setLoadingAction } from "../../../../state/layout/layoutActions";
import { setPageIconAction } from "../../../../state/page/pageActions";
import { campaignsPage as strings } from "../../../../constants/strings";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH } from "../../../../constants";
import utils from "../../../../utils/Utils";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        super("Campaigns", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            item: null,
            items: null,
            action: null,
        };
    }

    onLoad() {
        super.onLoad();
        this.dispatch(setPageIconAction("pe-7s-users"));
        this.fillForm();
    }

    addAction() {
        this.navigate(`${BASE_PATH}/campaigns/add`);
    }

    editAction({ id }) {
        if (utils.isId(id)) {
            this.navigate(`${BASE_PATH}/campaigns/edit/${id}`);
        }
    }

    async fillForm(data = null) {
        this.dispatch(setLoadingAction(true));
        const result = await this.entity.getPaginate();
        this.handleFetchResult(
            result,
            this.propsIfOK(result),
            this.propsIfNull()
        );
    }
}
