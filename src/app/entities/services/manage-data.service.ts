import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, lastValueFrom, Observable} from "rxjs";
import {IFilterForm} from "../interfaces/filter-form.interface";
import {IComboboxData} from "../interfaces/combobox-data.interface";
import {IGridItemData} from "../interfaces/grid-item-data.interface";

@Injectable({
  providedIn: 'root'
})
export class ManageDataService {
  private _gridData$$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public gridData$: Observable<any> = this._gridData$$.asObservable();

  private _comboBoxData$$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public comboBoxData$: Observable<any> = this._comboBoxData$$.asObservable();

  private _origin: string = '';

  constructor(private readonly httpClient: HttpClient) {
  }

  public getGridData(selectedItemsIds: IFilterForm): void {
    lastValueFrom(this.httpClient.get(this._origin))
        .then((data: any) => this._gridData$$.next(<IGridItemData[]>data));
  }

  public getComboBoxData(): void {
    lastValueFrom(this.httpClient.get(this._origin))
        .then((data: any) => this._comboBoxData$$.next(<IComboboxData>data));
  }
}
