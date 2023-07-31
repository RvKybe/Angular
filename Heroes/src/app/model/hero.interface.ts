/**
 * Интерфейс героя
 */
export interface IHero {
    name: string;
    power: number;
    abilities: number[];
    level: number;
    id?:number;
}
