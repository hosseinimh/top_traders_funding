import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate, Route } from "react-router";

import * as Pages from "../Pages";
import utils from "../../utils/Utils";
import { BASE_PATH, USER_ROLES } from "../../constants";

function AuthRoute() {
  const userState = useSelector((state) => state.userReducer);
  const lsUser = utils.getLSUser();

  return (
    <Router>
      {userState.isAuthenticated && (
        <Routes>
          {lsUser?.role === USER_ROLES.ADMINISTRATOR && (
            <>
              <Route
                path={`${BASE_PATH}/app_rules/add`}
                element={<Pages.AddAppRule />}
              />
              <Route
                path={`${BASE_PATH}/app_rules/admin`}
                element={<Pages.AppRulesAdmin />}
              />
              <Route
                path={`${BASE_PATH}/app_rules/edit/:appRuleId`}
                element={<Pages.EditAppRule />}
              />
              <Route
                path={`${BASE_PATH}/campaigns/add`}
                element={<Pages.AddCampaign />}
              />
              <Route
                path={`${BASE_PATH}/campaigns/edit/:campaignId`}
                element={<Pages.EditCampaign />}
              />
              <Route
                path={`${BASE_PATH}/campaigns`}
                element={<Pages.Campaigns />}
              />
              <Route
                path={`${BASE_PATH}/users/change_password/:userId`}
                element={<Pages.ChangePasswordUser />}
              />
              <Route
                path={`${BASE_PATH}/users/add`}
                element={<Pages.AddUser />}
              />
              <Route
                path={`${BASE_PATH}/users/edit/:userId`}
                element={<Pages.EditUser />}
              />
              <Route path={`${BASE_PATH}/users`} element={<Pages.Users />} />
              <Route
                path={`${BASE_PATH}/tickets/add/:userId`}
                element={<Pages.AddTicket />}
              />
              <Route
                path={`${BASE_PATH}/tickets/:userId`}
                element={<Pages.Tickets />}
              />
              <Route
                path={`${BASE_PATH}/challenge_balances/add`}
                element={<Pages.AddChallengeBalance />}
              />
              <Route
                path={`${BASE_PATH}/challenge_balances/edit/:balanceId`}
                element={<Pages.EditChallengeBalance />}
              />
              <Route
                path={`${BASE_PATH}/challenge_balances`}
                element={<Pages.ChallengeBalances />}
              />
              <Route
                path={`${BASE_PATH}/challenge_leverages/add`}
                element={<Pages.AddChallengeLeverage />}
              />
              <Route
                path={`${BASE_PATH}/challenge_leverages/edit/:leverageId`}
                element={<Pages.EditChallengeLeverage />}
              />
              <Route
                path={`${BASE_PATH}/challenge_leverages`}
                element={<Pages.ChallengeLeverages />}
              />
              <Route
                path={`${BASE_PATH}/challenge_servers/add`}
                element={<Pages.AddChallengeServer />}
              />
              <Route
                path={`${BASE_PATH}/challenge_servers/edit/:serverId`}
                element={<Pages.EditChallengeServer />}
              />
              <Route
                path={`${BASE_PATH}/challenge_servers`}
                element={<Pages.ChallengeServers />}
              />
              <Route
                path={`${BASE_PATH}/challenge_rules/edit`}
                element={<Pages.EditChallengeRule />}
              />
              <Route
                path={`${BASE_PATH}/challenge_rules`}
                element={<Pages.ChallengeRules />}
              />
              <Route
                path={`${BASE_PATH}/challenge_platforms/add`}
                element={<Pages.AddChallengePlatform />}
              />
              <Route
                path={`${BASE_PATH}/challenge_platforms/edit/:platformId`}
                element={<Pages.EditChallengePlatform />}
              />
              <Route
                path={`${BASE_PATH}/challenge_platforms`}
                element={<Pages.ChallengePlatforms />}
              />
              <Route
                path={`${BASE_PATH}/challenges`}
                element={<Pages.ChallengesAdmin />}
              />
              <Route
                path={`${BASE_PATH}/challenges/edit/:challengeId`}
                element={<Pages.EditChallenge />}
              />
            </>
          )}
          {lsUser?.role === USER_ROLES.USER && (
            <>
              <Route
                path={`${BASE_PATH}/app_rules`}
                element={<Pages.AppRulesUser />}
              />
              <Route
                path={`${BASE_PATH}/challenges/take/free`}
                element={<Pages.TakeFreeChallenge />}
              />
              <Route
                path={`${BASE_PATH}/challenges`}
                element={<Pages.Challenges />}
              />
            </>
          )}
          <Route
            path={`${BASE_PATH}/tickets/add`}
            element={<Pages.AddTicketCurrentUser />}
          />
          <Route
            path={`${BASE_PATH}/tickets`}
            element={<Pages.TicketsCurrentUser />}
          />
          <Route
            path={`${BASE_PATH}/tickets/threads/:ticketId`}
            element={<Pages.TicketThreads />}
          />
          <Route
            path={`${BASE_PATH}/challenges/analyze/:challengeId`}
            element={<Pages.AnalyzeChallenge />}
          />
          <Route
            path={`${BASE_PATH}/users/edit`}
            element={<Pages.EditCurrentUser />}
          />
          <Route
            path={`${BASE_PATH}/users/change_password`}
            element={<Pages.ChangePasswordCurrentUser />}
          />
          <Route path={`${BASE_PATH}`} element={<Pages.Dashboard />} />
          <Route path="*" element={<Navigate to={BASE_PATH} />} />
        </Routes>
      )}
      {!userState.isAuthenticated && (
        <Routes>
          <Route
            path={`${BASE_PATH}/users/login`}
            exact={true}
            element={<Pages.Login />}
          />
          <Route
            path={`${BASE_PATH}/users/forgot`}
            exact={true}
            element={<Pages.ForgotPassword />}
          />
          <Route
            path={`${BASE_PATH}/users/signup`}
            exact={true}
            element={<Pages.Signup />}
          />
          <Route
            path="*"
            element={<Navigate to={`${BASE_PATH}/users/login`} />}
          />
        </Routes>
      )}
    </Router>
  );
}

export default AuthRoute;
