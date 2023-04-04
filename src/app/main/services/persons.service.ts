import { Injectable } from '@angular/core';
import { Person } from "../entities/person";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  private persons: Person[] = [
    {
      id: 1,
      firstName: 'Meri',
      lastName: 'Robitashvili',
      income: 3333,
      score: 123456789,
      image: 'assets/icons/meri.jpg'
    },
    {
      id: 2,
      firstName: 'Giorgi',
      lastName: 'Mirashvili',
      income: 3334,
      score: 123456789,
      image: 'assets/icons/mirasha.jpg'
    },
  ]
  persons$ = new BehaviorSubject<Person[]>(this.persons);
  constructor() { }
}
