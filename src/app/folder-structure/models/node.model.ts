export class NodeModel {
  id!: string;
  type!: 'folder' | 'file' | 'unset' | null;
  parent?: NodeModel;
  name?: string;
  children?: NodeModel[];
}
