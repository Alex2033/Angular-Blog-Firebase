import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type AlertType = 'success' | 'warning' | 'danger';

interface Alert {
  type: string;
  text: string;
}

@Injectable()
export class AlertService {
  public alert$: Subject<Alert> = new Subject<Alert>();

  success(text: string): void {
    this.alert$.next({ type: 'success', text });
  }

  warning(text: string): void {
    this.alert$.next({ type: 'warning', text });
  }

  danger(text: string): void {
    this.alert$.next({ type: 'danger', text });
  }
}
