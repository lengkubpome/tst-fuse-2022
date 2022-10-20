import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'inventory-list',
    templateUrl: './inventory-list.component.html',
    styleUrls: ['./inventory-list.component.less'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class InventoryListComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
