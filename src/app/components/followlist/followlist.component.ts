import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-followlist',
	templateUrl: './followlist.component.html',
	styleUrls: ['./followlist.component.less']
})
export class FollowlistComponent implements OnInit {
	@Output() closeFollowList = new EventEmitter<string>();
	@Input() followType: string;
	@Input() username: string = '';

	followList: any[];

	constructor(private usersApi: UserService) { }

	ngOnInit(): void {
		if (this.followType == 'following') {
			this.usersApi.GetFollowing(this.username).subscribe(
				res => this.followList = res,
				err => {
					alert(`Error getting following list: ${err.error}`)
					this.closeFollow()
				}
			)
		} else if (this.followType == 'followers') {
			this.usersApi.GetFollowers(this.username).subscribe(
				res => this.followList = res,
				err => {
					alert(`Error getting followers: ${err.error}`)
					this.closeFollow()
				}
			)
		}
	}

	closeFollow(): void {
		this.closeFollowList.emit();
	}

}
