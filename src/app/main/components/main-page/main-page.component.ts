import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PersonsService} from "../../services/persons.service";
import {Observable, tap} from "rxjs";
import {Person} from "../../entities/person";

@Component({
  selector: 'twn-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {

  persons$!: Observable<Person[]>;
  constructor(private personsService: PersonsService) { }

  ngOnInit() {
    this.persons$ = this.personsService.persons$.pipe(
      tap(res => console.log(res))
    );
  }

}
