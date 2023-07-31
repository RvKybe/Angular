import {Component, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {IHero} from "../../model/hero.interface";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit {

  public heroes:IHero[] = [];

  constructor(private readonly manageHeroService: ManageHeroesService) {}

  ngOnInit() {
    this.manageHeroService.heroStream$.subscribe(item => this.heroes = item);
  }
}
