import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {IAbility} from "../model/ability.interface";

@Injectable({
  providedIn: 'root'
})
export class ManageAbilitiesService {

  public stream:Subject<IAbility[]> = new Subject();

  /**
   * Функция создания способности
   * @param abilityName - название созданной способности
   */
  public add(abilityName: string) {
    const newAbility: IAbility = {
        id: ++this.lastId,
        name: abilityName,
    }
    this.possibleAbilities.push(newAbility);
    this.sendAbilities();
  }

  /**
   * Функция получения названий способностей по их id
   * @param heroAbilities - список id способностей героя
   */
  public getAbilityNamesByIds (heroAbilities: number[]): string[]{
    const  abilitiesList: string[] = [];
    this.possibleAbilities.forEach(ability => {
      if (heroAbilities.includes(ability.id)) {
        abilitiesList.push(ability.name);
      }
    })
    return abilitiesList;
  }

  /**
   * Функция проверки способности на наличие дубликата
   * @param abilityName - название новой способности
   */
  public hasDuplicate(abilityName: string): boolean {
    return this.possibleAbilities.some(ability => ability.name === abilityName);
  }

  /**
   * Функция для первичного получения списка способностей
   */
  public getAbilities () {
    this.sendAbilities();
  }

  /**
   * Функция отправки списка способностей
   * @private
   */
  private sendAbilities() {
    this.stream.next(this.possibleAbilities);
  }

  private possibleAbilities: IAbility[] = [
    {
      id: 1,
      name: 'Суперсила'
    },
    {
      id: 2,
      name: 'Суперскорость'
    },
    {
      id: 3,
      name: 'Телепортация'
    },
    {
      id: 4,
      name: 'Деньги'
    },

  ];
  private lastId: number = 4;
}
