import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-likes',
	templateUrl: './likes.component.html',
	styleUrls: ['./likes.component.less']
})
export class LikesComponent implements OnInit {
	sortBy: string = 'newest'
	posts: any;

  	constructor(private postsApi: PostsService) { }

	ngOnInit(): void {
		this.postsApi.GetLikedPosts(this.sortBy).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}

	getLikedPosts(ev: any): void {
		this.sortBy = ev.target.value;
		this.postsApi.GetLikedPosts(this.sortBy).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
