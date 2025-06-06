import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-edit-prospect',
  templateUrl: './edit-prospect.page.html',
  styleUrls: ['./edit-prospect.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditProspectPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
