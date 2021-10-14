import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: 'mapas',
    loadChildren: async () => await import('./mapas/mapas.module').then(m => m.MapasModule)
  },
  { path: '**', redirectTo: 'mapas' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
