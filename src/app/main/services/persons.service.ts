import { Injectable } from '@angular/core';
import { Person } from "../entities/person";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {


  persons: Person[] = [
    {
      id: 1,
      firstName: 'a',
      lastName: 'Robitashvili',
      income: '3333',
      score: 1000,
      imageSource: 'assets/icons/meri.jpg'
    },
    {
      id: 2,
      firstName: 'b',
      lastName: 'Mirashvili',
      income: '3334',
      score: 500,
      imageSource: 'assets/icons/mirasha.jpg'
    },
  ];

  saveUser$ = new Subject<boolean>();
  persons$ = new BehaviorSubject<Person[]>(this.persons);
  nextId = this.persons.length + 1;
  openEdit$ = new BehaviorSubject<number>(0);

  addPerson(person: Person) {
    this.persons.push(person);
    this.persons$.next(this.persons);
  }

  constructor() { }
}
