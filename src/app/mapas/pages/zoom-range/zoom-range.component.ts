import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map
  zoomLevel: number = 10

  // constructor () { }

  ngAfterViewInit (): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      // longitud, latitud
      center: [-77.02952900833222, -12.044404909131146],
      zoom: this.zoomLevel
    })

    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom()
    })

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() >= 18) { this.mapa.zoomTo(18) }
    })
  }

  zoomOut (): void {
    this.mapa.zoomOut()
  }

  zoomIn (): void {
    this.mapa.zoomIn()
  }

  zoomCambio (valor: string): void {
    this.mapa.zoomTo(Number(valor))
  }
}
