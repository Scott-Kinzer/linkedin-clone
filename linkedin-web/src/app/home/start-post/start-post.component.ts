import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() imagePath = '';
  @Input() lastName = '';
  @Input() firstName = '';

  constructor(public modalController: ModalController) {}

  async showModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'start-post-modal',
      componentProps: {
        image: this.imagePath,
        lastName: this.lastName,
        firstName: this.firstName,
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.create.emit(data);
  }

  ngOnInit() {}
}
