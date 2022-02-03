import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PieComponent } from './components/pie/pie.component';
import { BarComponent } from './components/bar/bar.component';
import { ScatterComponent } from './components/scatter/scatter.component';
import { HomeComponent } from './components/home/home.component';
import { HeatComponent } from './components/heat/heat.component';

const routes: Routes = [
  { path: 'pie', component: PieComponent },
  { path: 'bar', component: BarComponent },
  { path: 'scatter', component: ScatterComponent },
  { path: 'heat', component: HeatComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
