import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CaseService } from '../../services/case.service';
import { FeatureService } from '../../services/feature.service'
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-create-case-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create-case-dialog.component.html',
  styleUrls: ['./create-case-dialog.component.scss']
})
export class CreateCaseDialogComponent implements OnInit {
  @Input() id_product!: number;
  features: any[] = [];
  selectedFeatureId!: number;
  action = '';
  behavior = '';
  criticality = 'AVERAGE';
  functionType = 'READ';
  result = 'NOT_EXECUTED';
  code = '';

  @Input() caseToEdit?: any;

  constructor(
    private dialogRef: MatDialogRef<CreateCaseDialogComponent>,
    private caseService: CaseService,
    private featureService: FeatureService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data?: { id_product: number; id_feature?: number,
    }
  ) {}

  ngOnInit(): void {
    if (this.data?.id_product) {
      this.id_product = this.data.id_product;
      this.loadFeatures();
    }
    if (this.caseToEdit) {
      this.action = this.caseToEdit.action;
      this.behavior = this.caseToEdit.behavior;
      this.criticality = this.caseToEdit.criticality;
      this.functionType = this.caseToEdit.function;
      this.result = this.caseToEdit.result;
      this.selectedFeatureId = this.caseToEdit.id_feature;
      this.code = this.caseToEdit.code;
      if (this.id_product ) {
        this.loadFeatures(() => {
          this.selectedFeatureId = this.caseToEdit.id_feature;
        });
      }
    }
  }
  loadFeatures(callback?: () => void) {
  this.featureService.getFeatures(this.id_product).subscribe({
    next: (data) => {
      this.features = data;
      if (callback) callback();
    },
    error: () => alert('Erro ao carregar features')
  });
}

  createCase(): void {
    const caseData: any = {
      id_feature: this.selectedFeatureId,
      id_product: this.id_product,
      action: this.action,
      behavior: this.behavior,
      criticality: this.criticality,
      function: this.functionType,
      result: this.result,
      dataExec: null
        };
    if (this.caseToEdit) {
      caseData.code = this.caseToEdit.code;
    }
    const request$ = this.caseToEdit
      ? this.caseService.updateCase(this.caseToEdit.id_caseTest, caseData)
      : this.caseService.createCase(caseData);

    request$.subscribe({
      next: () => {
        this.notificationService.showSuccessMessage('Case salvo com sucesso!');
        this.dialogRef.close(true); 
      },
      error: (err) => this.notificationService.showErrorMessage('Erro ao salvar case: ' + err),
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
