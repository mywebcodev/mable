import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { NodeService } from '../services/node.service';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.scss']
})
export class StructureComponent implements OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  node$ = this.nodeService.getNode().pipe(takeUntil(this.ngUnsubscribe));

  constructor(private nodeService: NodeService) {
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
  }
}
