// src/pages/tabs/tabs.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonTabButton,
  IonLabel,
  IonTabBar,
  IonTabs,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonTabButton,
    IonIcon,
    IonTabBar,
    IonTabs,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class TabsPage {}
