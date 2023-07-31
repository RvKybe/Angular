import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";

@Component({
  selector: 'app-create-ability',
  templateUrl: './create-ability.component.html',
  styleUrls: ['./create-ability.component.scss']
})
export class CreateAbilityComponent {

  public form: FormGroup = new FormGroup({
      abilityName: new FormControl<string | null>(null, Validators.required)
  });

  /**
   * Функция создания способности героя.
   */
  public createAbility(): void {
        if (this.form.valid && !this.manageAbilitiesServices.hasDuplicate(<string>this.form.value.abilityName)) {
            this.manageAbilitiesServices.add(<string>this.form.value.abilityName);
            this.form.reset();
        } else {
            this.attentionAbility = true;
        }
    }
  public attentionAbility: boolean = false;

  constructor(private readonly manageAbilitiesServices: ManageAbilitiesService) {}
}
