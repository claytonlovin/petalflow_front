import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from '../../services/case.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GherkinPipe } from '../../pipes/gherkin.pipe';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CreateCaseDialogComponent } from './create-case-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-cases',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatDatepickerModule,
    MatAccordion,
    MatExpansionModule,
    MatFormFieldModule,
    GherkinPipe,
    MatTooltipModule,
    MatDialogModule,
    MatPaginator

  ],
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  id_product!: number;
  cases: any[] = [];
  pagedCases: any[] = [];
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private caseService: CaseService,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id_product = Number(this.route.snapshot.paramMap.get('id_product'));
    this.loadCases();
  }

  ngAfterViewInit() {
    if (this.cases.length > 0) {
      setTimeout(() => {
        this.paginator.pageIndex = 0;
        this.updatePagedCases();
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  loadCases(): void {
    this.caseService.getCasesByProduct(this.id_product).subscribe({
      next: (data) => {
        this.cases = data;
        console.log(data);
        this.pageIndex = 0;
        this.updatePagedCases();
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar os cases:', err);
      }
    });
    this.updatePagedCases();

  }

  openCreateCaseDialog(): void {
    const dialogRef = this.dialog.open(CreateCaseDialogComponent, {
      width: '500px',
      data: {
        id_product: this.id_product,
        id_feature: this.cases[0]?.id_feature || 1
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCases();
      }
    });
  }

  editCase(caseItem: any) {
    const dialogRef = this.dialog.open(CreateCaseDialogComponent, {
      width: '800px',
      data: {
        id_product: this.id_product,
        id_feature: caseItem.id_feature,
      }
    });

    const instance = dialogRef.componentInstance;
    instance.caseToEdit = caseItem;

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCases();
    });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedCases();
  }

  updatePagedCases() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedCases = this.cases.slice(startIndex, endIndex);
  }

  runTestCase(caseItem: any) {
    this.caseService.executTestCase(caseItem.id_caseteste, caseItem.id_feature, this.id_product).subscribe({
      next: (updatedCase) => {
        console.log('Teste executado com sucesso', updatedCase);
        
        const index = this.cases.findIndex(c => c.id_caseteste === caseItem.id_caseteste);
        if (index !== -1) {
          this.cases[index] = { ...this.cases[index], ...updatedCase };
          this.updatePagedCases();
        }
      },
      error: (err) => {
        console.error('Erro ao executar o teste:', err);
      }
    });
  }
  positionOptions: TooltipPosition[] = ['above'];
  position = new FormControl(this.positionOptions[0]);
}

