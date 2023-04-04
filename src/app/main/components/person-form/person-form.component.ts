import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'twn-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent {

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    income: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {
  }
}
