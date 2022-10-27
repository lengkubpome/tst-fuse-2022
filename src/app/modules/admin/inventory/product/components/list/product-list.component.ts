import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import {
    debounceTime,
    map,
    merge,
    Observable,
    of,
    Subject,
    switchMap,
    takeUntil,
} from 'rxjs';
import { IProduct, IProductOption } from '../../models/product.model';
import {
    ProductState,
    selectProductOptions,
    selectProducts,
} from '../../state';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDrawer } from '@angular/material/sidenav';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: fuseAnimations,
})
export class ProductListComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    products$: Observable<IProduct[]> = of([]);
    productOptions$: Observable<IProductOption[]> = of([]);

    drawerMode: 'side' | 'over';

    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedProduct: IProduct | null = null;
    selectedProductForm: UntypedFormGroup;
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private store: Store<ProductState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _formBuilder: UntypedFormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.products$ = this.store.select(selectProducts);
        this.productOptions$ = this.store.select(selectProductOptions);

        // Create the selected product form
        this.selectedProductForm = this._formBuilder.group({
            id: [''],
            name: ['', [Validators.required]],
            description: [''],
            cost: [''],
            basePrice: [''],
            taxPercent: [''],
            price: [''],
            weight: [''],
            thumbnail: [''],
            images: [[]],
            currentImageIndex: [0], // Image index that is currently being viewed
            active: [false],
        });

        // Subscribe to search input field value changes
        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                // switchMap((query) => {
                //     this.closeDetails();
                //     this.isLoading = true;
                //     return this._inventoryService.getProducts(
                //         0,
                //         10,
                //         'name',
                //         'asc',
                //         query
                //     );
                // }),
                map(() => {
                    this.isLoading = false;
                })
            )
            .subscribe();

        // Subscribe to media query change
        this._fuseMediaWatcherService
            .onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {
                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        if (this._sort && this._paginator) {
            // Set the initial sort
            this._sort.sort({
                id: 'name',
                start: 'asc',
                disableClear: true,
            });

            // Mark for check
            this._changeDetectorRef.markForCheck();

            // If the user changes the sort order...
            this._sort.sortChange
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(() => {
                    // Reset back to the first page
                    this._paginator.pageIndex = 0;

                    // Close the details
                    this.closeDetails();
                });

            // Get products if sort or page changes
            // merge(this._sort.sortChange, this._paginator.page)
            //     .pipe(
            //         switchMap(() => {
            //             this.closeDetails();
            //             this.isLoading = true;
            //             return this._inventoryService.getProducts(
            //                 this._paginator.pageIndex,
            //                 this._paginator.pageSize,
            //                 this._sort.active,
            //                 this._sort.direction
            //             );
            //         }),
            //         map(() => {
            //             this.isLoading = false;
            //         })
            //     )
            //     .subscribe();
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle product details
     *
     * @param product
     */
    toggleDetails(product: IProduct): void {
        // If the product is already selected...
        if (this.selectedProduct && this.selectedProduct.id === product.id) {
            // Close the details
            this.closeDetails();
            return;
        }

        // const confirmation = this._fuseConfirmationService.open({
        //     title: 'Delete product',
        //     message:
        //         'Are you sure you want to remove this product? This action cannot be undone!',
        //     actions: {
        //         confirm: {
        //             label: 'Delete',
        //         },
        //     },
        // });

        // Get the product by id
        //  this._inventoryService.getProductById(product)
        //      .subscribe((product) => {

        // Set the selected product
        this.selectedProduct = product;

        // Fill the form
        this.selectedProductForm.patchValue(product);

        // Mark for check
        this._changeDetectorRef.markForCheck();
        //  });
    }

    /**
     * Close the details
     */
    closeDetails(): void {
        this.selectedProduct = null;
    }

    /**
     * Cycle through images of selected product
     */
    cycleImages(forward: boolean = true): void {
        // Get the image count and current image index
        const count = this.selectedProductForm.get('images').value.length;
        const currentIndex =
            this.selectedProductForm.get('currentImageIndex').value;

        // Calculate the next and previous index
        const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
        const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;

        // If cycling forward...
        if (forward) {
            this.selectedProductForm
                .get('currentImageIndex')
                .setValue(nextIndex);
        }
        // If cycling backwards...
        else {
            this.selectedProductForm
                .get('currentImageIndex')
                .setValue(prevIndex);
        }
    }

    /**
     * Create product
     */
    createProduct(): void {
        // Create the product
        // this._inventoryService.createProduct().subscribe((newProduct) => {
        //     // Go to new product
        //     this.selectedProduct = newProduct;
        //     // Fill the form
        //     this.selectedProductForm.patchValue(newProduct);
        //     // Mark for check
        //     this._changeDetectorRef.markForCheck();
        // });

        // Go to the new task
        this._router.navigate(['new'], {
            relativeTo: this._activatedRoute,
        });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // this.matDrawer.close();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the selected product using the form data
     */
    updateSelectedProduct(): void {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();

        // Remove the currentImageIndex field
        delete product.currentImageIndex;

        // Update the product on the server
        // this._inventoryService
        //     .updateProduct(product.id, product)
        //     .subscribe(() => {
        //         // Show a success message
        //         this.showFlashMessage('success');
        //     });
    }

    /**
     * Delete the selected product using the form data
     */
    deleteSelectedProduct(): void {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title: 'Delete product',
            message:
                'Are you sure you want to remove this product? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete',
                },
            },
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            // If the confirm button pressed...
            if (result === 'confirmed') {
                // Get the product object
                const product = this.selectedProductForm.getRawValue();

                // Delete the product on the server
                // this._inventoryService
                //     .deleteProduct(product.id)
                //     .subscribe(() => {
                //         // Close the details
                //         this.closeDetails();
                //     });
            }
        });
    }

    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
