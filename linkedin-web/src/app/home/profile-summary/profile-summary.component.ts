import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
})
export class ProfileSummaryComponent implements OnInit {
  @Input() firstName: string = '';
  @Input() lastName: string = '';

  constructor() {}

  ngOnInit() {}
}
