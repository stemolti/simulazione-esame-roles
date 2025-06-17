import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaPermesso, RichiestaPermesso } from '../../interfaces/request';
import { RichiesteService } from '../../services/richieste.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss'],
  standalone: false,
})
export class AddDialogComponent implements OnInit {
  form!: FormGroup;
  categorie: CategoriaPermesso[] = [];
  loadingCategories = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDialogComponent>,
    private service: RichiesteService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      categoriaId: [null, Validators.required],
      dataInizio: [null, Validators.required],
      dataFine: [null, Validators.required],
      motivazione: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.service.getAllCategories().subscribe({
      next: (cats) => {
        this.categorie = cats;
        this.loadingCategories = false;
      },
      error: (err) => {
        console.error('Errore caricamento categorie', err);
        this.loadingCategories = false;
      },
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nuovo: Partial<RichiestaPermesso> = {
      categoriaId: this.form.value.categoriaId,
      dataInizio: this.form.value.dataInizio,
      dataFine: this.form.value.dataFine,
      motivazione: this.form.value.motivazione,
    };

    this.dialogRef.close(nuovo);
    this.notify.successMessage('Richiesta aggiunta con successo');
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
