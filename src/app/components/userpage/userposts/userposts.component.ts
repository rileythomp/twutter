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

  	constructor(private route: ActivatedRoute, private postsApi: PostsService) { }

  	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.postsApi.GetPostsByUsername(this.username).subscribe(
				res => {
					this.posts = []
					for (let post of res) {
						let published = new Date(post.created_at * 1000)
						const datepipe: DatePipe = new DatePipe('en-US')
						post.published = datepipe.transform(published, 'MMMM dd yyyy')
						this.posts.push(post)
					}
				},
				err => console.log(`Error getting posts: ${err.error}`)
			)
		})
	}

	likePost(postId: string): void {
		this.postsApi.LikePost(postId).subscribe(
			res => this.ngOnInit(),
			err => alert(`Error liking post: ${err.error}`)
		)
	}
}
