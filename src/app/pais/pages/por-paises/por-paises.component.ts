import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-paises',
  templateUrl: './por-paises.component.html',
  styles: [
    `
    li{
      cursor:pointer;
    }
    `
  ]
})
export class PorPaisesComponent {
  termino: string = '';
  hayError: boolean = false;
  paises: Country[] = [];

  paisesSugeridos: Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor(private paisService: PaisService) { }

  buscar(termino: string) {
    this.mostrarSugerencias = false;
    this.hayError = false;
    console.log(this.termino);
    this.termino = termino;

    this.paisService.buscarPais(this.termino).subscribe((paises) => {
      this.paises = paises;
      console.log(this.paises);
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }
  sugerencias(termino: string) {
    this.mostrarSugerencias = true;
    this.hayError = false;
    this.termino = termino;
    this.paisService.buscarPais(termino)
      .subscribe(paises => this.paisesSugeridos = paises.splice(0, 5),
        (err) => this.paisesSugeridos = []
    );
  }

  buscarSugerido(termino:string) {
    this.buscar(termino);
  }
}
