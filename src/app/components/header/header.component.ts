import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
	constructor(private users: UserService, private router: Router) { }

	ngOnInit(): void {}

	logoutUser() {
		document.cookie = `access_token=; max-age=0; SameSite=None; Secure`
	}

	homePage() {
		this.users.GetUser().subscribe(
			user => {
				this.router.navigateByUrl(user.username)
			},
			err => this.router.navigateByUrl('login')
		)
	}
}
