import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ToasterService} from "./main/services/toastr.service";
import {map, Observable, tap} from "rxjs";
import {ToasterInfo} from "./main/entities/toasterInfo";

@Component({
  selector: 'twn-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  toasterInfo!: ToasterInfo;

  constructor(private toasterService: ToasterService) {
  }

  ngOnInit() {
    this.toasterService.toasterDetails$.pipe(
      tap(res => {
        this.toasterInfo = res
      })
    ).subscribe();
  }
}
