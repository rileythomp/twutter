import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-userposts',
	templateUrl: './userposts.component.html',
	styleUrls: ['./userposts.component.less']
})
export class UserpostsComponent implements OnInit {
	username: string;
	posts: any[];
	sortBy: string = 'newest'
	page: number = 0;
	nextPage: number = 1;

  	constructor(private route: ActivatedRoute, private postsApi: PostsService) { }

  	ngOnInit(): void {
		this.page = 0;
		this.nextPage = 1;
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.postsApi.GetPostsByUsername(this.username, this.sortBy, this.page).subscribe(
				res => this.posts = res,
				err => console.log(`Error getting posts: ${err.error}`)
			)
		})
	}

	@HostListener('window:scroll', ['$event'])
	onScroll() {
		if (Math.ceil(window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight * 0.8)) {
			if (this.page+1 == this.nextPage) {
				this.page += 1
				this.postsApi.GetPostsByUsername(this.username, this.sortBy, this.page).subscribe(
					res => {
						this.posts = this.posts.concat(res)
						this.nextPage += 1
					},
					err => console.log(`Error getting posts: ${err.error}`)
				)
			}
		}
	}

	getPosts(ev: any): void {
		this.sortBy = ev.target.value
		this.page = 0
		this.nextPage = 1
		this.postsApi.GetPostsByUsername(this.username, this.sortBy, this.page).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
