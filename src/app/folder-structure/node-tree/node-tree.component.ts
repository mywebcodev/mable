import { Component, Input } from '@angular/core';

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

  nodeType = NodeType;
  showAddNodeControl = false;

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

  onCreate(name: string) {
    const parent =
      this.node?.isFolder || !this.node?.parent ? this.node : this.node.parent;
    this.nodeService.createNode(
      name,
      this.node.type,
      this.node.isFolder ? this.node : parent
    );
  }

  onDelete(node: NodeModel) {
    this.nodeService.deleteNode(node);
  }

  onShowAddNodeControl() {
    this.showAddNodeControl = true;
  }
}
