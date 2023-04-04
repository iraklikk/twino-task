import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MainPageComponent,
    PersonDetailsComponent,
    PersonFormComponent,
    AddEditComponent,
    WeatherComponent,
    PersonCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    MainPageComponent,
    PersonDetailsComponent
  ]
})
export class MainModule { }
