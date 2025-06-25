// src/app/admin-dashboard/admin-dashboard.page.ts
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
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
  IonList,
  IonCard,
  IonCardContent,
  ToastController,
} from '@ionic/angular/standalone';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserData } from 'src/app/models/API';

interface UserAdminProfileWithRole {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonList,
    IonCard,
    IonCardContent,
  ],
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  // Columnas para la tabla
  displayedColumns = [
    'email',
    'firstName',
    'lastName',
    'role',
    'phone',
    'actions',
  ];
  columnSizes: Record<string, string> = {
    email: '3',
    firstName: '2',
    lastName: '2',
    role: '1.5',
    phone: '1.5',
    actions: '2',
  };

  // datos en crudo y filtrados/paginados
  rawUsers = signal<UserAdminProfileWithRole[]>([]);
  displayedUsers = signal<UserAdminProfileWithRole[]>([]);
  isLoading = signal(false);

  // filtros y paginación
  searchText = signal('');
  roleFilter = signal('');
  pageIndex = signal(0);
  pageSize = signal(10);
  pageSizeOptions = [5, 10, 25, 100];
  sortState = signal<{ active: string; direction: 'asc' | 'desc' }>({
    active: '',
    direction: 'asc',
  });

  // computed para total de páginas y total de ítems
  totalPages = computed(() => {
    const totalItems = this.filteredList().length;
    return Math.ceil(totalItems / this.pageSize());
  });

  totalItems = computed(() => this.filteredList().length);

  constructor(
    private userDataService: UserDataService,
    private authService: AuthService,
    private toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  /** Recarga toda la lista desde el servicio */
  async refreshUsers() {
    this.pageIndex.set(0);
    await this.loadUsers();
  }

  /** Carga todos los UserData, les añade el role desde Cognito y aplica filtros */
  private async loadUsers() {
    this.isLoading.set(true);
    try {
      const userDatas = await this.userDataService.getAllUserData();
      const usersWithRole: UserAdminProfileWithRole[] = await Promise.all(
        userDatas.map(async (ud: UserData) => ({
          email: ud.email,
          firstName: ud.firstName,
          lastName: ud.lastName,
          phone: ud.phone,
          role: await this.authService.getUserRoleByEmail(ud.email),
        })),
      );
      this.rawUsers.set(usersWithRole);
      this.applyFilters();
    } catch (e) {
      console.error('Error loading users:', e);
      this.showError('Error al cargar usuarios');
    } finally {
      this.isLoading.set(false);
    }
  }

  /** Devuelve la lista filtrada (search + rol) sin paginar/ordenar */
  private filteredList(): UserAdminProfileWithRole[] {
    const search = this.searchText().toLowerCase();
    const roleF = this.roleFilter();
    return this.rawUsers().filter((u) => {
      const matchesSearch =
        u.email.toLowerCase().includes(search) ||
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search);
      const matchesRole = !roleF || u.role === roleF;
      return matchesSearch && matchesRole;
    });
  }

  /** Aplica orden y paginación sobre la lista filtrada */
  applyFilters() {
    let list = [...this.filteredList()];

    const { active, direction } = this.sortState();
    if (active) {
      list.sort((a, b) => {
        const vA = (a as any)[active] ?? '';
        const vB = (b as any)[active] ?? '';
        if (vA < vB) return direction === 'asc' ? -1 : 1;
        if (vA > vB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const start = this.pageIndex() * this.pageSize();
    this.displayedUsers.set(list.slice(start, start + this.pageSize()));
  }

  /** Cambia la columna de orden y refresca */
  onSortChange(column: string) {
    const sort = this.sortState();
    if (sort.active === column) {
      this.sortState.set({
        active: column,
        direction: sort.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      this.sortState.set({ active: column, direction: 'asc' });
    }
    this.applyFilters();
  }

  /** Navegar a la página anterior */
  previousPage() {
    if (this.pageIndex() > 0) {
      this.pageIndex.set(this.pageIndex() - 1);
      this.applyFilters();
    }
  }

  /** Navegar a la página siguiente */
  nextPage() {
    if (this.pageIndex() < this.totalPages() - 1) {
      this.pageIndex.set(this.pageIndex() + 1);
      this.applyFilters();
    }
  }

  /** Botón “Editar” */
  editUser(user: UserAdminProfileWithRole) {
    console.log('Editar usuario:', user);
    // aquí tu lógica de navegación o modal
  }

  /** Botón “Eliminar” */
  deleteUser(user: UserAdminProfileWithRole) {
    console.log('Eliminar usuario:', user);
    // aquí tu diálogo de confirmación y llamada a tu servicio
  }

  /** Nombre para cada columna */
  getColumnName(column: string): string {
    const map: Record<string, string> = {
      email: 'Email',
      firstName: 'Nombre',
      lastName: 'Apellido',
      role: 'Rol',
      phone: 'Teléfono',
      actions: 'Acciones',
    };
    return map[column] ?? column;
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

  async signOut() {
    try {
      await this.authService.signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
}
