import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const EditChallengeRule = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn field="duration1" textAlign="left" type="number" />
      <InputTextColumn field="duration2" textAlign="left" type="number" />
      <InputTextColumn field="durationReal" textAlign="left" type="number" />
      <InputTextColumn field="durationFree" textAlign="left" type="number" />
      <InputTextColumn field="dailySl1" textAlign="left" type="number" />
      <InputTextColumn field="dailySl2" textAlign="left" type="number" />
      <InputTextColumn field="dailySlReal" textAlign="left" type="number" />
      <InputTextColumn field="dailySlFree" textAlign="left" type="number" />
      <InputTextColumn field="totalSl1" textAlign="left" type="number" />
      <InputTextColumn field="totalSl2" textAlign="left" type="number" />
      <InputTextColumn field="totalSlReal" textAlign="left" type="number" />
      <InputTextColumn field="totalSlFree" textAlign="left" type="number" />
      <InputTextColumn field="target1" textAlign="left" type="number" />
      <InputTextColumn field="target2" textAlign="left" type="number" />
      <InputTextColumn field="targetReal" textAlign="left" type="number" />
      <InputTextColumn field="targetFree" textAlign="left" type="number" />
      <InputTextColumn field="tradeDays1" textAlign="left" type="number" />
      <InputTextColumn field="tradeDays2" textAlign="left" type="number" />
      <InputTextColumn field="tradeDaysReal" textAlign="left" type="number" />
      <InputTextColumn field="tradeDaysFree" textAlign="left" type="number" />
    </FormPage>
  );
};

export default EditChallengeRule;
