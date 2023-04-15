import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { IonicModule } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [HeaderComponent, PopoverComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
