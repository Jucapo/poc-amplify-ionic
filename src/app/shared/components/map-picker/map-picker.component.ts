import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LocationSelectedPayload } from '../map-picker-modal/map-picker-modal.component';
import {
  GoogleMap,
  MapInfoWindow,
  MapMarker,
  GoogleMapsModule,
} from '@angular/google-maps';
import { IonFooter, IonButton } from '@ionic/angular/standalone';
import { GeocodingService } from 'src/app/core/services/geocoding.service';

@Component({
  selector: 'app-map-picker',
  templateUrl: './map-picker.component.html',
  styleUrls: ['./map-picker.component.scss'],
  standalone: true,
  imports: [IonButton, GoogleMapsModule, IonFooter],
})
export class MapPickerComponent {
  @Output() locationSelected = new EventEmitter<LocationSelectedPayload>();

  @ViewChild(GoogleMap, { static: true }) map!: GoogleMap;
  @ViewChild('marker', { read: MapMarker, static: true }) marker!: MapMarker;

  center = { lat: 14.634915, lng: -90.506882 }; // Guatemala City default

  constructor(private geocoding: GeocodingService) {}

  moveMarker(ev: google.maps.MapMouseEvent) {
    if (ev.latLng) {
      this.center = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
      };
    }
  }

  onMarkerMoved() {
    const { lat, lng } = this.marker.getPosition()!.toJSON();
    this.center = { lat, lng };
  }

  async confirm() {
    try {
      const { lat, lng } = this.center;
      const geo = await this.geocoding.reverse(lat, lng);

      const payload: LocationSelectedPayload = {
        ...geo,
        coords: `${lat},${lng}`,
      };

      this.locationSelected.emit(payload);
    } catch (err) {
      console.error(err);
      // opcional: toast con mensaje de error
    }
  }
}
