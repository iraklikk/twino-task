import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PersonsService} from "../../services/persons.service";
import {BehaviorSubject, combineLatest, map, Observable, of, startWith, tap} from "rxjs";
import {Person} from "../../entities/person";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'twn-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  persons$!: Observable<Person[]>;

  sortOption$ = new BehaviorSubject<'score' | 'firstName' | 'lastName' | 'income'>('score');

  select = new FormControl('score');
  nameFilter = new FormControl('');

  constructor(private personsService: PersonsService) { }

  ngOnInit() {
    this.persons$ = combineLatest([
      this.personsService.persons$,
      this.select.valueChanges.pipe(
        startWith('score')
      ),
      this.nameFilter.valueChanges.pipe(
        startWith('')
      )
    ]).pipe(
      map(([persons, sortType, fullName]) => {
        if (sortType === 'score' || sortType === 'income') {
          persons = persons.sort((a,b) => +a[sortType] - +b[sortType]);
        } else if (sortType === 'firstName' || sortType === 'lastName') {
          persons = persons.sort((a,b) => a[sortType].toLowerCase().localeCompare(b[sortType].toLowerCase()))
        }
        return persons.filter(person => {
          return `${person.firstName.toLowerCase()} ${person.lastName.toLowerCase()}`.startsWith(fullName || '')
        });
      }),
    )
  }

}
