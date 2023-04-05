import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { PersonsService } from "../../services/persons.service";
import { combineLatest, map, Observable, startWith, tap } from "rxjs";
import { Person } from "../../entities/person";
import { FormControl } from "@angular/forms";
import { PersonCardComponent } from "../person-card/person-card.component";
import { ActivatedRoute } from "@angular/router";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'twn-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit, AfterViewInit {

  @ViewChildren(PersonCardComponent) cards!: QueryList<PersonCardComponent>;

  persons$!: Observable<Person[]>;
  showForm$!: Observable<boolean>;


  select = new FormControl('score');
  nameFilter = new FormControl('');

  constructor(private personsService: PersonsService,
              private route: ActivatedRoute) { }

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
    this.showForm$ = this.personsService.openEdit$.asObservable().pipe(
      untilDestroyed(this),
      map(res => res > -1)
    );
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.queryParams['id'];
    if (id) {
      this.cards.get(id - 1)?.card.nativeElement.scrollIntoView({behavior: 'smooth'})
    }
  }

}
