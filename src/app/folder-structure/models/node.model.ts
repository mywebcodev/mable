import { NodeType } from './node-type.enum';

export class NodeModel {
  id!: string;
  parentId: string;
  type!: NodeType;
  name?: string;
  children?: NodeModel[];

  get isFolder(): boolean {
    return this.type === NodeType.Folder;
  }
}
