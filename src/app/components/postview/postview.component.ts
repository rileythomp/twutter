import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-postview',
	templateUrl: './postview.component.html',
	styleUrls: ['./postview.component.less']
})
export class PostviewComponent implements OnInit {
  posts: any;
  sortBy: string = 'newest'
  
  constructor(private postsApi: PostsService) { }

	ngOnInit(): void {
		this.postsApi.GetPosts(this.sortBy).subscribe(
			res => this.formatPosts(res),
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}

  	likePost(postId: string, change: number): void {
		this.postsApi.LikePost(postId, change).subscribe(
			res => this.ngOnInit(),
			err => alert(`Error liking post: ${err.error}`)
		)
	}

	formatPosts(res): void {
		this.posts = []
		for (let post of res) {
			let published = new Date(post.created_at * 1000)
			const datepipe: DatePipe = new DatePipe('en-US')
			post.published = datepipe.transform(published, 'MMMM dd yyyy')
			this.posts.push(post)
		}
	}

}
