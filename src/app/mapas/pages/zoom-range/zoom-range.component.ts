import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map
  zoomLevel: number = 10
  // longitud, latitud
  center: [number, number] = [-77.02952900833222, -12.044404909131146]

  // constructor () { }

  ngAfterViewInit (): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    })

    // zoom del mapa controlado
    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom()
    })

    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) { this.mapa.zoomTo(18) }
    })

    // Coordenadas del mapa controladas
    this.mapa.on('move', (e) => {
      const target = e.target
      const { lng, lat } = target.getCenter()
      this.center = [lng, lat]
    })
  }

  ngOnDestroy (): void {
    // destruir el listener zoom
    this.mapa.off('zoom', () => {})

    // destruir el listener zoomend
    this.mapa.off('zoomend', () => {})

    // destruir el listener move
    this.mapa.off('move', () => {})
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
