import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
})
export class StartPostComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();

  constructor(public modalController: ModalController) {}

  async showModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'start-post-modal',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.create.emit(data);
  }

  ngOnInit() {}
}
