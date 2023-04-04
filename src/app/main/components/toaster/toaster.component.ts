import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {switchMap, tap, timer} from "rxjs";
import {ToasterService} from "../../services/toastr.service";
import {ToasterInfo} from "../../entities/toasterInfo";

@Component({
  selector: 'twn-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToasterComponent implements OnInit {

  @Input() toasterInfo!: ToasterInfo;
  @Output() closeToaster = new EventEmitter<void>();
  isClosing = false;

  constructor(private toasterService: ToasterService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    timer(3500).pipe(
      tap(res => {
        this.isClosing = true;
        this.cdr.detectChanges();
      }),
      switchMap(() => timer(1000)),
      tap(() => this.closeToaster.emit())
    ).subscribe();
  }

  close() {
    this.isClosing = true;
    timer(500).pipe(
      tap(() => this.closeToaster.emit())
    ).subscribe();
  }
}
