import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Operation } from '../models/operation';
import { Product } from '../models/product';
import { FilterPipe } from '../pipes/filter.pipe';
import { OperationsService } from '../services/operations/operations.service';
import { ProduitsService } from '../services/produits/produits.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    JsonPipe,
    TableModule,
    CardModule,
    KnobModule,
    InputSwitchModule,
    TagModule,
    FormsModule,
    ButtonModule,
    InputNumberModule,
    TabMenuModule,
    FilterPipe,
    ToastModule,
    SelectButtonModule,
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
  providers: [MessageService],
})
export class ProduitsComponent implements OnInit {
  products: Product[] = [];
  types = [
    { label: 'Tout' },
    { label: 'Poissons', category: 0 },
    { label: 'Coquillages', category: 1 },
    { label: 'Crustacés', category: 2 },
  ];
  selectedType!: MenuItem;
  category?: number;
  productsToEdit: Product[] = [];
  stateOptions: any[] = [
    { label: 'Achat', value: 'purchase' },
    { label: 'Vente', value: 'sale' },
  ];

  constructor(
    private produitService: ProduitsService,
    private messageService: MessageService,
    private operationService: OperationsService
  ) {}

  ngOnInit(): void {
    this.produitService.getProducts().subscribe(
      (products: Product[]) =>
        (this.products = products.map((product: any) => {
          product.edit = false;
          return product;
        }))
    );
    this.selectedType = this.types[0];
  }

  get edition() {
    return this.products.find((product: any) => product.edit === true);
  }

  selectCategory(e: any) {
    this.category = e.category;
  }

  async editStock(i: number) {
    this.products[i] = <Product | any>(
      await this.produitService.updateProducts(this.productsToEdit[i])
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Opération réussie',
      detail: 'Le produit a bien été mis à jour.',
    });
    delete this.productsToEdit[i];
    this.products[i].edit = false;
  }

  bulkEdits(id: number, value: any, price?: boolean) {
    if (price) this.productsToEdit[id].price = value;
    else {
      if (this.productsToEdit[id].op === 'sale') value = -value;
      this.productsToEdit[id].stock = this.products[id].stock + value;
      this.productsToEdit[id].quantity = value;
    }
  }

  addProductToEdit(i: number, product: any) {
    // this.products.find((product) => product.id === i);
    this.productsToEdit[i] = { ...product };
    this.productsToEdit[i].op = 'sale';
  }

  async saveEdits() {
    this.productsToEdit.forEach(async element => {
      const operation: Operation = {
        product: element,
        price: element.price,
        quantity: element.quantity!
      };
      await this.operationService.createOperation(operation);
    });
    await this.produitService.updateProducts(
      this.productsToEdit.filter(Boolean)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Opération réussie',
      detail: 'Les produits ont bien été mis à jour.',
    });
    Object.keys(this.productsToEdit).forEach((i: any) => {
      this.products[i] = this.productsToEdit[i];
      this.products[i].edit = false;
    });
    this.productsToEdit = [];
  }

  cancelEdition(i: number) {
    this.products[i].edit = false;
    delete this.productsToEdit[i];
  }

  addDiscount(i: number) {
    const { price, sale_percentage } = this.productsToEdit[i];
    this.productsToEdit[i].discount = price - (price * sale_percentage) / 100;
  }
}
