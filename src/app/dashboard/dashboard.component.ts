import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { OperationsService } from '../services/operations/operations.service';
import { Operation } from '../models/operation';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FilterPipe } from '../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    TableModule,
    SelectButtonModule,
    RippleModule,
    DropdownModule,
    TagModule,
    CurrencyPipe,
    DatePipe,
    FilterPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  operations: Operation[] = [];
  options = [
    { label: 'Annuel' },
    { label: 'Semestriel' },
    { label: 'Trimestriel' },
    { label: 'Mensuel' },
    { label: 'Hebdomadaire' },
    { label: 'Journalier' },
  ];
  categories = [
    { label: 'Poissons', category: 0 },
    { label: 'Coquillages', category: 1 },
    { label: 'Crustacés', category: 2 },
  ];
  categoryOption: any = undefined;

  constructor(private operationService: OperationsService) {}

  async ngOnInit() {
    this.operations = (<Operation[]>(
      await this.operationService.getOperations()
    )).map((op) => {
      op.category = (<Product>op.product).category;
      return op;
    });
  }

  chiffreDaffaire(operations: Operation[]) {
    let val = 0;
    operations.forEach((op) => (val += op.price * op.quantity));
    return val;
  }
}
