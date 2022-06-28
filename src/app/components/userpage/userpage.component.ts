import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.less']
})
export class UserpageComponent implements OnInit {
	username: string;
	imgUrl: string;
	bio: string;
	email: string;

	constructor(private route: ActivatedRoute, private users: UserService) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];

			// In a real app: dispatch action to load the details here.
			this.users.GetUserByName(this.username).subscribe(
				user => {
					this.email = user.email
					this.bio = user.bio
					this.imgUrl = user.imgUrl
				},
				err => {
				}
			)
		});
	}

}
