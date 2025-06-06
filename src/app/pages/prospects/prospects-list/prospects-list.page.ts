import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prospects-list',
  templateUrl: './prospects-list.page.html',
  styleUrls: ['./prospects-list.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class ProspectsListPage implements OnInit {
  searchTerm = '';
  filteredProspects: Prospect[] = [];

  prospects: Prospect[] = [
    {
      id: '1',
      nombre: 'Tienda General',
      direccion: '2da Calle 9-28 Zona 9',
      status: 'completed',
    },
    {
      id: '2',
      nombre: 'Empresa Comercial S.A.',
      direccion: '4ta Calle A 0-33 Zona 14',
      status: 'info',
    },
    {
      id: '3',
      nombre: 'Restaurante - Sabor de La Ciudad',
      direccion: 'Edificio GT, Local 19 3ra Calle',
      status: 'info',
    },
    {
      id: '4',
      nombre: 'Electrónica Gonzáles',
      direccion: 'Bta Ave. 5-63 Zona 9',
      status: 'completed',
    },
    {
      id: '5',
      nombre: 'Academia de Lenguaje',
      direccion: '12 Ave. 7-32 Zona 14, Local 21 - Plaza Central',
      status: 'completed',
    },
    {
      id: '6',
      nombre: 'Cafetería Coffea',
      direccion: '3ra Calle B-24 Zona 9',
      status: 'info',
    },
  ];

  constructor(private router: Router) {
    this.filteredProspects = [...this.prospects];
  }

  ngOnInit() {}

  filterProspects() {
    if (!this.searchTerm) {
      this.filteredProspects = [...this.prospects];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredProspects = this.prospects.filter(
      (prospect) =>
        prospect.nombre.toLowerCase().includes(term) ||
        (prospect.direccion && prospect.direccion.toLowerCase().includes(term)),
    );
  }

  onViewProspect(id: string) {
    // Dependiendo de tu implementación, quizás sea:
    this.router.navigate([`/tabs/prospects/edit/${id}`]);
  }
}

export interface Prospect {
  id: string;
  nombre: string;
  direccion: string;
  status: string;
}
