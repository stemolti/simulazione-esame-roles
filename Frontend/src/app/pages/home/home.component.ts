import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEvents()
      .subscribe({
        next: evs => {
          this.events = evs;
          this.isLoading = false;
        },
        error: err => {
          console.error(err);
          this.isLoading = false;
        }
      });
  }
}
