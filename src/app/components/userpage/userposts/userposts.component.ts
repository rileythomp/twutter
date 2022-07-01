import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostsService } from 'src/app/services/posts.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-userposts',
	templateUrl: './userposts.component.html',
	styleUrls: ['./userposts.component.less']
})
export class UserpostsComponent implements OnInit {
	username: string;
	posts: any[];
	sortBy: string;

  	constructor(private route: ActivatedRoute, private postsApi: PostsService) { }

  	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.postsApi.GetPostsByUsername(this.username, 'newest').subscribe(
				res => this.formatPosts(res),
				err => console.log(`Error getting posts: ${err.error}`)
			)
		})
	}

	likePost(postId: string, change: number): void {
		this.postsApi.LikePost(postId, change).subscribe(
			res => this.ngOnInit(),
			err => alert(`Error liking post: ${err.error}`)
		)
	}

	getPosts(ev: any): void {
		this.postsApi.GetPostsByUsername(this.username, ev.target.value).subscribe(
			res => this.formatPosts(res),
			err => console.log(`Error getting posts: ${err.error}`)
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
