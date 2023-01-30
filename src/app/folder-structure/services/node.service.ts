import { Injectable, OnDestroy } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, Observable } from 'rxjs';

import { INodeCreateData } from '../models/i-node-create.data';
import { INodeDeleteData } from '../models/i-node-delete.data';
import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';

@Injectable()
export class NodeService implements OnDestroy {
  private rootNode$ = new BehaviorSubject(null);

  constructor() {}

  ngOnDestroy(): void {
    this.rootNode$.complete();
  }

  getRootNode$(): Observable<NodeModel> {
    return this.rootNode$.asObservable();
  }

  deleteNode(data: INodeDeleteData): void {
    const node = data?.node;
    const parent = data?.parent;

    if (!data?.node) {
      return;
    }

    if (!parent) {
      this.rootNode$.next(null);
      return;
    }

    if (parent) {
      const index = parent.children?.findIndex((c) => c.id === node.id);
      if (!isNaN(index)) {
        parent.children?.splice(index, 1);
      }
    }
  }

  createTypedNode(data: INodeCreateData): NodeModel {
    return data.type === NodeType.Folder
      ? this.createFolder(data.name, data.parent)
      : this.createFile(data.name, data.parent);
  }

  private createFolder(name: string, parent: NodeModel): NodeModel {
    const node = this.createNode(name, NodeType.Folder, parent);
    if (parent == null) {
      this.rootNode$.next(node);
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

    if (parent?.isFolder) {
      parent.children.push(node);
    }
    return node;
  }

  createTestTree(
    name: string,
    parent: NodeModel,
    nestedFoldersCount?: number,
    filesCount?: number
  ): NodeModel {
    const node = this.createFolder(name, parent);

    Array.from({ length: filesCount }).forEach(() => {
      this.createFile(faker.system.fileName(), node);
    });

    if (nestedFoldersCount) {
      nestedFoldersCount -= 1;
      this.createTestTree(
        faker.system.fileType(),
        node,
        nestedFoldersCount,
        filesCount
      );
    }

    if (parent == null) {
      this.rootNode$.next(node);
    }

    return node;
  }
}
