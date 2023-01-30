import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';

import { INodeCreateData } from '../models/i-node-create.data';
import { NodeCreateType } from '../models/node-create-type.enum';
import { NodeType } from '../models/node-type.enum';
import { NodeModel } from '../models/node.model';
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

  constructor(private nodeService: NodeService) {}
  ngOnInit(): void {
    this.root$ = this.nodeService.getRootNode$().pipe(
      tap((n) => (this._root = n)),
      takeUntil(this.ngUnsubscribe)
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  onCreateNode(data: INodeCreateData) {
    if (!this._root) {
      this.nodeService.createTestTree(data.name, null, 3, 3);
    } else {
      data.parent = this._root;
      this.nodeService.createTypedNode(data);
    }

    this.onHideCreateNodeControl();
  }

  onShowCreateNodeControl() {
    this.showCreateNodeControl = true;
  }

  onHideCreateNodeControl() {
    this.showCreateNodeControl = false;
  }
}
