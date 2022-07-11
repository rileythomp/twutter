import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.less']
})
export class UserpageComponent implements OnInit {
	imgUrl: string;
	bio: string;
	email: string;
	username: string;
	phone: string;
	showFollow: boolean = false;
	following: boolean = false;
	user: any;

	showFollows: boolean = false;
	followType: string;

	constructor(private route: ActivatedRoute, private users: UserService) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.users.GetUserByName(this.username).subscribe(
				res => {
					this.user = res['user']
					this.showFollow = res['show_follow']
					this.following = res['following']
					let num = this.user.phone_number
					this.phone = num.slice(0, 3) + '-' + num.slice(3, 6) + '-' + num.slice(6)
					this.email = this.user.email
					this.bio = this.user.bio
					this.imgUrl = this.user.imgUrl
				},
				err => console.log(`Error getting user: ${err.error}`)
			)
		});
	}

	followUser(): void {
		if (!this.following) {
			this.users.FollowUser(this.username).subscribe(
				res => {
					this.following = true
					this.user.followers += 1
				},
				err => alert(`Error following user: ${err.error}`)
			)
		} else {
			this.users.UnfollowUser(this.username).subscribe(
				res => {
					this.following = false
					this.user.followers -= 1
				},
				err => alert(`Error unfollowing user: ${err.error}`)
			)
		}
	}

	toggleFollowList(show: boolean, followType: string) {
		document.getElementById('overlay').style.display = show ? 'block' : 'none';
		this.showFollows = show
		this.followType = followType
	}
}
