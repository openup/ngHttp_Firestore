/**
 * Materials Module, export all MAt Modules
 * @author Karim Somai
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule
  ], 
  exports : [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatPaginatorModule
  ]
})

export class MaterialsModule {
  public static forRoot() {
    return {
      ngModule: MaterialsModule
    }
  }
}