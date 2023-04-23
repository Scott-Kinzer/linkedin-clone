import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, PopoverController } from '@ionic/angular';
import { Token } from 'src/app/models/token.interface';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input() image = '';
  @Input() firstName = '';
  @Input() lastName = '';

  constructor(
    private router: Router,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  async hide() {
    await this.popoverController.dismiss();
  }

  async logOut() {
    localStorage.removeItem(Token.ACCESS_TOKEN);
    localStorage.removeItem(Token.REFRESH_TOKEN);

    await this.hide();

    this.router.navigate(['/auth']);
  }
}
