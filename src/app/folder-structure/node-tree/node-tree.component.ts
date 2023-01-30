import { Component, Input } from '@angular/core';

import { INodeCreateData } from '../models/i-node-create.data';
import { INodeDeleteData } from '../models/i-node-delete.data';
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
  parent: NodeModel;

  @Input()
  get root(): NodeModel {
    return this._root;
  }
  set root(root: NodeModel) {
    this._root = root;
  }

  constructor(private nodeService: NodeService) {}

  /**
   * Creates a new node with the specified data
   * @param data The data for the new node
   */
  onCreate(data: INodeCreateData): void {
    data.parent = this.root;
    this.nodeService.createTypedNode(data);
    this.showAddNodeControl = false;
  }

  /**
   * Shows the add node control
   */
  onShowAddNodeControl(): void {
    this.showAddNodeControl = true;
  }

  /**
   * Deletes a node with the specified data
   * @param data The data for the node to be deleted
   */
  onDelete(data: INodeDeleteData): void {
    this.nodeService.deleteNode(data);
  }

  /**
   * Cancels node creation
   */
  onCancel(): void {
    this.showAddNodeControl = false;
  }
}
