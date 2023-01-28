export class NodeModel {
  id!: string;
  type!: 'folder' | 'file' | 'unset' | null;
  prev?: NodeModel;
  next?: NodeModel;
  name?: string;
  children?: NodeModel[];
}
