import { Component, OnInit, HostListener } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-userfeed',
	templateUrl: './userfeed.component.html',
	styleUrls: ['./userfeed.component.less']
})
export class UserfeedComponent implements OnInit {
	posts: any[];
	sortBy: string = 'popular';
	page: number = 0;
	nextPage: number = 1;

	constructor(private postsApi: PostsService, private router: Router) { }

	removeElementsByClass(className){
		const elements = document.getElementsByClassName(className);
		while(elements.length > 0){
			elements[0].parentNode.removeChild(elements[0]);
		}
	}

	ngOnInit(): void {	
		this.sortBy = 'popular'
		this.page = 0
		this.nextPage = 1
		this.postsApi.GetUserFeed(this.sortBy, this.page).subscribe(
			res => this.posts = res,
			err => {
				if (err.status == 401) {
					this.removeElementsByClass('following')
					this.sortBy += '-all'
					this.postsApi.GetAllFeed(this.sortBy, this.page).subscribe(
						res => this.posts = res,
						err => alert(`Error getting posts: ${err.error}`)
					)
				} else {
					alert(`Error getting posts: ${err.error}`)	
				}
			}
		)
	}

	@HostListener('window:scroll', ['$event'])
	onScroll() {
		if (Math.ceil(window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight * 0.8)) {
			if (this.page+1 == this.nextPage) {
				this.page += 1
				this.postsApi.GetUserFeed(this.sortBy, this.page).subscribe(
					res => {
						this.posts = this.posts.concat(res)
						this.nextPage += 1
					},
					err => console.log(`Error getting posts: ${err.error}`)
				)
			}
		}
	}

	getPosts(ev: any) {
		this.sortBy = ev.target.value
		this.page = 0
		this.nextPage = 1
		this.postsApi.GetUserFeed(this.sortBy, this.page).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
