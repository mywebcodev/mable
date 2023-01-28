import { Injectable } from '@angular/core';
import { faker } from '@faker-js/faker';
import { Observable, of } from 'rxjs';

import { NodeModel } from '../models/node.model';

@Injectable()
export class NodeService {

  constructor() { }

  getNode(): Observable<NodeModel> {
    const node = this.createNode('folder', 3);
    const childNode = this.createNode('folder', 3, node);
    childNode.children?.push(this.createNode('folder', 3, childNode))
    node.children?.push(childNode);

    return of(node);
  }

  private createNode(type: 'folder' | 'file', childrenCount: number, parent?: NodeModel): NodeModel {
    const node: NodeModel = {
      id: faker.database.mongodbObjectId(),
      type: type,
      parent: parent,
      children: []
    };

    if (node.type !== 'folder') {
      node.name = faker.system.commonFileName();
      return node;
    }

    node.name = faker.system.fileType();

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
