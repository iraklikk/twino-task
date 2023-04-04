import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {PersonsService} from "../../services/persons.service";
import {tap} from "rxjs";
import {Person} from "../../entities/person";
import {ToasterService} from "../../services/toastr.service";

@Component({
  selector: 'twn-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFormComponent implements OnInit {

  isValid = true;


  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    income: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.min(1)]],
    imageSource: ['']
  });

  constructor(private fb: FormBuilder,
              private personsService: PersonsService,
              private cdr: ChangeDetectorRef,
              private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.personsService.saveUser$.pipe(
      tap(res => {
        if (this.form.valid) {
          this.addPerson();
          this.isValid = true;
          this.toasterService.toasterDetails$.next({
            isOpen: true,
            message: 'User Added Successfully',
            status: 'success'
          });
          this.form.setValue({
            firstName: '',
            lastName: '',
            income: '',
            imageSource: ''
          })
        } else {
          const message = this.setToasterMessage();
          this.toasterService.toasterDetails$.next({
            isOpen: true,
            message,
            status: 'warning'
          })
          this.isValid = false;
        }
        this.cdr.detectChanges();
      })
    ).subscribe();
  }

  setToasterMessage() {
    if (this.firstName.invalid) {
      return this.firstName.value === '' ? 'Please enter first name' : 'First name must only contain latin letters';
    } else if (this.lastName.invalid) {
      return this.lastName.value === '' ? 'Please enter last name' : 'Last name must only contain latin letters';
    } else {
      return this.income.value === '' ? 'Please enter income': this.income.value === 0 ? 'Income must be more than 0' :
        'Income must contain only numbers';
    }
  }

  get firstName(): FormControl {
    return this.form.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get('lastName') as FormControl;
  }

  get income(): FormControl {
    return this.form.get('income') as FormControl;
  }

  onFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.form.get('imageSource')?.setValue(reader.result as string);
      }

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  }

  addPerson() {
    const person: Person = {
      firstName: this.form.get('firstName')?.value || '',
      lastName: this.form.get('lastName')?.value || '',
      income: this.form.get('income')?.value  || '',
      imageSource: this.form.get('imageSource')?.value || 'assets/icons/person_default.png',
      id: this.personsService.nextId,
      score: 0
    };
    person.score = this.calculateScore(person.firstName, person.income);
    this.personsService.addPerson(person);
    this.personsService.nextId++;
  }

  calculateScore(firstname: string, score: string) {
    const letterValues = firstname.split('').reduce((acc, letter) => {
      return acc + letter.toLowerCase().charCodeAt(0) - 96;
    }, 0);

    return letterValues + +score;
  }
}
