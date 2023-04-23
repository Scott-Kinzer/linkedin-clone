import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
})
export class ProfileSummaryComponent implements OnInit {
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() imagePath: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {}

  onFileSelect(event: Event) {
    if (!event.target) return;

    const target = event.target as HTMLInputElement;

    if (!target.files) return;

    const file = target.files[0];

    if (file) {
      // Validate file type
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only PNG, JPEG, and JPG images are allowed');
        return;
      }

      // Validate file size
      const maxSizeInBytes = 3 * 1024 * 1024; // 3MB
      if (file.size > maxSizeInBytes) {
        alert('File size should not exceed 3MB');
        return;
      }

      const formData = new FormData();

      formData.append('file', file);

      const upload$ = this.userService.imageUpload(formData);

      upload$.subscribe(() => {
        this.userService.fetchUserInfo();
      });
    }
  }
}
