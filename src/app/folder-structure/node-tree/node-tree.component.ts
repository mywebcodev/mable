import { Component, Input } from '@angular/core';

import { NodeCreateType } from '../models/node-create-type.enum';
import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss'],
})
export class NodeTreeComponent {
  private _node!: NodeModel;

  readonly nodeCreateType = NodeCreateType;
  readonly nodeType = NodeType;
  showAddNodeControl = false;

  @Input()
  get node(): NodeModel {
    return this._node;
  }
  set node(node: NodeModel) {
    this._node = node;
  }

  constructor(private nodeService: NodeService) {}

  onCreate(node: NodeModel) {
    const parent =
      this.node?.isFolder || !this.node?.parent ? this.node : this.node.parent;

    this.nodeService.createTypedNode(
      node.name,
      node.type,
      this.node.isFolder ? this.node : parent
    );

    this.showAddNodeControl = false;
  }

  onShowAddNodeControl() {
    this.showAddNodeControl = true;
  }

  onDelete(node: NodeModel) {
    this.nodeService.deleteNode(node);
  }

  onCancel() {
    this.showAddNodeControl = false;
  }
}
