import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-prospects-list',
  templateUrl: './prospects-list.page.html',
  styleUrls: ['./prospects-list.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class ProspectsListPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
