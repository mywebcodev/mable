import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent {
  private _node!: NodeModel;

  nodeType = NodeType;

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  submit = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<NodeModel>();

  @Input()
  get node(): NodeModel {
    return this._node;
  }
  set node(node: NodeModel) {
    this._node = node;
  }
  readonly addNodeInputControl = new FormControl(null, [Validators.required]);

  canShowControls(node: NodeModel): boolean {
    const length = node.children?.length;

    if (node.isFolder) {
      return length ? !node.children?.at(length - 1)?.isFolder : true;
    }

    return false;
  }

  onSubmit() {
    this.submit.emit();
  }

  onCancel() {
    this.cancel.emit();
  }

  onDelete() {
    this.delete.emit(this.node);
  }
}
