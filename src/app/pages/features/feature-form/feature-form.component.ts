import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FeatureService } from '../../../services/feature.service';
import { NotificationService } from '../../../services/notification.service';

export interface FeatureFormData {
    id_product: number;
    feature?: any;
}

@Component({
    selector: 'app-feature-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule
    ],
    templateUrl: './feature-form.component.html',
    styleUrls: ['./feature-form.component.scss']
})
export class FeatureFormComponent implements OnInit {
    form!: FormGroup;
    isEditing = false;
    constructor(
        private fb: FormBuilder,
        private featureService: FeatureService,
        public dialogRef: MatDialogRef<FeatureFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: FeatureFormData,
        private notificationService: NotificationService
    ) {}
    ngOnInit(): void {
        this.form = this.fb.group({
            id_product: [this.data.id_product, Validators.required],
            name_feature: ['', Validators.required]
        });

        if (this.data.feature) {
            this.isEditing = true;
            this.form.patchValue(this.data.feature);
        }
    }
    onSubmit(): void {
        if (this.form.valid) {
            if (this.isEditing) {
                this.featureService.updateFeature(this.data.feature.id_feature, this.form.value).subscribe({
                    next: () => {
                        this.dialogRef.close(true)
                        this.notificationService.showSuccessMessage('Success Update feature')
                    }
                });
            } else {
                this.featureService.createFeature(this.form.value).subscribe({
                    next: () => {
                        this.dialogRef.close(true)
                        this.notificationService.showSuccessMessage('Success Create feature')
                    }
                });
            }
        }
    }
    onCancel(): void {
        this.dialogRef.close(false);
    }
}
