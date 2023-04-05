import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {PersonsService} from "../../services/persons.service";
import {Observable, tap} from "rxjs";

@Component({
  selector: 'twn-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditComponent implements OnInit {

  isEditOpen$!: Observable<number>;

  constructor(private personsService: PersonsService) {
  }

  ngOnInit() {
    this.isEditOpen$ = this.personsService.openEdit$.asObservable();
  }

  onSave() {
    this.personsService.saveUser$.next(true);
  }

  closeEdit() {
    this.personsService.openEdit$.next(-1);
  }

}
