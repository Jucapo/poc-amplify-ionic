import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DashboardPage implements OnInit {
  prospects: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Load the user’s prospectos from your service…
    // this.myProspects = ...
  }

  abrirCrearProspecto() {
    this.router.navigate(['/tabs/prospects/new']);
  }
}
