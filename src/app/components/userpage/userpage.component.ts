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

	searchText: string
	searchResults: any;
	showResults: boolean = false;

	constructor(private route: ActivatedRoute, private users: UserService) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.users.GetUserByName(this.username).subscribe(
				user => {
					this.email = user.email
					this.bio = user.bio
					this.imgUrl = user.imgUrl
				},
				err => console.log(`Error getting user: ${err.error}`)
			)
		});
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
