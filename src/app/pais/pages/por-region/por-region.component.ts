import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }`
  ]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paises: Country[] = [];
  hayError: boolean = false;

  constructor(private paisService: PaisService) { }

  getClaseCSS(region: string): string {
    return (region === this.regionActiva) ? 'btn-primary' : 'btn-outline-primary';
  }

  buscar(region: string) {
    this.hayError = false;
    this.regionActiva = region;

    this.paisService.buscarRegion(this.regionActiva).subscribe((paises) => {
      this.paises = paises;
      console.log(this.paises);
    }, (err) => {
      this.hayError = true;
      this.paises = [];
    });
  }

  activarRegion(region: string) {

    if (region === this.regionActiva) {
      return;
    }

    this.regionActiva = region;
    this.paises = [];

    this.paisService.buscarRegion(region).
      subscribe(paises => this.paises = paises);
  }

}
