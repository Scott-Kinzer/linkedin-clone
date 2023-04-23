import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './popover/popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() imagePath: string = '';

  constructor(public popoverController: PopoverController) {}

  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: e,
      showBackdrop: false,
      cssClass: 'profile-modal',
      componentProps: {
        image: this.imagePath,
        lastName: this.lastName,
        firstName: this.firstName,
      },
    });

    await popover.present();
  }

  ngOnInit() {}
}
