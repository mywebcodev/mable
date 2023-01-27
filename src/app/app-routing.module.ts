import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [{
  path: '',
  component: AppComponent,
},
{
  path: 'folder-structure',
  loadChildren: () => import('./folder-structure/folder-structure.module').then(m => m.FolderStructureModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
