import {EWorkloadGridField} from "../enums/workload-grid-field.enum";

export interface IGridItemData {
    [EWorkloadGridField.SUBJECT]: string;
    [EWorkloadGridField.GROUPS]: string;
    [EWorkloadGridField.TYPE]: string;
    [EWorkloadGridField.HOURS]: number;
    [EWorkloadGridField.KIND_OF_WORK]: string;
    [EWorkloadGridField.PLAN]: string;
    [EWorkloadGridField.RESULT]: string;
}
