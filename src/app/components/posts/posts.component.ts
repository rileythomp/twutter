import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.less']
})
export class PostsComponent implements OnInit {
	posts: any

	constructor(private postsApi: PostsService) { }

	ngOnInit(): void {
		this.postsApi.GetPosts().subscribe(
			res => {
				this.posts = res
			},
			err => {
				alert(err.error)
			}
		)
	}

	publishPost(): void {
		let newPost = (<HTMLTextAreaElement>document.getElementById('newpost')).value
		this.postsApi.PublishPost(newPost).subscribe(
			res => {
				window.location.reload()
			},
			err => {
				alert(err.error)
			}
		)
	}

}
