import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { ToastController } from '@ionic/angular/standalone';

import { UserData } from '../../models/API';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DashboardPage implements OnInit {
  username: string = '';

  loadingInitialData = signal(false);

  public prospects: Array<{ id: string; nombre: string; direccion: string }> =
    [];

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.loadUserData();

    this.prospects = [
      { id: '1', nombre: 'Tienda General', direccion: '2da Calle 9-28 Zona 9' },
      {
        id: '2',
        nombre: 'Academia de Lenguaje',
        direccion: '12 Ave. 7-32 Zona 14',
      },
      // … más prospectos …
    ];
  }

  async loadUserData() {
    this.loadingInitialData.set(true);

    try {
      const result = await this.userDataService.getCompleteUserProfile();
      if (!result) {
        console.warn('No user profile found');
        return;
      }

      const { data } = result;
      this.username = data.firstName + data.lastName;
    } catch (error) {
      console.error('Error loading profile:', error);
      this.showError('Error al cargar el perfil');
    } finally {
      this.loadingInitialData.set(false);
    }
  }

  onCreateProspect() {
    console.log('🚀 ~ DashboardPage ~ onCreateProspect ~ onCreateProspect:');

    this.router.navigate(['/tabs/prospects/new']);
  }

  onViewProspect(id: string) {
    // Dependiendo de tu implementación, quizás sea:
    this.router.navigate([`/tabs/prospects/edit/${id}`]);
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
}
