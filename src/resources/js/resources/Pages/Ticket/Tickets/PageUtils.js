import { useForm } from "react-hook-form";

import { Ticket as Entity } from "../../../../http/entities";
import {
    setPageIconAction,
    setPagePropsAction,
} from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { BASE_PATH, USER_ROLES } from "../../../../constants";
import utils from "../../../../utils/Utils";
import { useLocale } from "../../../../hooks";

export class PageUtils extends BasePageUtils {
    constructor() {
        const form = useForm();
        const { ticketsPage: strings } = useLocale();
        super("Tickets", strings, form);
        this.entity = new Entity();
        this.initialPageProps = {
            pageNumber: 1,
            itemsCount: 0,
            items: null,
            userId: null,
        };
    }

    onLoad() {
        super.onLoad();
        let userId =
            this.pageState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? utils.isId(params?.userId)
                    ? parseInt(params?.userId)
                    : null
                : this.pageState?.user?.id;
        const data = { userId };
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.dispatch(setPagePropsAction(data));
        this.fillForm(data);
    }

    async fillForm(data = null) {
        const promise =
            this.pageState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? this.entity.getPaginate(data?.userId)
                : this.entity.getPaginateFromUser();
        super.fillForm(promise);
    }
}
