import { Injectable, OnDestroy } from '@angular/core';
import { faker } from '@faker-js/faker';
import { BehaviorSubject, Observable } from 'rxjs';

import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';

@Injectable()
export class NodeService implements OnDestroy {
  private rootNode$ = new BehaviorSubject(this.createFolder(3, 3, null));

  constructor() {}

  ngOnDestroy(): void {
    this.rootNode$.complete();
  }

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

  createNode(name: string, type: NodeType, parent: NodeModel): NodeModel {
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

  private createFolder(
    nestedFoldersCount: number,
    filesCount: number,
    parent: NodeModel
  ): NodeModel {
    const node = this.createNode(
      faker.system.fileType(),
      NodeType.Folder,
      parent
    );

    Array.from({ length: filesCount }).forEach(() => {
      this.createFile(node);
    });

    if (nestedFoldersCount) {
      nestedFoldersCount -= 1;
      this.createFolder(nestedFoldersCount, filesCount, node);
    }

    return node;
  }

  private createFile(parent: NodeModel): NodeModel {
    return this.createNode(faker.system.fileName(), NodeType.File, parent);
  }
}
