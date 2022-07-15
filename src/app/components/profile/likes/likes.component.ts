import { Component, HostListener, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-likes',
	templateUrl: './likes.component.html',
	styleUrls: ['./likes.component.less']
})
export class LikesComponent implements OnInit {
	posts: any;
	sortBy: string = 'newest';
	page: number = 0;
	nextPage: number = 1;

  	constructor(private postsApi: PostsService) { }

	ngOnInit(): void {
		this.sortBy = 'newest'
		this.page = 0
		this.nextPage = 1
		this.postsApi.GetLikedPosts(this.sortBy, this.page).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}

	@HostListener('window:scroll', ['$event'])
	onScroll() {
		if (Math.ceil(window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight * 0.8)) {
			if (this.page+1 == this.nextPage) {
				this.page += 1
				this.postsApi.GetLikedPosts(this.sortBy, this.page).subscribe(
					res => {
						this.posts = this.posts.concat(res)
						this.nextPage += 1
					},
					err => console.log(`Error getting posts: ${err.error}`)
				)
			}
		}
	}

	getLikedPosts(ev: any): void {
		this.sortBy = ev.target.value;
		this.page = 0;
		this.nextPage = 1;
		this.postsApi.GetLikedPosts(this.sortBy, this.page).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
