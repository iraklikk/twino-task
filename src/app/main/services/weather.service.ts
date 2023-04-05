import { Injectable } from '@angular/core';
import { Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Weather} from "../entities/weather";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly API_KEY = 'b0b6f182cdc5a79e27b8e3ab1c553a8f';

  weather$ = new Subject<Weather>();

  constructor(private http: HttpClient) {
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => this.getWeather(position));
  }


  getWeather(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.http.get<Weather>(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${this.API_KEY}&units=metric`).pipe(
      untilDestroyed(this),
      tap((res: Weather) => this.weather$.next(res))
    ).subscribe();
  }
}
