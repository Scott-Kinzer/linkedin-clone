import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import { ProfileSummaryModule } from './profile-summary/profile-summary.module';
import { AdvertisingModule } from './advertising/advertising.module';
import { StartPostModule } from './start-post/start-post.module';
import { ModalModule } from './start-post/modal/modal.module';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    HeaderModule,
    ProfileSummaryModule,
    AdvertisingModule,
    StartPostModule,
    ModalModule,
  ],
})
export class HomePage {
  constructor() {}
}
