import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FolderStructureRoutingModule } from './folder-structure-routing.module';
import { NodeComponent } from './node/node.component';
import { NodeService } from './services/node.service';
import { StructureComponent } from './structure/structure.component';
import { AddNoteComponent } from './add-note/add-note.component';

@NgModule({
  declarations: [
    StructureComponent,
    NodeComponent,
    AddNoteComponent
  ],
  imports: [
    CommonModule,
    FolderStructureRoutingModule
  ],
  providers: [NodeService]
})
export class FolderStructureModule { }
