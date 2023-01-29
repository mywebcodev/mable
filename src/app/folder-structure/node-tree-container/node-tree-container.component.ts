import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { NodeCreateType } from '../models/node-create-type.enum';
import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';
import { NodeTreeComponent } from '../node-tree/node-tree.component';
import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node-tree-container',
  templateUrl: './node-tree-container.component.html',
  styleUrls: ['./node-tree-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTreeContainerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private _root: NodeModel;
  readonly nodeCreateType = NodeCreateType;
  readonly nodeType = NodeType;
  showCreateNodeControl: boolean;
  root$: Observable<NodeModel>;

  @ViewChild(NodeTreeComponent, {static: false})
  tree: NodeTreeComponent;


  constructor(private nodeService: NodeService) {}
  ngOnInit(): void {
    this.root$ = this.nodeService.getRootNode().pipe(tap(n => this._root = n), takeUntil(this.ngUnsubscribe));
    this.nodeService.createRootFolder('root', 3, 3);

  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  onCreateFolder(node: NodeModel) {
    if(this._root) {
      this.nodeService.createNode(node.name, node.type, this._root);
    } else {
      this.createRootFolder();
    }
  }

  onShowCreateNodeControl() {
    this.showCreateNodeControl = true;
  }

  onHideCreateNodeControl() {
    this.showCreateNodeControl = false;
  }

  private createRootFolder() {
    this.nodeService.createRootFolder('root', 0, 0);
  }
}
