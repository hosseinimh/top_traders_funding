import { useForm } from "react-hook-form";

import { Ticket as Entity } from "../../../../http/entities";
import { setPageIconAction } from "../../../../state/page/pageActions";
import { BasePageUtils } from "../../../../utils/BasePageUtils";
import { USER_ROLES } from "../../../../constants";
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
        };
    }

    onLoad() {
        super.onLoad();
        this.validateIfNotValidateParams();
        this.dispatch(setPageIconAction("pe-7s-id"));
        this.fillForm(this.params);
    }

    validateIfNotValidateParams() {
        const userId = utils.isId(this.pageState.params.userId)
            ? parseInt(this.pageState.params.userId)
            : this.userState.user.id;
        this.navigateIfNotValidId(userId);
        this.params = { ...this.params, userId };
    }

    async fillForm(data = null) {
        const promise =
            this.userState?.user?.role === USER_ROLES.ADMINISTRATOR
                ? this.entity.getPaginate(data?.userId)
                : this.entity.getPaginateFromUser();
        super.fillForm(promise);
    }
}
