import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';

import { NodeModel } from '../models/node.model';

@Injectable()
export class NodeService {
  constructor() {}

  getNode(): Observable<NodeModel> {
    const node = this.createNode('folder', 3);
    const childNode = this.createNode('folder', 3, node);
    childNode.children?.push(this.createNode('folder', 3, childNode));
    node.children?.push(childNode);

    return of(node);
  }

  deleteNode(node: NodeModel | null): void {
    if (!node) {
      return;
    }

    const parent = node.prev;

    if (!parent) {
      node = null;
      return;
    }

    const index = parent.children?.findIndex((c) => c.id === node.id);

    if (!isNaN(index)) {
      parent.next = null;
      parent.children?.splice(index, 1);
    }
  }

  private createNode(
    type: 'folder' | 'file',
    childrenCount: number,
    prev?: NodeModel
  ): NodeModel {
    const node: NodeModel = {
      id: faker.database.mongodbObjectId(),
      type: type,
      prev: prev,
      children: [],
    };

    if (node.type !== 'folder') {
      node.name = faker.system.fileName();
      return node;
    }

    node.name = faker.system.fileType();

    if (prev) {
      prev.next = node;
    }

    Array.from({ length: childrenCount }).forEach(() => {
      childrenCount -= 1;
      node.children?.push(this.createNode('file', childrenCount, node));
    });
    // while (nestedFoldersCount !== 0) {
    //   nestedFoldersCount -= 1;

    //   node.children?.push(this.createNode('folder', nestedFoldersCount, node));
    // }

    return node;
  }
}
