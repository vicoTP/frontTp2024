import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent {

  public clientes : Array<any> = [];
  public filtro_apellidos = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 20;
  public token;
  public load_data = true;
  public load_btn = false;

  constructor (
    private _clienteService : ClienteService,
    private _adminService: AdminService
  ) {

      this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.init_Data();
  }
  
  init_Data() {
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      response => {

        this.clientes = response.data;
        this.load_data = false;
      },

      error => {
        console.log(error);
      }
    );
  }
  
  filtro (tipo:any) {


    if (tipo == 'apellido') 
    {
      if (this.filtro_apellidos) 
      {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos,this.token).subscribe(
          response => {
    
            this.clientes = response.data;
            this.load_data = false;
          },
    
          error => {
            console.log(error);
          }
        );
      } else {
        this.init_Data();
      }
    } else if ( tipo == 'correo')
    {
      if (this.filtro_correo)
      {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo,this.token).subscribe(
          response => {
    
            this.clientes = response.data;
            this.load_data = false;
          },
    
          error => {
            console.log(error);
          }
        );
      }
      else {
        this.init_Data();
      }
    }
  }

  eliminar(id:any){
    this.load_btn = true;
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response => {
        iziToast.show({
          title: 'Éxito',
          titleColor: '#1DC74C',
          color: 'FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente el cliente'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;
        this.init_Data();
      },

      error => {
        iziToast.show({
          title: 'Error',
          titleColor: '#FF0000',
          color: 'FFF',
          class: 'text-danger',
          position: 'topRight',
          message: 'Ocurrió un error en el servidor'
        });
        this.load_btn = false;
      }
    );
  }
}

