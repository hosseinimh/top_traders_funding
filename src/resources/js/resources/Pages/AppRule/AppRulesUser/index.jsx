import React from "react";
import { useSelector } from "react-redux";

import { Accordion, PageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";

const AppRulesUser = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const pageUtils = new PageUtils();

    return (
        <PageLayout pageUtils={pageUtils}>
            <Accordion items={pageState?.props?.items} />
        </PageLayout>
    );
};

export default AppRulesUser;
