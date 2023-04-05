import { Injectable } from '@angular/core';
import { Person } from "../entities/person";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonsService {

  persons: Person[] = [
  ];

  saveUser$ = new Subject<boolean>();
  persons$ = new BehaviorSubject<Person[]>(this.persons);
  nextId: number;
  openEdit$ = new BehaviorSubject<number>(-1);

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
