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
  nodeType = NodeType;

  @Output()
  cancel = new EventEmitter<void>();

  @Output()
  submit = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<NodeModel>();

  @Input()
  node!: NodeModel;

  readonly addNodeInputControl = new FormControl(null, [Validators.required]);

  /**
   * Check if node controls should be displayed
   * @param node NodeModel - the node to check
   * @returns boolean - true if controls should be displayed, false otherwise
   */
  canShowControls(node: NodeModel): boolean {
    const length = node.children?.length;

    if (node.isFolder) {
      return length ? !node.children?.at(length - 1)?.isFolder : true;
    }

    return false;
  }

  /** Emit the submit event */
  onSubmit(): void {
    this.submit.emit();
  }

  /** Emit the cancel event */
  onCancel(): void {
    this.cancel.emit();
  }

  /** Emit the delete event with node delete data */
  onDelete(): void {
    this.delete.emit(this.node);
  }
}
