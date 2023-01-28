import { Component, Input } from '@angular/core';

import { NodeModel } from '../models/node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  private _node!: NodeModel;

  @Input()
  get node(): NodeModel {
    return this._node;
  }
  set node(node: NodeModel) {
    this._node = node;
  }
}
