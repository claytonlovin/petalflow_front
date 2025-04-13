import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './create-product-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './products.component.html',
 
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'actions'];

  constructor(private productService: ProductService, public dialog: MatDialog, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        console.log('Produtos carregados:', data);
        this.products = data;
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent , {
      panelClass: 'custom-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  };

  goToCases(productId: number) {
    this.router.navigate(['/cases', productId]);
  }
}
