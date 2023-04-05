import { Injectable } from '@angular/core';
import { Person } from "../entities/person";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  persons: Person[] = [
    {
      firstName : "Meri",
      id: 1,
      imageSource :    "assets/icons/meri.jpg",
      income : "3333",
      lastName : "Robitashvili",
      score : 1000
    },
    {
      firstName : "Giorgi",
      id: 2,
      imageSource :    "assets/icons/meri.jpg",
      income : "3333",
      lastName : "Mirashvili",
      score : 1000
    },
    {
      firstName : "Irakli",
      id: 3,
      imageSource : "",
      income : "3333",
      lastName : "Kvaratskhelia",
      score : 1000
    }
  ];

  saveUser$ = new Subject<boolean>();
  persons$ = new BehaviorSubject<Person[]>(this.persons);
  nextId: number;
  openEdit$ = new BehaviorSubject<number>(0);

  addPerson(person: Person) {
    this.persons.push(person);
    localStorage.setItem('persons', JSON.stringify(this.persons));
    this.persons$.next(this.persons);
  }

  editPerson(editedPerson: Person) {
      this.persons = this.persons.map(person => {
        if (person.id === editedPerson.id) {
          return editedPerson;
        }
        return person;
      });
      localStorage.setItem('persons', JSON.stringify(this.persons));
      this.persons$.next(this.persons);
  }

  constructor() {
    if (localStorage.getItem('persons')) {
      this.persons = JSON.parse(localStorage.getItem('persons') || '[]');
    }
    localStorage.setItem('persons', JSON.stringify(this.persons));
    this.persons$.next(this.persons);
    this.nextId = this.persons.length + 1;
  }
}
