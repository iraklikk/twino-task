import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ToasterInfo } from "../entities/toasterInfo";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  toasterDetails$ = new Subject<ToasterInfo>();

  constructor() { }
}
