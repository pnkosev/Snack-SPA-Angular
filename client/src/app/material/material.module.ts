import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
  ],
  exports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
  ]
})
export class MaterialModule { }
