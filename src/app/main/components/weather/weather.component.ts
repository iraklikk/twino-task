import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weather.service";
import {Observable, tap} from "rxjs";
import {Weather} from "../../entities/weather";
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'twn-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather!: Weather;
  errorMessage!: string;
  imageSource!: string;
  description!: string;

  constructor(private weatherService: WeatherService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.weatherService.weather.asObservable().pipe(
      tap(res => {
        if (typeof res === 'string') {
          this.errorMessage = res;
        } else {
          console.log(res);
          const w = res.current.weather[0];
          if (w) {
            this.description = w.description;
            this.imageSource = `https://openweathermap.org/img/wn/${w.icon}.png`;
          }
          this.weather = res;
        }
        this.cdr.detectChanges();
      })).subscribe();
  }

}
