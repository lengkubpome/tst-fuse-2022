import {
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectionStrategy,
} from '@angular/core';

@Component({
    selector: 'inventory',
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InventoryComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
