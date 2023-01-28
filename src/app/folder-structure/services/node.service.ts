import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, Observable } from 'rxjs';

import { NodeModel } from '../models/node.model';

@Injectable()
export class NodeService {
  private rootNode$ = new BehaviorSubject(this.createFolder(3, null));

  constructor() {}

  getNode(): Observable<NodeModel> {
    return this.rootNode$.asObservable();
  }

  deleteNode(node: NodeModel): void {
    if (!node) {
      return;
    }

    if (!node.parent) {
      this.rootNode$.next(null);
      return;
    }

    const parent = node.parent;

    if (parent) {
      const index = parent.children?.findIndex((c) => c.id === node.id);
      if (!isNaN(index)) {
        parent.children?.splice(index, 1);
      }
    }
  }

  private createFolder(
    nestedFoldersCount: number,
    parent: NodeModel
  ): NodeModel {
    const node = this.createNode('folder', parent);

    Array.from({ length: 3 }).forEach(() => {
      node.children?.push(this.createNode('file', node));
    });

    if (nestedFoldersCount) {
      nestedFoldersCount -= 1;
      node.children.push(this.createFolder(nestedFoldersCount, node));
    }

    return node;
  }

  private createNode(type: 'folder' | 'file', parent: NodeModel): NodeModel {
    const node: NodeModel = new NodeModel();

    node.id = faker.database.mongodbObjectId();
    node.type = type;
    node.parent = parent;
    node.children = [];
    node.name =
      type === 'folder' ? faker.system.fileType() : faker.system.fileName();

    return node;
  }
}
