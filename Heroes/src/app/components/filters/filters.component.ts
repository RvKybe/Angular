import {Component, OnInit} from '@angular/core';
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {FormControl, FormGroup} from "@angular/forms";
import {IAbility} from "../../model/ability.interface";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit{
  public possibleAbilities!: IAbility[];
  public sort: string = 'fromLowLevel';
  public iconName: string = 'chevronup';
  public sortName: string = 'возрастанию';

  form = new FormGroup({
      levelFloor: new FormControl(),
      levelCeil: new FormControl(),
      abilities: new FormControl(),
      searchText: new FormControl(),
  })

  ngOnInit(): void {
      this.abilityUpdateSubscribe();
      this.manageAbilitiesService.getAbilities();
      this.form.valueChanges
          .subscribe((form): void => {
              this.manageHeroesService.filterHeroes(this.form.value);
          });
  }

  /**
   * Подписка на изменения в списке способностей
   */
  public abilityUpdateSubscribe():void {
        this.manageAbilitiesService.abilityStream$
            .subscribe(abilities => this.possibleAbilities = abilities);
  }

  /**
   * Переключение сортировки
   */
  public switchSort(): void {
    this.sort = this.sort === 'fromLowLevel' ? 'fromHighLevel' : 'fromLowLevel';
    switch(this.sort) {
        case 'fromLowLevel':
            this.iconName = 'chevronup';
            this.sortName = 'возрастанию';
            break;
        case 'fromHighLevel':
            this.iconName = 'chevrondown';
            this.sortName = 'убыванию';
            break;
    }
    const sortMode: number = this.sort === 'fromLowLevel' ? 1 : -1;
    this.manageHeroesService.sortMode = sortMode;
    this.manageHeroesService.sortHeroes(sortMode);
  }
  constructor(
    private readonly manageAbilitiesService: ManageAbilitiesService,
    private readonly manageHeroesService: ManageHeroesService
  ) {}
}
