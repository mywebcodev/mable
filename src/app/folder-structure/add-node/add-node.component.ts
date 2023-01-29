import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.scss'],
})
export class AddNodeComponent {
  readonly addNodeInputControl = new FormControl(null, [Validators.required]);

  @Output()
  submit = new EventEmitter<NodeModel>();

  @Output()
  cancel = new EventEmitter<void>();

  @Input()
  type!: NodeType;

  onSubmit() {
    const node = new NodeModel();
    node.type = this.type;
    node.name = this.addNodeInputControl.value;

    this.submit.emit(node);
  }

  onCancel() {
    this.cancel.emit();
  }
}
