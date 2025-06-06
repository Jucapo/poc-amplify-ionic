import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MapPickerComponent } from '../map-picker/map-picker.component';

@Component({
  selector: 'app-map-picker-modal',
  templateUrl: './map-picker-modal.component.html',
  styleUrls: ['./map-picker-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, MapPickerComponent],
})
export class MapPickerModalComponent {
  constructor(private modalCtrl: ModalController) {}
  onSelected(data: LocationSelectedPayload) {
    this.modalCtrl.dismiss(data); // devuelve al padre
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}

export interface LocationSelectedPayload {
  address: string;
  department: string;
  municipality: string;
  coords: string;
}
