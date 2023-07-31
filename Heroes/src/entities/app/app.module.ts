import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DxButtonModule, DxPopupModule, DxSelectBoxModule, DxTagBoxModule, DxTextBoxModule} from "devextreme-angular";
import { CreateHeroComponent } from './components/create-hero/create-hero.component';
import { CreateAbilityComponent } from './components/create-ability/create-ability.component';
import { FiltersComponent } from './components/filters/filters.component';
import { OutputComponent } from './components/output/output.component';
import { OutputHeroComponent } from './components/output-hero/output-hero.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CreateHeroComponent,
    CreateAbilityComponent,
    FiltersComponent,
    OutputComponent,
    OutputHeroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxButtonModule,
    ReactiveFormsModule,
    FormsModule,
    DxTagBoxModule,
    DxPopupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
