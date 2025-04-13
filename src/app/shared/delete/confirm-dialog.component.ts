import { Component, Inject } from '@angular/core';

import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle
} from '@angular/material/dialog';

export interface ConfirmDialogData {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

@Component({
    selector: 'app-confirm-dialog',
    template: `
        <h2 mat-dialog-title>{{ data.title }}</h2>
        <mat-dialog-content>{{ data.message }}</mat-dialog-content>
        <mat-dialog-actions align="end">
            <button class="case-button-cancel" (click)="onCancel()">{{ data.cancelText || 'Cancelar' }}</button>
            <button class="case-button-delete" (click)="onConfirm()">{{ data.confirmText || 'Deletar' }}</button>
        </mat-dialog-actions>
    `,
    imports: [
        MatDialogActions,
        MatDialogContent,
        MatDialogTitle,

    ]
})
export class ConfirmDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
    ) {}

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onCancel(): void {
        this.dialogRef.close(false);
    }
}
