import { Component, OnInit } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
    #mapa {
      height: 100vh;
      width: 100vw;
    }
  `]
})
export class FullScreenComponent implements OnInit {
  // constructor () { }

  ngOnInit (): void {
    const map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-77.02952900833222, -12.044404909131146],
      zoom: 17
    })
  }
}
