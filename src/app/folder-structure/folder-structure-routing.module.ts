import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NodeTreeContainerComponent } from './node-tree-container/node-tree-container.component';

const routes: Routes = [
  {
    path: '',
    component: NodeTreeContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FolderStructureRoutingModule { }
