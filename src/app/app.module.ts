import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {DataGridPageComponent} from "./entities/components/data-grid-page/data-grid-page.component";
import {DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule} from "devextreme-angular";
import { MainComponent } from './entities/components/main/main.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { SelectModeComponent } from './entities/components/select-mode/select-mode.component';

@NgModule({
    declarations: [
        AppComponent,
        DataGridPageComponent,
        MainComponent,
        SelectModeComponent,
    ],
    imports: [
        BrowserModule,
        DxDataGridModule,
        DxSelectBoxModule,
        DxCheckBoxModule,
        DxButtonModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
