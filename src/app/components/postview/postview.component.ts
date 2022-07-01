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

	ngOnInit(): void {}

  	likePost(postId: string, change: number): void {
		this.postsApi.LikePost(postId, change).subscribe(
			res => {
				for (let post of this.posts) {
					if (post.post_id == postId) {
						post.likes = res
						break
					}
				}
			},
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
