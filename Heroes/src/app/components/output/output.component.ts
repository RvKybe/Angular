import {Component, Input, OnInit} from '@angular/core';
import {ManageHeroesService} from "../../services/manage-heroes.service";
import {IHero} from "../../model/hero.interface";

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit{
  public heroes:IHero[] = [];

  ngOnInit() {
    this.manageHeroService.stream.subscribe(item => this.heroes = item);
  }

  constructor(private readonly manageHeroService: ManageHeroesService) {}
}
