import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'

//Libreria para crear el pdf
import * as pdfMake from  'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit{
  
  listProductos: Producto[] = [];
  elementos: number = 0;
  
  constructor(private _productoService: ProductoService) {

  }
  
  ngOnInit(): void {
    
    this.obtenerProductos();

  }

  openPdfTables() {
   
        
      const documentDefinition: any = {

        content: [
          {
            table: {
              
              headerRows: 1,
              // widths: ['*', 'auto', 100, '*'],
              widths: ['*', '*', '*', '*'],

              body: 
              [
                [{ text: 'Nombre', bold: true }, { text: 'Categoria', bold: true }, { text: 'Ubicacion', bold: true }, { text: 'Precio', bold: true }],
                
                [
                   
                     this.listProductos[0].producto
                  
                ]
              ]
            }
          }
        ]
      }
      ;
      pdfMake.createPdf(documentDefinition).open();

      const documentDefinition1: any = {

        content: [
          {
            table: {
              
              headerRows: 1,
              // widths: ['*', 'auto', 100, '*'],
              widths: ['*', '*', '*', '*'],

              body: 
              [
                [{ text: 'Nombre', bold: true }, { text: 'Categoria', bold: true }, { text: 'Ubicacion', bold: true }, { text: 'Precio', bold: true }],
                [this.listProductos[0].producto, this.listProductos[i].categoria, this.listProductos[i].ubicacion, this.listProductos[i].precio],
              ]
            }
          }
        ]
      };
      pdfMake.createPdf(documentDefinition1).open();
  }

  obtenerProductos(){
    this._productoService.getProductos().subscribe((data: any) => {
      console.log(data);
      this.listProductos = data;
      this.elementos = this.listProductos.length;
    })
  }

  eliminarProducto(id: any){
    this._productoService.deleteProducto(id).subscribe((data: any) => {

      Swal.fire({
        title: 'Eliminacion de Producto',
        text: "¿Desea eliminar el producto?",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(data);
          this.obtenerProductos();
          this.elementos = this.listProductos.length;
        }
      })
    })
  }

}
