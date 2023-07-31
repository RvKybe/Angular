import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageHighlightService {
  /**
   * Функция, которая подсвечивает пустые поля формы (или не валидные)
   * @param form - форма добавления/редактирования героя
   */
  public highlightNecessaryInputs(form: any) {
    const attention: {name: boolean, power: boolean, ability: boolean, level: boolean} = {
      name: false,
      power: false,
      ability: false,
      level: false
    };
    if (form.controls.name.invalid) {
      attention.name = true;
    }
    if (form.controls.power.invalid) {
      attention.power = true;
    }
    if (form.controls.abilities.invalid) {
      attention.ability = true;
    }
    if (form.controls.level.invalid) {
      attention.level = true;
    }
    return attention
  }
}
