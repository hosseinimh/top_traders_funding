import React from "react";

import {
    ColumnRow,
    FormPage,
    InputFileColumn,
    InputSelectColumn,
    InputTextAreaColumn,
    InputTextColumn,
} from "../../../../components";
import { TICKET_TYPES } from "../../../../../constants";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";

const BaseAddTicket = ({ userId }) => {
    const { ticketTypes } = useLocale();
    const pageUtils = new PageUtils(userId);
    const types = [
        { id: TICKET_TYPES.TYPE1, value: ticketTypes.type1 },
        { id: TICKET_TYPES.TYPE2, value: ticketTypes.type2 },
        { id: TICKET_TYPES.TYPE3, value: ticketTypes.type3 },
        { id: TICKET_TYPES.TYPE4, value: ticketTypes.type4 },
        { id: TICKET_TYPES.TYPE5, value: ticketTypes.type5 },
    ];

    const onChangeFile = (e) => {
        const file = e?.target?.files[0];

        if (file) {
            pageUtils.onSetFile(file);
        }
    };

    return (
        <FormPage pageUtils={pageUtils}>
            <ColumnRow columns={1}>
                <InputSelectColumn
                    field="type"
                    items={types}
                    selectedValue={TICKET_TYPES.TYPE1}
                    columnClassName="col-12 col-md-3"
                />
            </ColumnRow>
            <ColumnRow columns={1}>
                <InputTextColumn
                    field="subject"
                    columnClassName="col-12 col-md-8"
                />
            </ColumnRow>
            <ColumnRow columns={1}>
                <InputTextAreaColumn
                    field="content"
                    columnClassName="col-12 col-md-8"
                />
            </ColumnRow>
            <InputFileColumn
                field="file"
                onChangeFile={(e) => onChangeFile(e)}
            />
        </FormPage>
    );
};

export default BaseAddTicket;
