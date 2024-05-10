import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { LogoService } from 'src/app/services/logo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public token: any;
  public logoUrl: any; // Propiedad para almacenar la URL del logo
  public url: any;
  public config: any = [];
  private logoLoaded: boolean = false; // Bandera para verificar si la imagen del logo ya se cargó

  constructor(
    private _adminService: AdminService,
    private _logoService: LogoService,
    private _router : Router,
  ) {
    this.token = localStorage.getItem('token');
    this.url = GLOBAL.url;

    // Si la imagen del logo no se ha cargado aún, cargarla
    if (!this.logoLoaded) {
      this.obtenerConfiguracionAdmin();
    }

    // Suscribe al cambio de la URL del logo
    this._logoService.logoChange$.subscribe(newLogoUrl => {
      this.logoUrl = newLogoUrl;
    });
  }

  logout() {
    // Borrar el token de localStorage u otra lógica de cierre de sesión aquí
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    this._router.navigateByUrl('/login'); // Ajusta la ruta según tu aplicación
  }

  obtenerConfiguracionAdmin() {
    this._adminService.obtener_config_admin(this.token).subscribe(
      response => {
        this.config = response.data;
        this.logoUrl = this.url + 'obtener_logo/' + this.config.logo; // Asigna la URL del logo
        this.logoLoaded = true; // Marca la imagen del logo como cargada
      },
      error => {
        console.log(error);
      }
    );
  }
}