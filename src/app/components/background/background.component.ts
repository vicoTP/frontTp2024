import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BackgroundComponent {
  particles: number[] = Array.from({ length: 200 }, (_, i) => i + 1);
}
