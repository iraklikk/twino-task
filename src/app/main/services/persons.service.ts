import { Injectable } from '@angular/core';
import { Person } from "../entities/person";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  persons: Person[] = [];

  saveUser$ = new Subject<boolean>();
  persons$ = new BehaviorSubject<Person[]>(this.persons);
  nextId = this.persons.length + 1;
  openEdit$ = new BehaviorSubject<number>(0);

  addPerson(person: Person) {
    this.persons.push(person);
    localStorage.setItem('persons', JSON.stringify(this.persons));
    this.persons$.next(this.persons);
  }

  editPerson(editedPerson: Person) {
      this.persons = this.persons.map(person => {
        if (person.id === editedPerson.id) {
          console.log(editedPerson);
          return editedPerson;
        }
        return person;
      });
      localStorage.setItem('persons', JSON.stringify(this.persons));
      this.persons$.next(this.persons);
  }

  constructor() {
    this.persons = JSON.parse(localStorage.getItem('persons') || '[]');
    this.persons$.next(this.persons);
    console.log(JSON.parse(localStorage.getItem('persons') || '[]'));
    // firstName
    //   :
    //   "a"
    // id
    //   :
    //   1
    // imageSource
    //   :
    //   "assets/icons/meri.jpg"
    // income
    //   :
    //   "3333"
    // lastName
    //   :
    //   "Robitashvili"
    // score
    //   :
    //   1000
  }
}
