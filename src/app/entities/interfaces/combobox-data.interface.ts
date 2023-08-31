import {LFilterForm} from "../labels/filter-form.label";
import {IItem} from "./item.interface";

export interface IComboboxData {
    [LFilterForm.SEMESTER]: IItem[],
    [LFilterForm.FILIAL]: IItem[],
    [LFilterForm.CATHEDRA]: IItem[]
}
