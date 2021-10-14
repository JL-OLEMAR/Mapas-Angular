import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css']
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map
  zoomLevel: number = 16
  center: [number, number] = [-77.02952900833222, -12.044404909131146]

  ngAfterViewInit (): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    })

    // Marker personalizado
    // const markerHtml: HTMLElement = document.createElement('div')
    // markerHtml.innerHTML = '🚩 here'
    // new mapboxgl.Marker({ element: markerHtml })
    //   .setLngLat(this.center)
    //   .addTo(this.mapa)
  }

  agregarMarcador (): void {
    // color hexadecimal random
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16))

    const nuevoMarcador = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.mapa)
  }

  irMarcador (): void {

  }
}
