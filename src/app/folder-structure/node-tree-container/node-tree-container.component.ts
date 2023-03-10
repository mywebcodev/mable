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

  /**
   * Initialize the component by getting the root node from the `NodeService`.
   */
  ngOnInit(): void {
    this.root$ = this.nodeService.getRootNode$().pipe(
      tap((n) => (this._root = n)),
      takeUntil(this.ngUnsubscribe)
    );
  }

  /**
   * Cancel subscriptions on component destruction.
   */
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }

  /**
   * Handle the creation of a new node.
   * create the new node as a child of the root node.
   * @param data - The data required to create the node.
   */
  onCreateNode(data: INodeCreateData): void {
    if (this._root) {
      data.parent = this._root;
    }

    this.nodeService.createTypedNode(data);
    this.onHideCreateNodeControl();
  }

  /**
   * Show the create node form.
   */
  onShowCreateNodeControl(): void {
    this.showCreateNodeControl = true;
  }

  /**
   * Hides the create node form.
   */
  onHideCreateNodeControl(): void {
    this.showCreateNodeControl = false;
  }
}
