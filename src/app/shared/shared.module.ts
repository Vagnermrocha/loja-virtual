import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DssButtonModule, DssFormFieldModule } from '@dss/components';
import { DssIconModule } from '@dss/components/icon';
import { DssListModule } from '@dss/components/list';
import { FormsModule } from '@angular/forms';

const DSS_COMPONENTS = [
  DssFormFieldModule,
  DssIconModule,
  DssListModule,
  DssButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, FormsModule, DSS_COMPONENTS ],
  exports: [DSS_COMPONENTS],
})
export class SharedModule {}
