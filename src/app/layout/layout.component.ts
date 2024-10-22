import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ProduitsComponent } from '../produits/produits.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AvatarModule,MenubarModule, ProduitsComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  items = [
    {
        label: 'Accueil',
        icon: 'pi pi-home',
        routerLink: ['']
      },
      {
        label: 'Produits',
        icon: 'pi pi-barcode',
        routerLink: ['products']
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-gauge'
    }
]
}
