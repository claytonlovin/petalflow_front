import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

// service
import { TokenService } from '../../services/token.service';

import 'codemirror/mode/javascript/javascript'; 
import 'codemirror/theme/material.css'; 

@Component({
  selector: 'app-settings',
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    CodemirrorModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(private tokenService: TokenService, private notificationService: NotificationService) { }

  generatedToken: string | null = null;
  tokenCreatedAt: string | null = null;
  isButtonDisabled = false;
  

  ngOnInit(): void {
    const id_user = Number(localStorage.getItem('id_user'));
    if (!id_user) return;
  
    this.tokenService.checkTokenStatus(id_user).subscribe({
      next: (res) => {
        if (res.status) {
          this.generatedToken = 'Token já gerado'; 
          this.tokenCreatedAt = res.date_created ?? null;
          this.isButtonDisabled = true;
        } else {
          this.generatedToken = null;
          this.tokenCreatedAt = null;
          this.isButtonDisabled = false;
        }
      },
      error: (err) => {
        console.error('Erro ao verificar status do token:', err);
      }
    });
  }
  
  
  
  generateToken() {
    const id_user = Number(localStorage.getItem('id_user'));
    const email = localStorage.getItem('email') || '';
  
    if (!id_user || !email) return;
  
    this.isButtonDisabled = true;
  
    this.tokenService.generateToken(id_user, email).subscribe({
      next: (token: string) => {
        this.generatedToken = token;
        this.notificationService.showSuccessMessage('Token gerado com sucesso');

      },
      error: (err) => {
        console.error('Erro ao gerar token:', err);
        this.isButtonDisabled = false;
        this.notificationService.showErrorMessage('Erro ao gerar token');
      }
    });
  }
  
  
  
  copyToken() {
    if (this.generatedToken) {
      navigator.clipboard.writeText(this.generatedToken);
    }
  }

  deleteToken() {
    const id_user = Number(localStorage.getItem('id_user'));
    if (!id_user) return;
  
    this.tokenService.deleteToken(id_user).subscribe({
      next: (res) => {
        if (res.status) {
          // limpa o estado
          this.generatedToken = null;
          this.tokenCreatedAt = null;
          this.isButtonDisabled = false;
        }
        this.notificationService.showSuccessMessage('Token revogado com sucesso');
      },
      error: (err) => {
        console.error('Erro ao revogar token:', err);
      }
    });
  }

  
}
