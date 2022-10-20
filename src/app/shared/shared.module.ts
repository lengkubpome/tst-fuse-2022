import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './ui';

const MODULES = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
];

@NgModule({
    imports: [...MODULES],
    exports: [...MODULES],
})
export class SharedModule {}
