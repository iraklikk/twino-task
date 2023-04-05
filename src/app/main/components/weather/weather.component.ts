import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {Observable} from "rxjs";
import {Weather} from "../../entities/weather";
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'twn-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather$!: Observable<Weather>;

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit() {
    this.weather$ = this.weatherService.weather$;
  }

}
