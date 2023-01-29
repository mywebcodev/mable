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
  private _root!: NodeModel;

  readonly nodeCreateType = NodeCreateType;
  readonly nodeType = NodeType;
  showAddNodeControl = false;

  @Input()
  get root(): NodeModel {
    return this._root;
  }
  set root(root: NodeModel) {
    this._root = root;
  }

  constructor(private nodeService: NodeService) {}

  onCreate(node: NodeModel) {
    this.nodeService.createTypedNode(
      node.name,
      node.type,
      this.root
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
