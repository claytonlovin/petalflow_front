import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RegisterService } from '../../services/register.service';
import { NotificationService } from '../../services/notification.service';
@Component({

    imports: [
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatIconModule,
      FormsModule,
      MatIcon
    ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  cpf_cnpj: string = '';
  password: string = '';
  confirmPassword: string = '';
  registerError: string = '';

  constructor(private registerService: RegisterService, private router: Router, private notificationService: NotificationService) {}

  onRegister() {
      this.registerService
        .register(this.fullName, this.email, this.phone, this.cpf_cnpj, this.password)
        .subscribe({
          next: (res) => {
            this.notificationService.showSuccessMessage('Usuário registrado com sucesso!');
            this.registerService.saveToken(res.access_token);
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
            
          },
          error: (err) => {
            console.error('Erro no registro:', err);
            this.notificationService.showErrorMessage('Erro ao registrar. Verifique os dados.');
          },
        });     
      }
    }
  