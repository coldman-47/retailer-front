import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KnobModule } from 'primeng/knob';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProduitsService } from '../services/produits/produits.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { FilterPipe } from '../pipes/filter.pipe';
import { ToastModule } from 'primeng/toast';

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
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.scss',
  providers: [MessageService],
})
export class ProduitsComponent implements OnInit {
  products: any[] = [];
  types = [
    { label: 'Tout' },
    { label: 'Poissons', category: 0 },
    { label: 'Coquillages', category: 1 },
    { label: 'Crustacés', category: 2 },
  ];
  selectedType!: MenuItem;
  category?: number;
  productsToEdit: any = [];

  constructor(
    private produitService: ProduitsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.produitService.getProducts().subscribe(
      (products: any) =>
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

  async editStock(id: number, stock: number) {
    this.productsToEdit[id].stock = this.products[id].stock + stock;
    this.products[id] = await this.produitService.updateProducts(
      this.productsToEdit[id]
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Opération réussie',
      detail: 'Le produit a bien été mis à jour.',
    });
    delete this.productsToEdit[id];
    this.products[id].edit = false;
  }

  bulkEdits(id: number, stock: any) {
    this.productsToEdit[id].stock = this.products[id].stock + stock;
  }

  addProductToEdit(i: number, product: any) {
    this.productsToEdit[i] = { ...product };
  }

  async saveEdits() {
    await this.produitService.updateProducts(this.productsToEdit.filter(Boolean));
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
