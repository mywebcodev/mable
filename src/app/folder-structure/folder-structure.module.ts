import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddNodeComponent } from './add-node/add-node.component';
import { FolderStructureRoutingModule } from './folder-structure-routing.module';
import { NodeTreeContainerComponent } from './node-tree-container/node-tree-container.component';
import { NodeTreeComponent } from './node-tree/node-tree.component';
import { NodeComponent } from './node/node.component';
import { NodeService } from './services/node.service';

@NgModule({
  declarations: [
    NodeTreeContainerComponent,
    NodeTreeComponent,
    NodeComponent,
    AddNodeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FolderStructureRoutingModule,
  ],
  providers: [NodeService],
})
export class FolderStructureModule {}
