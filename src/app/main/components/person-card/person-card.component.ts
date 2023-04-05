import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Person } from "../../entities/person";
import { PersonsService } from "../../services/persons.service";

@Component({
  selector: 'twn-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent implements AfterViewInit{

  @ViewChild('card') card!: ElementRef;

  constructor(private personsService: PersonsService) {
  }
  @Input() person!: Person;

  ngAfterViewInit() {
  }

  editPerson() {
    this.personsService.openEdit$.next(this.person.id);
  }
}
