import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
import { LayoutComponent } from './layout/layout.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, ScrollTopModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'revendeur-back-office';
}
