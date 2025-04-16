import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  template: `
    <mat-toolbar color="primary" *ngIf="isAuthenticated()" class="navbar">
  <span class="left">
    <img class="logo-img" src="assets/img/logo.png" alt="Logo" />
  </span>

  <span class="spacer desktop-only"></span>

  <div class="menu desktop-only">
    <button mat-button routerLink="/dashboard">Dashboard</button>
    <button mat-button routerLink="/cases/1">Report Bugs</button>
    <button mat-button routerLink="/features">Settings</button>
  </div>

  <span class="spacer desktop-only"></span>

  <div class="actions desktop-only">
    <button mat-icon-button class="dark-toggle" (click)="toggleDarkMode()">
      <mat-icon>{{ darkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
    </button>
    <button mat-button class="logout" (click)="logout()">Sair</button>
  </div>

  <button mat-icon-button class="mobile-toggle" (click)="toggleMobileMenu()">
    <mat-icon>menu</mat-icon>
  </button>
</mat-toolbar>

<div class="mobile-menu" [class.open]="isMenuOpen" *ngIf="mobileMenuOpen">
  <button mat-button routerLink="/dashboard">Dashboard</button>
  <button mat-button routerLink="/cases/1">Report Bugs</button>
  <button mat-button routerLink="/features">Settings</button>
  <button mat-button (click)="toggleDarkMode()">
    <mat-icon>{{ darkMode ? 'light_mode' : 'dark_mode' }}</mat-icon> Modo
  </button>
  <button mat-button (click)="logout()">Sair</button>
</div>

<div class="content">
  <router-outlet></router-outlet>
</div>

  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  darkMode = false;
  isMenuOpen = false;
  mobileMenuOpen = false;

  constructor(private authService: AuthService) {}

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

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    this.isMenuOpen = !this.isMenuOpen;

  }

}
