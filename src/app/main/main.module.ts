import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { WeatherComponent } from './components/weather/weather.component';


@NgModule({
  declarations: [
    MainPageComponent,
    PersonDetailsComponent,
    PersonFormComponent,
    AddEditComponent,
    WeatherComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class MainModule { }
