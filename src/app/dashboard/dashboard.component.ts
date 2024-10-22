import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as _ from 'lodash';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Operation } from '../models/operation';
import { Product } from '../models/product';
import { FilterPipe } from '../pipes/filter.pipe';
import { OperationsService } from '../services/operations/operations.service';

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
    ChartModule,
    JsonPipe,
    DividerModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  operations: Operation[] = [];
  options = [
    { label: 'Mensuel' },
    { label: 'Semestriel' },
    { label: 'Trimestriel' },
    { label: 'Hebdomadaire' },
    { label: 'Journalier' },
  ];
  categories = [
    { label: 'Poissons', category: 0 },
    { label: 'Coquillages', category: 1 },
    { label: 'Crustacés', category: 2 },
  ];
  categoryOption: any = undefined;
  chartData: any;
  basicOptions: any;
  operationsGroupedByYear!: any;
  year = new Date().getFullYear();
  years: any[] = [];
  chartDataByYear: any;

  constructor(private operationService: OperationsService) {}

  async ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    const pipe = new FilterPipe();
    this.operations = (<Operation[]>(
      await this.operationService.getOperations()
    )).map((op) => {
      op.category = (<Product>op.product).category;
      return op;
    });
    this.operationsGroupedByYear = _.groupBy(this.operations, (item) =>
      new Date(<any>item.created_at).getFullYear()
    );
    this.years = Object.keys(this.operationsGroupedByYear).map((year: any) => {
      return { label: year, value: year };
    });
    const data = {
      labels: this.categories.map((cat) => cat.label),
      datasets: [
        {
          label: 'Ventes',
          data: this.categories.map((cat) =>
            this.chiffreDaffaire(pipe.transform(this.operations, cat.category))
          ),
          backgroundColor: ['#90caf9', '#ce93d8', '#c5e1a5'],
          borderWidth: 1,
        },
      ],
    };
    this.chartData = data;
    this.getChartDataByYear()
  }

  getChartDataByYear() {
    const data:any = _.groupBy(
      this.operationsGroupedByYear[this.year],
      (item) => new Date(item.created_at).getMonth()
    );
    for (let i = 0; i < 12; i++) {
      if (!data[i]) {
        data[i] = [];
      }
    }
    console.log(data);
    
    this.chartDataByYear = {
      labels: [
        'Janvier',
        'Févier',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ],
      datasets: [
        {
          label: 'Ventes',
          data: Object.values(data).map((data:any) => this.chiffreDaffaire(data)),
          // backgroundColor: ['#90caf9', '#ce93d8', '#c5e1a5'],
          borderWidth: 1,
        },
      ],
    };
    console.log(this.chartDataByYear);
  }

  chiffreDaffaire(operations: Operation[]) {
    let val = 0;
    operations.forEach((op) => {
      if (op.quantity < 0) val += op.price * this.abs(op.quantity);
    });
    return val;
  }

  abs(quantity: number) {
    return Math.abs(quantity);
  }

  groupByYear(data: Operation[]) {
    const groupedData: any = {};
    data.sort(
      (a: any, b: any) => Date.parse(a.created_at) - Date.parse(b.created_at)
    );

    data.forEach((item: Operation) => {
      const year = new Date(<any>item.created_at).getFullYear();
      if (!groupedData[year]) {
        groupedData[year] = [];
      }
      groupedData[year].push(item);
    });
    return groupedData;
  }
}
