// create-prospect.page.ts
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  signal,
} from '@angular/core';
import { IonicModule, NavController, ModalController } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { locationOutline } from 'ionicons/icons';
import { ProspectService } from '../../../core/services/prospect.service';
import {
  LocationSelectedPayload,
  MapPickerModalComponent,
} from 'src/app/shared/components/map-picker-modal/map-picker-modal.component';

@Component({
  selector: 'app-create-prospect',
  templateUrl: './create-prospect.page.html',
  styleUrls: ['./create-prospect.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  /** `CUSTOM_ELEMENTS_SCHEMA` permite <map-picker> en el modal wrapper */
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateProspectPage {
  /* DI */
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  readonly nav = inject(NavController);
  private prospectSvc = inject(ProspectService);

  /* Formulario reactivo */
  prospectForm = this.fb.group({
    companyName: ['', Validators.required],
    companyAddress: ['', Validators.required],
    department: ['', Validators.required],
    municipality: ['', Validators.required],
    locationType: ['', Validators.required],
    locationCoordinates: [''],
    // pasos posteriores
    legalForm: [''],
    companySize: [''],
    economicSector: [''],
  });

  /* Flujo multi-paso */
  readonly step = signal(1);
  prev() {
    this.step.update((s) => Math.max(1, s - 1));
  }
  next() {
    this.step.update((s) => s + 1);
  }

  /* ───── Abrir picker de mapa ───── */
  async openMap() {
    console.log('🗺️  Open map pressed');
    /* “presentingElement” = modal actual => animación apilada correcta */
    const presenting = document.querySelector(
      'ion-modal:not([aria-hidden])',
    ) as HTMLIonModalElement | null;

    const modal = await this.modalCtrl.create({
      component: MapPickerModalComponent,
      presentingElement: presenting ?? undefined,
      cssClass: 'fullscreen-modal',
    });

    await modal.present().then(() => console.log('Modal presented'));

    const { data } = await modal.onWillDismiss<LocationSelectedPayload>();
    if (!data) return; // usuario canceló

    /* Actualiza el form con lo seleccionado */
    this.prospectForm.patchValue({
      companyAddress: data.address,
      department: data.department,
      municipality: data.municipality,
      locationCoordinates: data.coords,
    });
  }

  /* Guardar / Cancelar */
  cancel() {
    this.nav.back();
  }

  async save() {
    if (this.prospectForm.invalid) return;

    await this.prospectSvc.createProspect(
      this.prospectForm.getRawValue() as any,
    );
    this.nav.back();
  }

  /* Iconos para template */
  icons = { locationOutline };
}
