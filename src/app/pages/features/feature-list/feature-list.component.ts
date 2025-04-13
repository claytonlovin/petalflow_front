import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureService } from '../../../services/feature.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/delete/confirm-dialog.component';
import { NotificationService } from '../../../services/notification.service';
import { FeatureFormComponent, FeatureFormData } from '../feature-form/feature-form.component';

@Component({
    standalone: true,
    selector: 'app-feature-list',
    templateUrl: './feature-list.component.html',
    styleUrls: ['./feature-list.component.scss'],
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatDialogModule
    ]
})
export class FeatureListComponent implements OnInit, AfterViewInit {
    @Input() productId!: number;
    displayedColumns: string[] = ['name_feature', 'actions'];
    dataSource = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private featureService: FeatureService,
        private dialog: MatDialog,
        private notificationService: NotificationService
    ) {}

    ngOnInit(): void {
        if (this.productId) {
            this.loadFeatures();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    loadFeatures() {
        this.featureService.getFeatures(this.productId).subscribe({
            next: (data) => {
                console.log("Features carregadas:", data);
                this.dataSource.data = data;
            },
            error: () => alert('Erro ao carregar features')
        });
    }
    openCreateFeatureDialog(): void {
        const dialogRef = this.dialog.open<FeatureFormComponent, FeatureFormData, boolean>(FeatureFormComponent, {
            width: '400px',
            data: { id_product: this.productId }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadFeatures();
            }
        });
    }

    openEditFeatureDialog(feature: any): void {
        const dialogRef = this.dialog.open<FeatureFormComponent, FeatureFormData, boolean>(FeatureFormComponent, {
            width: '400px',
            data: {id_product: feature.id_product, feature: feature}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loadFeatures();
            }
        });
    }
    deleteFeature(id: number) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '350px',
            data: {
                title: 'Confirmar Exclusão',
                message: 'Tem certeza que deseja excluir esta feature?',
                confirmText: 'Deletar',
                cancelText: 'Cancelar'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.featureService.deleteFeature(id).subscribe({
                    next: () => {
                        this.dataSource.data = this.dataSource.data.filter(feature => feature.id_feature !== id);
                        this.notificationService.showSuccessMessage('Resource deleted successfully!');
                    },
                    error: () => { this.notificationService.showErrorMessage('Error deleting Features'); }
                });
            }
        });
    }
}
