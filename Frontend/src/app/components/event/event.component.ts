import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event',
  standalone: false,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input() event!: Event;
}
