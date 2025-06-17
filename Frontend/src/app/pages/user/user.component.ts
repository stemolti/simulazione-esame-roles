import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, filter, forkJoin, of, Subject, switchMap, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  currentUser: User | null = null;
  isLoading = true;
  showPastBookings = false;

  private destroyed$ = new Subject<void>();

  showCancelModal = false;
  selectedBookingIdForCancel: string | null = null;

  constructor(
    private authSrv: AuthService,

  ) { }

  ngOnInit(): void {
    this.authSrv.fetchUser();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
