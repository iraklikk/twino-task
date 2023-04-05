import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { PersonsService } from "../../services/persons.service";
import { tap } from "rxjs";
import { Person } from "../../entities/person";
import { ToasterService } from "../../services/toastr.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'twn-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonFormComponent implements OnInit {

  isValid = true;
  isEditOpen = false;
  selectedId!: number;

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
    this.personsService.openEdit$.asObservable().pipe(
      untilDestroyed(this),
      tap(res => {
          const selectedPerson = this.personsService.persons.find(person => person.id === res);
          if (selectedPerson) {
            this.isEditOpen = true;
            this.selectedId = selectedPerson.id;
            this.form.setValue({
              firstName: selectedPerson.firstName,
              lastName: selectedPerson.lastName,
              income: selectedPerson.income,
              imageSource: selectedPerson.imageSource
            })
            this.toasterService.toasterDetails$.next({
              isOpen: true,
              message: `Editing ${selectedPerson.firstName} ${selectedPerson.lastName}`,
              status : 'warning'
            })
          } else if (res === -1) {
            this.isEditOpen = false;
            this.toasterService.toasterDetails$.next({
              isOpen: true,
              message: `Editing Canceled`,
              status : 'warning'
            })
            this.form.setValue({
              firstName: '',
              lastName: '',
              income: '',
              imageSource: ''
            })
          }
      })
    ).subscribe();
    this.personsService.saveUser$.pipe(
      untilDestroyed(this),
      tap(res => {
        if (this.form.valid) {
          if (this.isEditOpen) {
            const person = this.generatePersonObject();
            person.id = this.selectedId;
            this.personsService.editPerson(person);
          } else {
            this.addPerson();
            this.isValid = true;
            this.toasterService.toasterDetails$.next({
              isOpen: true,
              message: 'User Added Successfully',
              status: 'success'
            });
          }
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
            status: 'danger'
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
    const person = this.generatePersonObject();
    person.id = this.personsService.nextId;
    this.personsService.addPerson(person);
    this.personsService.nextId++;
  }

  generatePersonObject(): Person {
    const person: Person = {
      firstName: this.form.get('firstName')?.value || '',
      lastName: this.form.get('lastName')?.value || '',
      income: this.form.get('income')?.value  || '',
      imageSource: this.form.get('imageSource')?.value || '',
      score: 0,
      id: 0
    };
    person.score = this.calculateScore(person.firstName, person.income);
    return person;
  }

  calculateScore(firstname: string, score: string) {
    const letterValues = firstname.split('').reduce((acc, letter) => {
      return acc + letter.toLowerCase().charCodeAt(0) - 96;
    }, 0);

    return letterValues + +score;
  }
}
