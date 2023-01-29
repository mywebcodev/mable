import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-node-tree-container',
  templateUrl: './node-tree-container.component.html',
  styleUrls: ['./node-tree-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NodeTreeContainerComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  node$ = this.nodeService.getNode().pipe(takeUntil(this.ngUnsubscribe));

  constructor(private nodeService: NodeService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
}
