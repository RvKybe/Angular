import {Injectable} from '@angular/core';
import {IHero} from "../model/hero.interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageHeroesService {
  public heroes:IHero[] = [];
  public filteredHeroes: IHero[] = [];
  public heroStream$:Subject<IHero[]> = new Subject();
  public savedFilters: any = null;
  public sortMode: number = 1;
  public counter: number = 1;

  /**
   * Функция создания героя
   * @param hero - объект героя
   */
  public add(hero:IHero) {
    hero.id = this.counter++;
    this.heroes.push(hero);
    this.sortHeroes(this.sortMode);
    this.savedFilters ? this.filterHeroes(this.savedFilters) : this.heroStream$.next(this.heroes);
  }

  /**
   * Функция редактирования героя
   * @param id - id героя для редактирования
   * @param hero - новый объект героя
   */
  public edit(id: number, hero:IHero): void {
    const heroIndex: number = this.heroes.findIndex(hero => {
        return hero.id === id;
    })
    this.heroes[heroIndex] = hero;
    this.sortHeroes(this.sortMode);
    this.savedFilters ? this.filterHeroes(this.savedFilters) : this.heroStream$.next(this.heroes);
  }

  /**
   * Функция фильтрации героев
   * @param filterParameters - параметры фильтрации
   */
  public filterHeroes(filterParameters: any ): void {
    this.savedFilters = filterParameters;
    this.filteredHeroes = this.heroes.filter(hero => {
      return ((!filterParameters.levelFloor && !filterParameters.levelCeil) || (hero.level <= filterParameters.levelCeil && !filterParameters.levelFloor)
              || (hero.level >= filterParameters.levelFloor && !filterParameters.levelCeil) || (hero.level <= filterParameters.levelCeil && hero.level >= filterParameters.levelFloor))
          && (!filterParameters.abilities || this.searchAbilityName(filterParameters.abilities, hero.abilities))
          && (!filterParameters.searchText || hero.name.indexOf(filterParameters.searchText) > -1);
    });
    this.heroStream$.next(this.filteredHeroes);
  }

  /**
   * Функция сортировки отфильтрованного списка героев
   * @param sortMode - режим сортировки
   */
  public sortHeroes(sortMode: number): void {
    this.heroes = this.heroes.sort((a: IHero, b: IHero) => {
      return (a.level - b.level) * sortMode;
    });
  }

  /**
   * Функция проверки героя на существование его дубликата
   * @param newHeroName - новое имя (или измененное имя существующего героя)
   * @param newHeroId - id нового героя (или измененного старого)
   */
  public hasDuplicate(newHeroName: string, newHeroId?: number): boolean {
    if (this.heroes.length === 0) return false;
    return this.heroes.some(hero => {
      return hero.name === newHeroName && newHeroId !== hero.id;
    });
  }

  /**
   * Функция фильтрации по способностям.
   * Способности героя и фильтрационные способности образуют список уникальных значений
   * Если длина списка меньше суммы длин способностей героя и фильтрационных способностей
   * То это означает наличие совпадения в этих двух списках, что означает, что герой подходит
   * При длине уникального списка === 1, также происходит совпадение способностей
   * @param filterAbilities - список фильтрационных способностей
   * @param heroAbilities - список способностей героя
   * @private
   */
  private searchAbilityName(filterAbilities: number[], heroAbilities: number[]): boolean {
    const set:Set<number> = new Set(filterAbilities.concat(heroAbilities).values());
    return set.size < filterAbilities.length || set.size === 1;
  }
}
