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

	searchText: string
	searchResults: any;
	showResults: boolean = false;

	constructor(private route: ActivatedRoute, private users: UserService) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.users.GetUserByName(this.username).subscribe(
				res => {
					let user = res['user']
					this.showFollow = res['show_follow']
					this.following = res['following']
					let num = user.phone_number
					this.phone = num.slice(0, 3) + '-' + num.slice(3, 6) + '-' + num.slice(6)
					this.email = user.email
					this.bio = user.bio
					this.imgUrl = user.imgUrl
				},
				err => console.log(`Error getting user: ${err.error}`)
			)
		});
	}

	followUser(): void {
		if (!this.following) {
			this.users.FollowUser(this.username).subscribe(
				res => this.following = true,
				err => alert(`Error following user: ${err.error}`)
			)
		} else {
			this.users.UnfollowUser(this.username).subscribe(
				res => this.following = false,
				err => alert(`Error unfollowing user: ${err.error}`)
			)
		}
	}

	hideSearchResults(): void {
		this.showResults = false
		this.searchText = ''
	}

	searchUser(): void {
		if (this.searchText == '') {
			return this.hideSearchResults()
		}
		this.users.SearchUsers(this.searchText).subscribe(
			res => {
				this.searchResults = res
				this.showResults = true;
			},
			err => console.log(`Error searching users: ${err.error}`)
		)	
	}
}
