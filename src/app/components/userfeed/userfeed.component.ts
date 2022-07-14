import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-userfeed',
	templateUrl: './userfeed.component.html',
	styleUrls: ['./userfeed.component.less']
})
export class UserfeedComponent implements OnInit {
	posts: any[];
	sortBy: string;

	constructor(private postsApi: PostsService, private router: Router) { }

	removeElementsByClass(className){
		const elements = document.getElementsByClassName(className);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}

	ngOnInit(): void {
		this.sortBy = 'popular'
		this.postsApi.GetUserFeed(this.sortBy).subscribe(
			res => this.posts = res,
			err => {
				if (err.status == 401) {
					this.removeElementsByClass('following')
					this.sortBy += '-all'
					this.postsApi.GetAllFeed(this.sortBy).subscribe(
						res => this.posts = res,
						err => alert(`Error getting posts: ${err.error}`)
					)
				} else {
					alert(`Error getting posts: ${err.error}`)	
				}
			}
		)
	}

	getPosts(ev: any) {
		this.sortBy = ev.target.value
		this.postsApi.GetUserFeed(this.sortBy).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
