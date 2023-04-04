import { Component, Input } from '@angular/core';
import { Person } from "../../entities/person";

@Component({
  selector: 'twn-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {
  @Input() person!: Person;
}
