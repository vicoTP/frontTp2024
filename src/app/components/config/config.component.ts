import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { AdminService } from 'src/app/services/admin.service';
import { v4 as uuidv4} from 'uuid';

declare var iziToast:any;
declare var jQuery : any;
declare var $ : any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token : any;
  public config : any = [];
  public url: any;

  public imgSelect : any | ArrayBuffer ;
  public titulo_cat = '';
  public icono_cat = '';
  public file : File | undefined = undefined;

  constructor(
    private _adminService : AdminService,
  ){
    this.token = localStorage.getItem('token'); 
    this.url = GLOBAL.url;
    this._adminService.obtener_config_admin(this.token).subscribe(
      response => {
        this.config = response.data;
        this.imgSelect = this.url+'obtener_logo/'+this.config.logo;
      },

      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {

  }

  agregar_cat(){
    if (!this.config.categoria) {
      this.config.categoria = []; // Initialize as an empty array if it's not defined
    }
    
    if(this.titulo_cat && this.icono_cat)
    {
      this.config.categoria.push({
        titulo: this.titulo_cat,
        icono: this.icono_cat,
        _id: uuidv4()
      });

      this.titulo_cat = '';
      this.icono_cat = '';
    }

    else {
      iziToast.show({
        title:'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe ingresar un título e icono para la categoría'
      });
    }
  }

  actualizar(confForm: any){
    if(confForm.valid){
      let data = {
        titulo: confForm.value.titulo,
        serie: confForm.value.serie,
        correlativo: confForm.value.correlativo,
        categoria: this.config.categoria,
        logo: this.file
      }

      console.log(data);
      this._adminService.actualiza_config_admin("653df703f9fc0b9b80d2cd49",data,this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Éxito',
            titleColor: '#1DC74C',
            color: 'FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente la configuración'
          });
        },
        error => {
          console.log(error);
        }
      );
    }

    else {
      iziToast.show({
        title:'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Complete correctamente el formulario'
      });
    }
  }

  fileChangeEvent(event:any){
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

    }

    else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message:'No hay una imagen de envío'
      });

      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  
    if (file && file.size <= 4000000){

    
      if (file?.type == 'image/png' || file?.type == 'image/webp' || file?.type == 'image/jpg' || file?.type == 'image/gif' || file?.type == 'image/jpeg')
      {
        const reader = new FileReader();
        reader.onload = e => this.imgSelect = reader.result;
        $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
        $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
        reader.readAsDataURL(file);
      
        $('#input-portada').text(file.name);
        this.file = file;

      }

      else {
        iziToast.show({
          title: 'ERROR',
          titleColor: '#FF0000',
          color: '#FFF',
          class: 'text-danger',
          position: 'topRight',
          message:'El archivo debe ser una imagen'
        });

        $('#input-portada').text('Seleccionar imagen');
        this.imgSelect = 'assets/img/01.jpg';
        this.file = undefined;
      }

    }else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message:'La imagen no puede superar los 4MB'
      });

      $('#input-portada').text('Seleccionar imagen');
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  
    console.log(this.file);
  }

  ngDoCheck(): void {
    $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">")
  }

  eliminar_categoria(idx:any){
    this.config.categoria.splice(idx,1);
  }

}
