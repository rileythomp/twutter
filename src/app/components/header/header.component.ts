import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
	constructor(private router: Router) { }

	ngOnInit(): void {}

	logoutUser() {
		document.cookie = `access_token=; max-age=0; SameSite=None; Secure`
		this.router.navigateByUrl('login')
	}
}
