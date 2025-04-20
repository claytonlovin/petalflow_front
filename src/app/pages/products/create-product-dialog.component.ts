import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotificationService } from '../../services/notification.service';

import { MatDialogModule } from '@angular/material/dialog'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent {
  name = '';
  baseUrlLocal = '';
  baseUrlProd = '';
  repository = '';

  constructor(
    private dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private productService: ProductService,
    private snackBar: MatSnackBar ,
    private notificationService: NotificationService
  ) {}

  createProduct() {
    if (!this.name.trim()) {
      this.notificationService.showErrorMessage('Nome do produto é obrigatório.');
      return;
    }

    const productData = {
      name: this.name,
      baseUrlLocal: this.baseUrlLocal || '',
      baseUrlProd: this.baseUrlProd || '',
      repository: this.repository || ''
    };

    this.productService.createProduct(productData).subscribe({
      next: () => {
       this.notificationService.showSuccessMessage('Produto criado com sucesso!');
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.notificationService.showErrorMessage('Erro ao criar produto.');
        console.error('Erro ao criar produto:', err);
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }


}
