import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
  // styleUrls: ['./app.component.less']
})
export class AppComponent {
  target1 = 'id_1';
  target2 = 'id_2';
  target3 = 'id_3';
  target4 = 'id_4';
  idForPopOver: string | null = null;

  show(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const popover = target.nextElementSibling as HTMLElement;
    popover.hidden = false;
  }

  popOverShown(target: string): boolean {
    return this.idForPopOver === target;
  }
}
