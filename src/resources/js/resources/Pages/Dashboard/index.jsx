import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { MetaApiConnection } from "../../../utils/MetaApiConnection";

import { USER_ROLES } from "../../../constants";
import { BlankPage, Card, Span } from "../../components";
import { PageUtils } from "./PageUtils";
import utils from "../../../utils/Utils";
import { useLocale } from "../../../hooks";

const Dashboard = () => {
  const pageState = useSelector((state) => state.pageReducer);
  const userState = useSelector((state) => state.userReducer);
  const { dashboardPage: strings } = useLocale();
  const pageUtils = new PageUtils();

  useEffect(() => {
    //rr();
  }, []);

  const rr = async () => {
    const metaApi = new MetaApiConnection();
    const token =
      "SeXvxfbQHLxMoRR9MRFndfyRT9tD9QcNiQnxpMtgwY14VeSVNUR4FtSgmZr3VrEy";
    const accountId = "fd8f34a6-258f-4e27-8e56-274a328388fb";
    await metaApi.testMetaApiSynchronization(token, accountId);
    // const result = await metaApi.testMetaApiSynchronization(token, accountId);
    // console.log(result);
  };

  const renderUserReview = () => {
    return (
      <Card containerStyle="bg-success">
        <div>
          <div className="fs-4 fw-semibold">{strings.challenges}</div>
          <div className="my-2">
            <Span>{utils.en2faDigits(236)}</Span>
          </div>
        </div>
      </Card>
    );
  };

  const renderAdminReview = () => {
    return (
      <Card containerStyle="bg-info">
        <div>
          <div className="fs-4 fw-semibold">{strings.users}</div>
          <div className="my-2">
            <Span>{utils.en2faDigits(pageState?.props?.usersCount)}</Span>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="row"></div>
    </BlankPage>
  );
};

export default Dashboard;
