/* eslint-disable @typescript-eslint/no-non-null-assertion, @typescript-eslint/strict-boolean-expressions */
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

interface MarcadorColor {
  color: string
  marker?: mapboxgl.Marker
  centro?: [number, number]
}

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
  marcadores: MarcadorColor[] = []

  ngAfterViewInit (): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    })

    this.leerLocalStorage()
  }

  agregarMarcador (): void {
    // color hexadecimal random
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16))

    const nuevoMarcador = new mapboxgl.Marker({ draggable: true, color })
      .setLngLat(this.center)
      .addTo(this.mapa)

    this.marcadores.push({ color, marker: nuevoMarcador })
    this.guardarMarcadoresLocalStorage()
  }

  irMarcador (marker: mapboxgl.Marker): void {
    this.mapa.flyTo({ center: marker.getLngLat() })
  }

  guardarMarcadoresLocalStorage (): void {
    const lngLatArr: MarcadorColor[] = []

    this.marcadores.forEach(m => {
      const color = m.color
      const { lng, lat } = m.marker!.getLngLat()
      lngLatArr.push({ color, centro: [lng, lat] })
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr))
  }

  leerLocalStorage (): void {
    if (!localStorage.getItem('marcadores')) { return }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({ color: m.color, draggable: true })
        .setLngLat(m.centro!)
        .addTo(this.mapa)

      this.marcadores.push({ marker: newMarker, color: m.color })
    })
  }
}
