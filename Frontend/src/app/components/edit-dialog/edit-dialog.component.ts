import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriaPermesso, RichiestaPermesso } from '../../interfaces/request';
import { RichiesteService } from '../../services/richieste.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-edit-dialog',
  standalone: false,
  templateUrl: './edit-dialog.component.html',
  styleUrl: './edit-dialog.component.scss',
})
export class EditDialogComponent implements OnInit {
  form!: FormGroup;
  categorie: CategoriaPermesso[] = [];
  loadingCategories = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { richiesta: RichiestaPermesso },
    private service: RichiesteService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.service.getAllCategories().subscribe({
      next: (cats) => {
        this.categorie = cats;
        this.loadingCategories = false;
        this.initForm();
      },
      error: (err) => {
        console.error('Errore caricamento categorie', err);
        this.loadingCategories = false;
        this.initForm();
      },
    });
  }

  private initForm(): void {
    const r = this.data.richiesta;
    this.form = this.fb.group({
      categoriaId: [
        typeof r.categoriaId === 'string'
          ? r.categoriaId
          : (r.categoriaId as any)._id,
        Validators.required,
      ],
      dataInizio: [new Date(r.dataInizio), Validators.required],
      dataFine: [new Date(r.dataFine), Validators.required],
      motivazione: [
        r.motivazione,
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const updated: Partial<RichiestaPermesso> = {
      _id: this.data.richiesta._id,
      categoriaId: this.form.value.categoriaId,
      dataInizio: this.form.value.dataInizio,
      dataFine: this.form.value.dataFine,
      motivazione: this.form.value.motivazione,
    };

    this.dialogRef.close(updated);
    this.notify.successMessage('Richiesta aggiornata con successo');
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
