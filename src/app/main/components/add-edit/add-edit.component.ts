import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Person} from "../../entities/person";
import {PersonsService} from "../../services/persons.service";

@Component({
  selector: 'twn-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {

  constructor(private personsService: PersonsService) {
  }

  onSave() {
    this.personsService.saveUser$.next(true);
  }

}
