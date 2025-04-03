import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonIcon,
  IonButton,
  IonSpinner,
  ToastController,
} from '@ionic/angular/standalone';
import { UserDataService } from '../../core/services/user-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonIcon,
    IonButton,
    IonSpinner,
  ],
})
export class AdminDashboardPage implements OnInit {
  // Datos y estado
  usersData = signal<any>(null);
  displayedUsers = signal<any[]>([]);
  isLoading = signal(false);

  // Filtros y ordenamiento
  searchText = signal<string>('');
  roleFilter = signal<string>('');
  pageSize = signal<number>(10);
  sortState = signal<any>({ active: '', direction: 'asc' });

  // Paginación
  pageIndex = signal(0);
  pageSizeOptions = [5, 10, 25, 100];

  // Columnas para la tabla
  displayedColumns = [
    'email',
    'firstName',
    'lastName',
    'role',
    'phone',
    'actions',
  ];
  columnSizes: { [key: string]: string } = {
    email: '3',
    firstName: '2',
    lastName: '2',
    role: '1.5',
    phone: '1.5',
    actions: '2',
  };
  constructor(
    private userDataService: UserDataService,
    private toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.isLoading.set(true);
    try {
      const data = await this.userDataService.getAllUsers();
      this.usersData.set(data);
      this.applyFilters();
    } catch (error) {
      console.error('Error loading users:', error);
      this.showError('Error al cargar usuarios');
    } finally {
      this.isLoading.set(false);
    }
  }

  applyFilters() {
    if (!this.usersData()) {
      this.displayedUsers.set([]);
      return;
    }

    const searchText = this.searchText().toLowerCase();
    const roleFilter = this.roleFilter();

    let filtered = this.combineUserData().filter((user: any) => {
      const matchesSearch =
        user.email.toLowerCase().includes(searchText) ||
        (user.firstName && user.firstName.toLowerCase().includes(searchText)) ||
        (user.lastName && user.lastName.toLowerCase().includes(searchText));

      const matchesRole = !roleFilter || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    // Ordenamiento
    if (this.sortState().active) {
      filtered = this.sortData(filtered, this.sortState());
    }

    // Paginación
    const startIndex = this.pageIndex() * this.pageSize();
    this.displayedUsers.set(
      filtered.slice(startIndex, startIndex + this.pageSize()),
    );
  }

  private combineUserData(): any[] {
    if (!this.usersData()) return [];

    return this.usersData().profiles.map((profile: any) => {
      const userData =
        this.usersData().data.find((d: any) => d.email === profile.email) || {};
      return { ...profile, ...userData };
    });
  }

  sortData(data: any[], sort: any): any[] {
    if (!sort.active || sort.direction === '') {
      return data;
    }

    return [...data].sort((a, b) => {
      const valueA = a[sort.active] ?? '';
      const valueB = b[sort.active] ?? '';

      if (valueA < valueB) {
        return sort.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sort.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  onSortChange(column: string) {
    const currentSort = this.sortState();
    if (currentSort.active === column) {
      this.sortState.set({
        active: column,
        direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      this.sortState.set({ active: column, direction: 'asc' });
    }
    this.applyFilters();
  }

  previousPage() {
    if (this.pageIndex() > 0) {
      this.pageIndex.set(this.pageIndex() - 1);
      this.applyFilters();
    }
  }

  nextPage() {
    if (this.pageIndex() < this.totalPages() - 1) {
      this.pageIndex.set(this.pageIndex() + 1);
      this.applyFilters();
    }
  }

  totalPages = computed(() => {
    const totalItems = this.usersData()?.profiles?.length || 0;
    return Math.ceil(totalItems / this.pageSize());
  });

  totalUsers = computed(() => {
    return this.usersData()?.profiles?.length || 0;
  });

  getColumnName(column: string): string {
    const names: any = {
      email: 'Email',
      firstName: 'Nombre',
      lastName: 'Apellido',
      role: 'Rol',
      phone: 'Teléfono',
      actions: 'Acciones',
    };
    return names[column] || column;
  }

  async refreshUsers() {
    this.pageIndex.set(0);
    await this.loadUsers();
  }

  editUser(user: any) {
    // Implementar lógica de edición
    console.log('Editar usuario:', user);
  }

  deleteUser(user: any) {
    // Implementar lógica de eliminación
    console.log('Eliminar usuario:', user);
  }

  private async showError(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }
}
