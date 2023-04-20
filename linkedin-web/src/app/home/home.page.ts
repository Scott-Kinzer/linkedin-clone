import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderModule } from './header/header.module';
import { ProfileSummaryModule } from './profile-summary/profile-summary.module';
import { AdvertisingModule } from './advertising/advertising.module';
import { StartPostModule } from './start-post/start-post.module';
import { ModalModule } from './start-post/modal/modal.module';
import { AllPostsModule } from './all-posts/all-posts.module';
import { TabsModule } from './tabs/tabs.module';
import { UserService } from './service/user.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderModule,
    ProfileSummaryModule,
    CommonModule,
    AdvertisingModule,
    StartPostModule,
    ModalModule,
    AllPostsModule,
    TabsModule,
  ],
})
export class HomePage {
  userData = null;

  constructor(private userService: UserService, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.userService.getUserInfo().subscribe((data) => {
      this.userData = data;
    });
  }
}
