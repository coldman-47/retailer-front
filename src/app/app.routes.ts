import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProduitsComponent } from './produits/produits.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'products', component: ProduitsComponent },
];
