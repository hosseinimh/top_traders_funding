import React from "react";
import { useSelector } from "react-redux";

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

  const renderReview = () =>
    userState?.user?.role === USER_ROLES.ADMINISTRATOR
      ? renderAdminReview()
      : renderUserReview();

  const renderUserReview = () => {
    return (
      <Card containerStyle="bg-success">
        <div>
          <div className="fs-4 fw-semibold">چالش‌های برگزارشده</div>
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
      <div className="row">{renderReview()}</div>
    </BlankPage>
  );
};

export default Dashboard;
