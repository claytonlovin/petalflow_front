import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'; // ✅ IMPORTANDO AQUI
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
    private snackBar: MatSnackBar 
  ) {}

  createProduct() {
    if (!this.name.trim()) {
      this.showNotification('O nome do produto é obrigatório!', 'error');
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
        this.showNotification('Produto criado com sucesso!', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erro ao criar produto:', err);
        this.showNotification('Erro ao criar produto!', 'error');
      }
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar'
    });
  }
}
