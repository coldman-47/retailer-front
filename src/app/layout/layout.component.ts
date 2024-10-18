import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ProduitsComponent } from '../produits/produits.component';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [AvatarModule,MenubarModule, ProduitsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  items = [
    {
        label: 'Accueil',
        icon: 'pi pi-home'
    },
    {
        label: 'Produits',
        icon: 'pi pi-barcode'
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-gauge'
    }
]
}
