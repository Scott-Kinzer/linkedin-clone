import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @ViewChild('form')
  form!: NgForm;
  constructor(
    public modalController: ModalController,
    public postService: PostService
  ) {}

  onPost({ body }: { body: string }) {
    if (this.form.invalid) {
      return;
    }

    this.postService.createPost(body).subscribe((data) => {
      this.modalController.dismiss(data);
    });
  }

  onDismiss() {
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
