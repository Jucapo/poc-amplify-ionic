import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonNote,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSpinner,
  ToastController,
  IonButton,
} from '@ionic/angular/standalone';
import { UserDataService } from '../../core/services/user-data.service';
import { AuthService } from '../../core/services/auth.service';
import { UpdateUserDataInput } from '../../models/API';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonNote,
    IonFab,
    IonFabButton,
    IonIcon,
    IonSpinner,
    IonIcon,
  ],
})
export class UserProfilePage implements OnInit {
  profileForm: FormGroup;
  loading = signal(false);
  loadingInitialData = signal(false);

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) {
    this.profileForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    this.loadingInitialData.set(true);

    try {
      // 1) Llamamos al nuevo método
      const result = await this.userDataService.getCompleteUserData();
      if (!result) {
        console.warn('No user data found');
        return;
      }

      // 2) Desestructuramos data y role
      const { data, role } = result;

      // 3) Rellenamos el formulario
      this.profileForm.patchValue({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        birthDate: data.birthDate,
        gender: data.gender,
        occupation: data.occupation,
      });

      // 4) (Opcional) si quieres mostrar el rol en esta página
      console.log('User role:', role);
    } catch (error) {
      console.error('Error loading profile:', error);
      this.showError('Error al cargar el perfil');
    } finally {
      this.loadingInitialData.set(false);
    }
  }

  async onSubmit() {
    console.log(
      '🚀 ~ UserProfilePage ~ onSubmit ~ onSubmit:',
      this.profileForm.valid,
    );
    if (!this.profileForm.valid) {
      await this.showError('Por favor complete todos los campos requeridos');
      // Marcar todos los campos como touched para mostrar errores
      Object.values(this.profileForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.loading.set(true);

    try {
      const email = await this.authService.getCurrentUserEmail();
      if (!email) {
        await this.showError(
          'Sesión expirada. Por favor inicie sesión nuevamente',
        );
        await this.authService.signOut();
        return;
      }

      const formValue = this.profileForm.value;
      const input: UpdateUserDataInput = {
        ...formValue,
        email,
      };

      const result = await this.userDataService.updateUserData(
        formValue.id,
        input,
      );

      if (result) {
        await this.showSuccess('Perfil actualizado correctamente');
        // Opcional: Actualizar datos locales si es necesario
        this.profileForm.markAsPristine();
      } else {
        await this.showError('Error al actualizar el perfil');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      await this.showError(this.getErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  private getErrorMessage(error: any): string {
    if (error instanceof Error) {
      return error.message;
    }
    if (typeof error === 'string') {
      return error;
    }
    return 'Ocurrió un error inesperado. Por favor intente nuevamente';
  }

  private async showSuccess(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'primary',
      position: 'top',
    });
    await toast.present();
  }

  private async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 5000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  async signOut() {
    try {
      await this.authService.signOut();
      // Opcional: redirige al login si usas routing
      // this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
}
