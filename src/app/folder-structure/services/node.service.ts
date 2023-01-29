import { Injectable, OnDestroy } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, Observable } from 'rxjs';

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

  getRootNode(): NodeModel {
    return this.rootNode$.value;
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

  createTypedNode(
    name: string,
    type: NodeType,
    parent: NodeModel
  ): NodeModel {
    return type === NodeType.Folder ? this.createFolder(name, parent) : this.createFile(name, parent);
  }

  createFolder(
    name: string,
    parent: NodeModel,
    nestedFoldersCount?: number,
    filesCount?: number
  ): NodeModel {
    const node = this.createNode(name, NodeType.Folder, parent);

    Array.from({ length: filesCount }).forEach(() => {
      this.createFile(faker.system.fileName(), node);
    });

    if (nestedFoldersCount) {
      nestedFoldersCount -= 1;
      this.createFolder(
        faker.system.fileType(),
        node,
        nestedFoldersCount,
        filesCount,
      );
    }

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
    node.parent = parent;
    node.children = [];
    node.name = name;

    if (parent?.isFolder) {
      parent.children.push(node);
    }
    return node;
  }
}
