import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { IonicModule, NavController, ModalController } from '@ionic/angular';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { cameraOutline, locationOutline } from 'ionicons/icons';

import { ProspectService } from '../../../core/services/prospect.service';
import { MapPickerModalComponent } from '../../../shared/components/map-picker-modal/map-picker-modal.component';

import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { uploadData, getUrl } from '@aws-amplify/storage';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-create-prospect',
  templateUrl: './create-prospect.page.html',
  styleUrls: ['./create-prospect.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CreateProspectPage {
  /* ───────────────────────── responsive */
  isDesktop = signal<boolean>(window.innerWidth >= 768);
  @HostListener('window:resize')
  onResize() {
    this.isDesktop.set(window.innerWidth >= 768);
  }

  /* ───────────────────────── DI */
  private fb = inject(FormBuilder);
  private modalCtrl = inject(ModalController);
  readonly nav = inject(NavController);
  private prospectSvc = inject(ProspectService);
  private cdr = inject(ChangeDetectorRef);

  /* ───────────────────────── formulario con TODO el modelo */
  prospectForm = this.fb.group({
    /* Paso 1 – Identificación */
    companyName: ['', Validators.required],
    companyAddress: ['', Validators.required],
    department: ['', Validators.required],
    municipality: ['', Validators.required],
    locationType: ['', Validators.required],
    locationCoordinates: [''],

    /* Paso 2 – Imágenes */
    businessImages: [[] as string[]],

    /* Paso 3 – Características */
    legalForm: ['', Validators.required],
    economicSector: ['', Validators.required],
    yearsInOperation: ['', Validators.required],
    companySize: ['', Validators.required],
    annualRevenue: ['', Validators.required],

    /* Paso 4 – Acceso a financiamiento */
    requestedFinancingLast3Years: ['', Validators.required],
    financingTypeUsed: [''],
    hadFinancingDifficulties: ['', Validators.required],
    mainDifficultyReason: [''],

    /* Paso 5 – Necesidades de financiamiento */
    needsFinancingCurrently: ['', Validators.required],
    financingPurpose: [''],
    amountNeeded: [''],
    favorableTerms: [''],

    /* Paso 6 – Retos y perspectivas */
    mainChallenges: [''],
    interestedFinancialAdvice: ['', Validators.required],
    interestedSpecializedPrograms: ['', Validators.required],

    /* campos extra del esquema (puedes pre-setearlos o mostrarlos aparte) */
    macroRegion: ['Centro'],
    region: ['Zona Metropolitana'],
    agency: [''],
  });

  /* ───────────────────────── navegación pasos (solo mobile) */
  readonly maxStep = 6;
  readonly step = signal(1);
  prev() {
    this.step.update((s) => Math.max(1, s - 1));
  }
  next() {
    this.step.update((s) => Math.min(this.maxStep, s + 1));
  }

  /* ───────────────────────── mapa */
  async openMap() {
    const presenting = document.querySelector(
      'ion-modal:not([aria-hidden])',
    ) as HTMLIonModalElement | null;

    const modal = await this.modalCtrl.create({
      component: MapPickerModalComponent,
      presentingElement: presenting ?? undefined,
      cssClass: 'fullscreen-modal',
    });

    await modal.present().then(() => console.log('Modal presented'));

    const { data } = await modal.onWillDismiss<LocationPayload>();
    if (!data) return;

    this.prospectForm.patchValue({
      companyAddress: data.address,
      department: data.department,
      municipality: data.municipality,
      locationCoordinates: data.coords,
    });

    this.cdr.markForCheck();
  }

  /* ───────────────────────── imágenes: cámara / galería */
  async addImages() {
    /* 1. Foto (cámara o galería) */
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos, // o CameraSource.Camera
      resultType: CameraResultType.DataUrl, // base64 en web
      quality: 85,
    });

    /* 2. DataURL → Blob */
    const blob = await fetch(photo.webPath!).then((r) => r.blob());

    /* 3. Subir a S3:  usa prefijo public/  */
    const upload = await uploadData({
      data: blob,
      path: `public/prospects/${uuid()}.${photo.format}`, // ACL=public
      options: { contentType: blob.type },
    }).result; // <- espera la promesa interna

    /* 4. Obtener URL pública  */
    const { url } = await getUrl({ path: upload.path });

    /* 5. Guardar en el formulario */
    const list = (this.prospectForm.value.businessImages as string[]) ?? [];
    this.prospectForm.patchValue({
      businessImages: [...list, url.href], // URL → string
    });
  }

  /* ───────────────────────── guardar / cancelar */
  cancel() {
    this.nav.back();
  }

  async save() {
    if (this.prospectForm.invalid) {
      /* en mobile navega al primer paso con error */
      if (!this.isDesktop()) {
        const idx = this.formOrder.findIndex(
          (k) => this.prospectForm.get(k)?.invalid,
        );
        if (idx !== -1) this.step.set(idx + 1);
      }
      return;
    }

    await this.prospectSvc.createProspect(
      this.prospectForm.getRawValue() as any,
    );
    this.nav.back();
  }

  /* ───────────────────────── helpers */
  formOrder = ['companyName']; // primer campo para ir al paso con error
  icons = { locationOutline, cameraOutline };
}

/* payload emitido desde MapPickerModalComponent */
export interface LocationPayload {
  address: string;
  department: string;
  municipality: string;
  coords: string;
}
