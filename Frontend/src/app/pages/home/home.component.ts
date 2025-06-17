import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RichiestaPermesso, StatoRichiesta } from '../../interfaces/request';
import { RichiesteService } from '../../services/richieste.service';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from '../../components/add-dialog/add-dialog.component';
import { AuthService } from '../../services/auth.service';
import { switchMap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  richieste: RichiestaPermesso[] = [];
  loading = true;
  userRole: 'dipendente' | 'responsabile' | null = null;

  constructor(
    private richiesteService: RichiesteService,
    private dialog: MatDialog,
    private authService: AuthService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(
        switchMap((user) => {
          this.userRole =
            user?.role === 'dipendente' || user?.role === 'responsabile'
              ? user.role
              : null;

          if (this.userRole === 'responsabile') {
            return this.richiesteService.getDaApprovare();
          } else {
            return this.richiesteService.getAll();
          }
        })
      )
      .subscribe({
        next: (data) => {
          this.richieste = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Errore caricamento richieste:', err);
          this.loading = false;
        },
      });
  }

  getStatoColor(stato: StatoRichiesta): string {
    switch (stato) {
      case 'Approvato':
        return '#4caf50';
      case 'Rifiutato':
        return '#f44336';
      case 'In attesa':
        return '#ff9800';
      default:
        return '#757575';
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }

  onAdd(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.richiesteService.create(result).subscribe({
          next: (newReq) => {
            this.richieste.unshift(newReq);
            window.location.reload();
          },
          error: (err) => console.error('Errore creazione richiesta:', err),
        });
      }
    });
  }

  onEdit(richiesta: RichiestaPermesso): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { richiesta },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.richiesteService.update(richiesta._id!, result).subscribe({
          next: (updated) => {
            const idx = this.richieste.findIndex((r) => r._id === updated._id);
            if (idx > -1) this.richieste[idx] = updated;
            window.location.reload();
          },
          error: (err) => console.error('Errore update:', err),
        });
      }
    });
  }

  onDelete(richiesta: RichiestaPermesso): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        message: `Confermi di eliminare la richiesta per "${
          (richiesta.categoriaId as any).descrizione
        }"?`,
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.richiesteService.remove(richiesta._id!).subscribe({
          next: () => {
            this.richieste = this.richieste.filter(
              (r) => r._id !== richiesta._id
            );
            this.notify.successMessage('Richiesta eliminata con successo');
          },
          error: (err) => console.error('Errore delete:', err),
        });
      }
    });
  }

  onApprove(richiesta: RichiestaPermesso): void {
    this.richiesteService.approva(richiesta._id!).subscribe({
      next: (updated) => {
        this.richieste = this.richieste.filter((r) => r._id !== updated._id);
      },
      error: (err) => console.error('Errore approvazione:', err),
    });
  }

  onReject(richiesta: RichiestaPermesso): void {
    this.richiesteService.rifiuta(richiesta._id!).subscribe({
      next: (updated) => {
        this.richieste = this.richieste.filter((r) => r._id !== updated._id);
      },
      error: (err) => console.error('Errore rifiuto:', err),
    });
  }
}
