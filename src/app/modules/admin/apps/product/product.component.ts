import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'product',
    template: '<router-outlet></router-outlet>',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
