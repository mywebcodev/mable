import { Component, Input } from '@angular/core';

import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent {
  private _node!: NodeModel;

  nodeType = NodeType;
  showAddNoteControl = false;

  @Input()
  get node(): NodeModel {
    return this._node;
  }
  set node(node: NodeModel) {
    this._node = node;
  }

  constructor(private nodeService: NodeService) {}

  canShowControls(node: NodeModel): boolean {
    const length = node.children?.length;

    if (node.isFolder) {
      return length ? !node.children?.at(length - 1)?.isFolder : true;
    }

    return false;
  }

  onCreate(type: NodeType, node: NodeModel) {
    const parent = node?.isFolder || !node?.parent ? node : node.parent;
    this.nodeService.createNode('test', type, node.isFolder ? node : parent);
  }

  onDelete(node: NodeModel) {
    this.nodeService.deleteNode(node);
  }

  onShowAddNoteControl() {
    this.showAddNoteControl = true;
  }
}
