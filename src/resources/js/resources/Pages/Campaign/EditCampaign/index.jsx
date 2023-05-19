import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
  InputCheckboxContainer,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const EditCampaign = () => {
  const { editCampaignPage: strings } = useLocale();
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn field="title" showLabel />
      <InputCheckboxContainer>
        <InputCheckboxColumn field="isActive" checked={true} />
      </InputCheckboxContainer>
    </FormPage>
  );
};

export default EditCampaign;
