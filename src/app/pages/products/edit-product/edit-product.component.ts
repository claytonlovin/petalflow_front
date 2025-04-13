import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FeatureListComponent } from '../../features/feature-list/feature-list.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../../services/notification.service';
import { MatIcon } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    FeatureListComponent
  ]
})
export class EditProductComponent implements OnInit {
  form!: FormGroup;
  id_product!: number;
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id_product = Number(this.route.snapshot.paramMap.get('id_product'));

    this.form = this.fb.group({
      name: ['', Validators.required],
      baseUrlLocal: [''],
      baseUrlProd: [''],
      repository: ['']
    });

    this.loadProduct();
  }

  loadProduct() {
    this.productService.getProductById(this.id_product).subscribe({
      next: (product) => {
        console.log('Produto carregado:', product);
        this.form.patchValue(product);
      },
      error: () => alert('Erro ao carregar produto.')
    });
  }


  save() {
    if (this.form.valid) {
      this.productService.updateProduct(this.id_product, this.form.value).subscribe({

        next: () => this.notificationService.showSuccessMessage('Produto atualizado com sucesso!'),
        error: () => this.notificationService.showErrorMessage('Erro ao atualizar produto.')

      });
    }
  }
}
