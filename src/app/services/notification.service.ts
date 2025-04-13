import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private config: MatSnackBarConfig = {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
    };

    constructor(private snackBar: MatSnackBar) {}

    showErrorMessage(message: string): void {
        this.snackBar.open(`❌ ${message}`, 'Fechar', {
            ...this.config,
            panelClass: ['error-snackbar']
        });
    }

    showSuccessMessage(message: string): void {
        this.snackBar.open(`✅ ${message}`, 'Fechar', {
            ...this.config,
            panelClass: ['success-snackbar']
        });
    }
}
