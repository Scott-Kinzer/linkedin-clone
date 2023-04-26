import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Observable, Subscription, map, switchMap, take, tap } from 'rxjs';
import { User } from 'src/app/home/models/User';
import {
  FriendConnectionStatus,
  ProfileService,
} from '../services/profile.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private router: ActivatedRoute
  ) {}
  user?: User;
  friendRequestStatus?: string;
  friendRequestStatusSubscription$?: Subscription;
  userSubscription$?: Subscription;

  ngOnInit() {
    this.friendRequestStatusSubscription$ = this.getFriendRequestStatus()
      .pipe(
        tap((friendRequestStatus: FriendConnectionStatus) => {
          this.friendRequestStatus = friendRequestStatus.status;
          this.userSubscription$ = this.getUser().subscribe((user: User) => {
            this.user = user;
            const imgPath = user.imagePath;
            this.user['imagePath'] = imgPath;
          });
        })
      )
      .subscribe();
  }

  getUser(): Observable<User> {
    return this.getUserIdFromUrl().pipe(
      switchMap((userId: string) => {
        return this.profileService.getConnectionUser(userId);
      })
    );
  }

  getFriendRequestStatus(): Observable<FriendConnectionStatus> {
    return this.getUserIdFromUrl().pipe(
      switchMap((userId: string) => {
        return this.profileService.getFriendsRequestStatus(userId.toString());
      })
    );
  }

  private getUserIdFromUrl(): Observable<string> {
    return this.router.url.pipe(
      map((urlSegment: UrlSegment[]) => {
        return urlSegment[1].path;
      })
    );
  }

  addUser() {
    this.friendRequestStatus = 'pending';
    return this.getUserIdFromUrl()
      .pipe(
        switchMap((userId: string) => {
          return this.profileService.addConnectionUser(userId);
        })
      )
      .pipe(take(1))
      .subscribe();
  }
}
