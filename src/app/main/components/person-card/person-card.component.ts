import { Component, Input } from '@angular/core';
import { Person } from "../../entities/person";
import {PersonsService} from "../../services/persons.service";

@Component({
  selector: 'twn-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {

  constructor(private personsService: PersonsService) {
  }
  @Input() person!: Person;

  editPerson() {
    this.personsService.openEdit$.next(this.person.id);
  }
}
