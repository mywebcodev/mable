import { NodeType } from './node-type.enum';
import { NodeModel } from './node.model';

export interface INodeCreateData {
  type: NodeType;
  name: string;
  parent?: NodeModel;
}
