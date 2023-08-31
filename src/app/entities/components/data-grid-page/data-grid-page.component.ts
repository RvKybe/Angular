import {Component, DestroyRef, OnInit} from '@angular/core';
import {EViewMode} from "../../enums/view-mode.enum";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ManageDataService} from "../../services/manage-data.service";
import {EWorkloadGridField} from "../../enums/workload-grid-field.enum";
import {EWorkloadGridFieldName} from "../../enums/workload-grid-filed-name.enum";
import {IGridItemData} from "../../interfaces/grid-item-data.interface";
import {ManageViewModeService} from "../../services/manage-view-mode.service";

@Component({
  selector: 'gl-data-grid-page',
  templateUrl: './data-grid-page.component.html',
  styleUrls: ['./data-grid-page.component.scss']
})
export class DataGridPageComponent implements OnInit {
  public viewMode!: EViewMode;

  public dataGridData: IGridItemData[] =  [];

  protected readonly EViewMode = EViewMode;
  protected readonly EWorkloadGridFields = EWorkloadGridField;
  protected readonly EWorkloadGridFieldsName = EWorkloadGridFieldName;

  constructor(private readonly _destroyRef: DestroyRef,
              private readonly _manageDataService: ManageDataService,
              private readonly _manageViewModeService: ManageViewModeService
  ) {
  }

  public ngOnInit(): void {
    this._manageDataService.gridData$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((data: IGridItemData[]) => this.dataGridData = data);
    this._manageViewModeService.viewMode$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((mode: EViewMode) => this.viewMode = mode);
  }
}
