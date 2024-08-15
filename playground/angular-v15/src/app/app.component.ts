import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-v15';

  private _checked = false;

  @Input()
  set checked(value: boolean) {
    console.log(value);
    this._checked = value;
  }
  get checked(): boolean {
    return this._checked;
  }

  onChecked(event: any) {
    event.preventDefault();
    this.checked = event.detail;
  }
}
