import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
   <mat-toolbar
      color="primary"
      *ngIf="isAuthenticated()"
      class="navbar"
      [ngStyle]="{ left: sidebarOpen ? '250px' : '0', width: sidebarOpen ? 'calc(100% - 250px)' : '100%' }"
    >
      <button mat-icon-button (click)="toggleSidebar()" class="menu-toggle">
        <mat-icon>menu</mat-icon>
      </button>

      <span class="spacer"></span>

      <div class="actions">
        <button mat-icon-button class="dark-toggle" (click)="toggleDarkMode()">
          <mat-icon>{{ darkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
        <button mat-button class="logout" (click)="logout()">Sair</button>
      </div>
    </mat-toolbar>
    <div class="wrapper">
  <mat-sidenav-container class="sidenav-container">
    <mat-sidenav
      #sidenav
      mode="side"
      [opened]="sidebarOpen"
      class="sidenav"
      fixedInViewport="true"
    >
      <div class="logo">
        <a mat-list-item routerLink="/dashboard">
          <span>PetalFlow</span>
        </a>
      </div>
      <mat-nav-list>
        <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
          <mat-icon>rocket</mat-icon>
          <span>Home</span>
        </a>
        <a mat-list-item routerLink="/cases/1" routerLinkActive="active">
          <mat-icon>bug_report</mat-icon>
          <span>Report Bugs</span>
        </a>
        <a mat-list-item routerLink="/settings" routerLinkActive="active">
          <mat-icon>settings</mat-icon>
          <span>Settings</span>
        </a>
      </mat-nav-list>
    </mat-sidenav>

    <mat-sidenav-content class="content">
      <mat-toolbar
        color="primary"
        class="navbar"
        [ngStyle]="{
          left: sidebarOpen ? '250px' : '0',
          width: sidebarOpen ? 'calc(100% - 250px)' : '100%'
        }"
      >
        <button mat-icon-button (click)="toggleSidebar()" class="menu-toggle">
          <mat-icon>menu</mat-icon>
        </button>

        <span class="spacer"></span>

        <div class="actions">
          <button mat-icon-button class="dark-toggle" (click)="toggleDarkMode()">
            <mat-icon>{{ darkMode ? 'light_mode' : 'dark_mode' }}</mat-icon>
          </button>
          <button mat-button class="logout" (click)="logout()">Sair</button>
        </div>
      </mat-toolbar>

      <div class="router-content">
        <router-outlet></router-outlet>
      </div>
    </mat-sidenav-content>
  </mat-sidenav-container>
</div>
  `,
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  darkMode = false;
  isMenuOpen = false;
  mobileMenuOpen = false;
  sidebarOpen = true;

  constructor(private authService: AuthService, private breakpointObserver: BreakpointObserver) {}

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-theme', this.darkMode);
  }
  ngOnInit() {
    this.breakpointObserver.observe([
      '(max-width: 768px)']).subscribe(result => {
      if (result.matches) {
        this.sidebarOpen = !this.sidebarOpen;
      }else{
        this.sidebarOpen = true;
      }
    });
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

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
