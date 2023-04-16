import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AdvertisingComponent } from './advertising.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [AdvertisingComponent],
  exports: [AdvertisingComponent],
})
export class AdvertisingModule {}
