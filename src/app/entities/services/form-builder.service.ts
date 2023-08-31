import {Injectable} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LFilterForm} from "../labels/filter-form.label";


@Injectable({
    providedIn: 'root'
})
export class FormBuilderService {
    private _formBuilder: FormBuilder = new FormBuilder();

    public get form(): FormGroup {
        return this._formBuilder.group({
            [LFilterForm.SEMESTER]: [null, Validators.required],
            [LFilterForm.FILIAL]: [null, Validators.required],
            [LFilterForm.CATHEDRA]: [null, Validators.required]
        });
    }

}
