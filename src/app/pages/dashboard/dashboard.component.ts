import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateProductDialogComponent } from '../products/create-product-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  darkMode = false;
  products: any[] = [];
  displayedColumns: string[] = ['id', 'name'];

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private dialog: MatDialog,
    public router: Router
  ) {}

  statusMap: { [key: number]: string } = {};
  
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
  
        this.products.forEach(product => {
          this.productService.getProductStatus(product.id).subscribe({
            next: (statusData) => {
              this.statusMap[product.id] = statusData.overall_status;
            },
            error: () => {
              this.statusMap[product.id] = 'UNKNOWN'; 
            }
          });
        });
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }
  

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateProductDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme', this.darkMode);
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => {
          console.error('Erro ao excluir produto:', err);
        }
      });
    }
  }

  editProduct(id: number) {
    console.log('Editar produto:', id);
    // Aqui você pode redirecionar para a página de edição
  }
  
  viewProduct(id: number) {
    // Aqui você pode abrir um modal ou uma página de detalhes
    
  }
  goToCases(productId: number) {
    this.router.navigate(['/cases', productId]);
  }
  
  executeProduct(id: number) {
    console.log('Executar produto:', id);
    // Aqui você pode iniciar um processo ou executar uma ação específica
  }
  
}
