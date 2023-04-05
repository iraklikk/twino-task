import { Injectable } from '@angular/core';
import {Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {Weather} from "../entities/weather";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly API_KEY = 'b0b6f182cdc5a79e27b8e3ab1c553a8f';

  weather = new Subject<string | Weather>();

  constructor(private http: HttpClient) {
    console.log('here');
    this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(position => this.getWeather(position), (error) => this.getError(error))
  }

  getError(error: any): any {
    let errorMessage = '';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'location Denied';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location unavailable';
        break;
      case error.TIMEOUT:
        errorMessage = 'location timed out';
        break;
      default:
        errorMessage = 'An unknown error occurred';
    }
    this.weather.next(errorMessage);
  }

  getWeather(position: GeolocationPosition) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    this.http.get<Weather>(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${this.API_KEY}&units=metric`).pipe(
      untilDestroyed(this),
      tap((res: Weather) => this.weather.next(res))
    ).subscribe()
  }
}
