import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, IonicModule, HttpClientModule],
  exports: [HomePage],
})
export class HomeModule {}
