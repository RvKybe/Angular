import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {ManageAbilitiesService} from "../../services/manage-abilities.service";
import {numberValidator} from "../../directives/number-validator.directive";
import {IHero} from "../../model/hero.interface";
import {ManageHighlightService} from "../../services/manage-highlight.service";

@Component({
    selector: 'app-create-hero',
    templateUrl: './create-hero.component.html',
    styleUrls: ['./create-hero.component.scss']
})
export class CreateHeroComponent implements OnInit {
  @Input('mode') mode!: string;
  @Input('hero') hero!: IHero;

  public form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    power: new FormControl<number | null>(null, [Validators.required, numberValidator()]),
    abilities: new FormControl<number[]>([], Validators.required),
    level: new FormControl<number | null>(null, [Validators.required, numberValidator()])
  });

  public possibleAbilities: object[] = [];
  public submitButtonText!: string;
  public errorMessage!: string;
  public attention = {
    name: false,
    power: false,
    ability: false,
    level: false
  };

  constructor(
    private readonly manageHeroesService: ManageHeroesService,
    private readonly manageAbilitiesService: ManageAbilitiesService,
    private readonly manageHighlightService: ManageHighlightService
  ) {}

  ngOnInit(): void {
    if (this.mode === 'create') {
      this.submitButtonText = this.submitButtonText = 'Создать героя';
      this.abilityUpdateSubscribe(); // Здесь
      this.manageAbilitiesService.getAbilities();
    } else {
      this.submitButtonText = this.submitButtonText = 'Изменить героя';
      this.abilityUpdateSubscribe();
      this.manageAbilitiesService.getAbilities();
      this.form.controls.name.patchValue(this.hero.name);
      this.form.controls.power.patchValue(this.hero.power);
      this.form.controls.abilities.patchValue(this.hero.abilities);
      this.form.controls.level.patchValue(this.hero.level);
    }
  }

  /**
   * Функция отправки формы
   */
  public submit(): void {
    this.errorMessage = '';
    let hasDuplicate!: boolean;
    if (this.mode === 'create') {
      hasDuplicate = this.manageHeroesService.hasDuplicate(<string>this.form.value.name);
      if (this.form.valid && !hasDuplicate) {
        this.manageHeroesService.add(<IHero>this.form.value);
        this.form.reset();
      } else {
        this.highlightNecessaryInputs();
      }
    } else if (this.mode === 'edit') {
      hasDuplicate = this.manageHeroesService.hasDuplicate(<string>this.form.value.name, <number>this.hero.id);
      if (this.form.valid && !hasDuplicate) {
        this.manageHeroesService.edit(<number>this.hero.id, <IHero>this.form.value);
      } else {
        this.highlightNecessaryInputs();
      }
    }
    if (hasDuplicate) {
      this.errorMessage = 'Такой герой уже существует';
    }
  }

  /**
   * Функция подписки на изменения списка способностей
   * @private
   */
  private abilityUpdateSubscribe(): void {
    this.manageAbilitiesService.abilityStream$
      .subscribe(abilities => this.possibleAbilities = abilities);
  }

  /**
   * Подсвечивает незаполненные поля формы (в том числе и неверно заполненные)
   * @private
   */
  private highlightNecessaryInputs(): void {
    this.attention = this.manageHighlightService.highlightNecessaryInputs(this.form);
  }
}
