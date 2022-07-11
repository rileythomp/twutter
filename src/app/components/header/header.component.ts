import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
	constructor(private router: Router, private postsApi: PostsService) { }

	ngOnInit(): void {}

	logoutUser() {
		document.cookie = `access_token=; max-age=0; SameSite=None; Secure`
	}
}
