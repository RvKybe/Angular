import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {EViewMode} from "../enums/view-mode.enum";

@Injectable({
  providedIn: "root"
})
export class ManageViewModeService {
  private _viewMode$$: BehaviorSubject<EViewMode> = new BehaviorSubject<EViewMode>(EViewMode.WORKLOAD_MODE);
  public viewMode$: Observable<EViewMode> = this._viewMode$$.asObservable();

  public set viewMode(mode: EViewMode) {
    this._viewMode$$.next(mode);
  }
}
