import {Component, Input, OnInit} from '@angular/core';
import {IHero} from "../../model/hero.interface";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";

@Component({
    selector: 'app-output-hero',
    templateUrl: './output-hero.component.html',
    styleUrls: ['./output-hero.component.scss']
})
export class OutputHeroComponent implements OnInit{
  @Input() hero!: IHero;

  public isVisible: boolean = false;
  public icon: string = 'chevrondown';
  public abilitiesList!: string[];
  public popupVisible!: boolean;

  ngOnInit(): void {
    this.abilitiesList = this.manageAbilitiesService.getAbilityNamesByIds(this.hero.abilities);
  }

  /**
   * Функция смены иконки в кнопке сортировки
   */
  public changeDisplay(): void {
    this.isVisible = ! this.isVisible;
    this.icon = this.isVisible ? 'chevronup' : 'chevrondown';
  }

  /**
   * Функция, которая переключает режим отображения окна редактирования героя
   * @param targetStatus - нужный режим отображения
   */
  public switchPopupDisplay(targetStatus: boolean): void {
    this.popupVisible = targetStatus;
  }

  constructor(private readonly manageAbilitiesService: ManageAbilitiesService) {}
}
