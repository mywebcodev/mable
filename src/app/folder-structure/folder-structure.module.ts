import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderComponent } from './folder/folder.component';
import { FileComponent } from './file/file.component';
import { FolderStructureRoutingModule } from './folder-structure-routing.module';
import { StructureComponent } from '../structure/structure.component';



@NgModule({
  declarations: [
    StructureComponent,
    FolderComponent,
    FileComponent
  ],
  imports: [
    CommonModule,
    FolderStructureRoutingModule
  ]
})
export class FolderStructureModule { }
