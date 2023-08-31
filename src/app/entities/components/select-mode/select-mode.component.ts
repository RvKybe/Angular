import {Component, DestroyRef, Input, OnInit, Output} from '@angular/core';
import {EViewMode} from "../../enums/view-mode.enum";
import {ManageViewModeService} from "../../services/manage-view-mode.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-select-mode',
  templateUrl: './select-mode.component.html',
  styleUrls: ['./select-mode.component.scss']
})
export class SelectModeComponent implements OnInit{
  public viewMode!: EViewMode;

  protected readonly EViewMode = EViewMode;

  constructor(private readonly _destroyRef: DestroyRef,
              private readonly _manageViewModeService: ManageViewModeService
  ) {
  }

  public ngOnInit(): void {
    this._manageViewModeService.viewMode$.pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((mode: EViewMode) => this.viewMode = mode);
  }

  public changeViewMode(mode: EViewMode): void {
    this._manageViewModeService.viewMode = mode;
  }
}
