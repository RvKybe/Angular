import {Component, DestroyRef, OnInit} from '@angular/core';
import {EViewMode} from "../../enums/view-mode.enum";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FormBuilderService} from "../../services/form-builder.service";
import {FormControl} from "@angular/forms";
import {LFilterForm} from "../../labels/filter-form.label";
import {ManageDataService} from "../../services/manage-data.service";
import {IComboboxData} from "../../interfaces/combobox-data.interface";
import {IFilterForm} from "../../interfaces/filter-form.interface";
import {LItem} from "../../labels/item.label";
import {IItem} from "../../interfaces/item.interface";
import {ManageViewModeService} from "../../services/manage-view-mode.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public form = this._formBuilderService.form;

  public termData: IItem[] = [];
  public branchData: IItem[] = [];
  public departmentData: IItem[] = [];
  public viewMode!: EViewMode;

  protected readonly EViewMode = EViewMode;
  protected readonly LItem = LItem;

  constructor(private readonly _destroyRef: DestroyRef,
              private readonly _formBuilderService: FormBuilderService,
              private readonly _manageDataService: ManageDataService,
              private readonly _manageViewModeService: ManageViewModeService
  ) {
  }

  public ngOnInit(): void {
    this.cathedraControl.disable();
    //this._manageDataService.getComboBoxData();
    this._manageDataService.comboBoxData$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: IComboboxData) => this._distribution(data));
    this.form.valueChanges.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._checkIsFormValid());
    this._manageViewModeService.viewMode$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((mode: EViewMode) => this.viewMode = mode);
  }

  public createPdfReport(): void {

  }

  private _distribution(data: IComboboxData): void {
    this.termData = data[LFilterForm.SEMESTER];
    this.branchData = data[LFilterForm.FILIAL];
    this.departmentData = data[LFilterForm.CATHEDRA];
  }

  private _checkIsFormValid(): void {
    if (!!this.semesterControl.value && !!this.filialControl.value) {
      this.cathedraControl.enable({emitEvent: false});
      return;
    }
    if (this.form.valid) {
      this._manageDataService.getGridData(<IFilterForm>this.form.value);
    }
  }

  public get semesterControl(): FormControl<number> {
    return this.form.get(LFilterForm.SEMESTER) as FormControl<number>;
  }

  public get filialControl(): FormControl<number> {
    return this.form.get(LFilterForm.FILIAL) as FormControl<number>;
  }

  public get cathedraControl(): FormControl<number> {
    return this.form.get(LFilterForm.CATHEDRA) as FormControl<number>;
  }
}
