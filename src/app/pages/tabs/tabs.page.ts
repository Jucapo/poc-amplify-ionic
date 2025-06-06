import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonIcon,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
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
    IonRouterOutlet,
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
export class TabsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
