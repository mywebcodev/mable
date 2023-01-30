import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { INodeCreateData } from '../models/i-node-create.data';
import { NodeCreateType } from '../models/node-create-type.enum';
import { NodeType } from '../models/node-type.enum';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent {
  readonly addNodeInputControl = new FormControl(null, [Validators.required]);
  readonly nodeCreateType = NodeCreateType;
  readonly nodeType = NodeType;

  @Output()
  submit = new EventEmitter<INodeCreateData>();

  @Output()
  cancel = new EventEmitter<void>();

  @Input()
  type: NodeType;

  @Input()
  mode: NodeCreateType;

  /**
   * Handles submit event
   */
  onSubmit() {
    this.submit.emit({
      name: this.addNodeInputControl.value,
      type: this.type
    });
  }

  /**
   * Handles create file event
   */
  onCreateFile() {
    this.type = NodeType.File;
    this.mode = NodeCreateType.Create;
  }

  /**
   * Handles create folder event
   */
  onCreateFolder() {
    this.type = NodeType.Folder;
    this.mode = NodeCreateType.Create;
  }

  /**
   * Handles cancel event
   */
  onCancel() {
    this.mode = NodeCreateType.Display;
    this.cancel.emit();
  }
}
