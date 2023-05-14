import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { USER_ROLES } from "../../../constants";
import { BlankPage, Card, Span } from "../../components";
import { PageUtils } from "./PageUtils";
import utils from "../../../utils/Utils";
import { useLocale } from "../../../hooks";
import { MetaApi } from "../../../utils/MetaApi";

const Dashboard = () => {
  const pageState = useSelector((state) => state.pageReducer);
  const userState = useSelector((state) => state.userReducer);
  const { dashboardPage: strings } = useLocale();
  const pageUtils = new PageUtils();

  useEffect(() => {
    rr();
  }, []);

  const rr = async () => {
    const metaApi = new MetaApi();
    await metaApi.connect(
      "2zyifZwLcfqyCburdKAkaoyNbGMdhDbXsKyHLj6pJTk8HPPL3x2PdTdXXSYHwFAm",
      "f57e5db2-1b9e-43f5-aa42-d52d910a00d9"
    );
    const result = await metaApi.sync2();
    console.log(result);
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
      <div className="row">
        {userState?.user?.role === USER_ROLES.ADMINISTRATOR
          ? renderAdminReview()
          : renderUserReview()}
      </div>
    </BlankPage>
  );
};

export default Dashboard;
