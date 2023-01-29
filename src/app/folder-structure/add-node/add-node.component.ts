import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { NodeCreateType } from '../models/node-create-type.enum';
import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent {
  private _type!: NodeType;
  private _mode = NodeCreateType.Display;

  readonly addNodeInputControl = new FormControl(null, [Validators.required]);
  readonly nodeCreateType = NodeCreateType;
  readonly nodeType = NodeType;

  @Output()
  submit = new EventEmitter<NodeModel>();

  @Output()
  cancel = new EventEmitter<void>();

  @Input()
  get type(): NodeType {
    return this._type;
  }

  set type(type: NodeType) {
    this._type = type;
  }

  @Input()
  get mode(): NodeCreateType {
    return this._mode;
  }

  set mode(mode: NodeCreateType) {
    this._mode = mode;
  }

  onSubmit() {
    const node = new NodeModel();
    node.type = this.type;
    node.name = this.addNodeInputControl.value;

    this.submit.emit(node);
  }

  onCreateFile() {
    this.type = NodeType.File;
    this.mode = NodeCreateType.Create;
  }

  onCreateFolder() {
    this.type = NodeType.Folder;
    this.mode = NodeCreateType.Create;
  }

  onCancel() {
    this.mode = NodeCreateType.Display;
    this.cancel.emit();
  }
}
