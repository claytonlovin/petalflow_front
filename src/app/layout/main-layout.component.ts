// main-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary" *ngIf="isAuthenticated()" class="navbar" >
       <span >
            <img class="logo-img" src="assets/img/logo.png" alt="Logo">
      </span>

      <span class="spacer"></span>

      <div class="menu">
        <button mat-button routerLink="/dashboard">Dashboard</button>
        <button mat-button routerLink="/cases/1">Report Bugs</button>
        <button mat-button routerLink="/features">Settings</button>
      </div>

      <span class="spacer"></span>
      <button mat-icon-button class="dark-toggle" (click)="toggleDarkMode()" >
        <mat-icon>{{ darkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
      <button mat-button class="logout" (click)="logout()">Sair</button>
    </mat-toolbar>

    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  darkMode = false;

  constructor(private authService: AuthService ) {}
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme', this.darkMode);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  
}
