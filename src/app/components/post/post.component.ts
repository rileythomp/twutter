import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PostsService } from 'src/app/services/posts.service';
import { GetCookie } from 'src/app/helpers';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.less']
})
export class PostComponent implements OnInit {
	showComments: boolean = false;

	@Input() post: any;

	constructor(private postsApi: PostsService) { }

	ngOnInit(): void {
		this.formatDate()
	}

	setCommentCount(count) {
		this.post.comments = count
	}

	togglePostComments(): void {
		if (GetCookie('access_token') == '') {
			return alert('You must be logged in to view comments')
		}
		this.showComments = !this.showComments
	}

	likePost(change: number): void {
		if (GetCookie('access_token') == '') {
			return alert('You must be logged in to vote on posts')
		}
		this.postsApi.LikePost(this.post.post_id, change).subscribe(
			res => {
				this.post.liked = change == 1 && res > this.post.likes
				this.post.disliked = change == -1 && res < this.post.likes
				this.post.likes = res
			},
			err => alert(`Error liking post: ${err.error}`)
		)
	}

	formatDate(): void {
		let published = new Date(this.post.created_at * 1000)
		const datepipe: DatePipe = new DatePipe('en-US')
		this.post.published = datepipe.transform(published, 'MMMM dd yyyy')
	}
}
