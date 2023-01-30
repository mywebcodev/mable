import { Injectable, OnDestroy } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, Observable } from 'rxjs';

import { INodeCreateData } from '../models/i-node-create.data';
import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';

@Injectable()
export class NodeService implements OnDestroy {
  private _rootNode$ = new BehaviorSubject(null);
  private _parentMap = new Map<string, NodeModel>();

  constructor() {}

  ngOnDestroy(): void {
    this._rootNode$.complete();
    this._parentMap.clear();
  }

  getRootNode$(): Observable<NodeModel> {
    return this._rootNode$.asObservable();
  }

  /**
   * Deletes the node
   */
  deleteNode(node: NodeModel): void {
    if (!node) {
      return;
    }

    const parent = this._parentMap.get(node.parentId);

    if (!parent) {
      this._rootNode$.next(null);
      return;
    }

    // removes deleted child from the parent children collection
    if (parent) {
      const index = parent.children?.findIndex((c) => c.id === node.id);
      if (!isNaN(index)) {
        parent.children?.splice(index, 1);
      }

      // removes deleted parent reference from the map
      if(node.isFolder) {
        this._parentMap.delete(node.id);
      }
    }
  }

   /**
   * Creates folder or file node
   */
  createTypedNode(data: INodeCreateData): NodeModel {
    return data.type === NodeType.Folder
      ? this.createFolder(data.name, data.parent)
      : this.createFile(data.name, data.parent);
  }

  private createFolder(name: string, parent: NodeModel): NodeModel {
    const node = this.createNode(name, NodeType.Folder, parent);
    this._parentMap.set(node.id, node);

    // if node can't have a parent then it is a root node
    if (parent == null) {
      this._rootNode$.next(node);
    }

    return node;
  }

  private createFile(name: string, parent: NodeModel): NodeModel {
    return this.createNode(name, NodeType.File, parent);
  }

  private createNode(
    name: string,
    type: NodeType,
    parent: NodeModel
  ): NodeModel {
    const node: NodeModel = new NodeModel();

    node.id = faker.database.mongodbObjectId();
    node.type = type;
    node.children = [];
    node.name = name;
    node.parentId = parent?.id;

    parent?.children.push(node);
    return node;
  }
}
