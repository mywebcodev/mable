import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddNodeComponent } from './add-node/add-node.component';
import { FolderStructureRoutingModule } from './folder-structure-routing.module';
import { NodeComponent } from './node/node.component';
import { NodeService } from './services/node.service';
import { StructureComponent } from './structure/structure.component';

@NgModule({
  declarations: [StructureComponent, NodeComponent, AddNodeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FolderStructureRoutingModule,
  ],
  providers: [NodeService],
})
export class FolderStructureModule {}
