import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToastModule } from 'primeng/toast';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LayoutComponent,
    ScrollTopModule,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    CardModule,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  title = 'revendeur-back-office';
  visible = false;
  credentials: any = {};
  modal = false;
  register = false;

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (document) {
      this.modal = true;
    }
    this.visible = this.authService.token.value ? false : true;
    this.authService.token.subscribe({
      next: (val) => {
        this.visible = val ? false : true;
        this.messageService.add({
          severity: 'success',
          summary: 'Connexion réussie',
          detail: 'Vous êtes connecté en tant qu\'administrateur.',
        });
      },
    });
  }
  
  async login() {
    this.authService.connexionFailed.next(() =>
      this.messageService.add({
        severity: 'error',
        summary: 'Echec de la connexion',
        detail: 'Merci de bien vérifier les informations saisies.',
      })
    );
    console.log(await this.authService.login(this.credentials));
  }
}
