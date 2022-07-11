import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'app-usersearch',
	templateUrl: './usersearch.component.html',
	styleUrls: ['./usersearch.component.less']
})
export class UsersearchComponent implements OnInit {
	searchText: string
	searchResults: any;
	showResults: boolean = false;

	constructor(private usersApi: UserService) {}

	ngOnInit(): void {}

	hideSearchResults(): void {
		this.showResults = false
		this.searchText = ''
	}

	searchUser(): void {
		if (this.searchText == '') {
			return this.hideSearchResults()
		}
		this.usersApi.SearchUsers(this.searchText).subscribe(
			res => {
				this.searchResults = res
				this.showResults = true;
			},
			err => console.log(`Error searching users: ${err.error}`)
		)	
	}
}
