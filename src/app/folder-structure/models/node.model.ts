import { NodeType } from './node-type.enum';

export class NodeModel {
  id!: string;
  type!: NodeType;
  parent?: NodeModel;
  name?: string;
  children?: NodeModel[];

  get isFolder(): boolean {
    return this.type === NodeType.Folder;
  }
}
