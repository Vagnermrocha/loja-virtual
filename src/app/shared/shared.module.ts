import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DssFormFieldModule } from '@dss/components';
import { DssIconModule } from '@dss/components/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
const DSS_COMPONENTS = [
  DssFormFieldModule,
  DssIconModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DSS_COMPONENTS,
    HttpClientModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    DSS_COMPONENTS,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,

  ],
})
export class SharedModule {}
