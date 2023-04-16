import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('form')
  form!: NgForm;
  constructor(public modalController: ModalController) {}

  onPost() {
    if (this.form.invalid) {
      return;
    }
    this.modalController.dismiss();
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
