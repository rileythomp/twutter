import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.less']
})
export class PostsComponent implements OnInit {
	posts: any;
	isPrivate: boolean;

	constructor(private postsApi: PostsService, private router: Router) { }

	ngOnInit(): void {
		this.isPrivate = true;
		this.postsApi.GetPosts().subscribe(
			res => {
				this.posts = res
			},
			err => {
				console.log(`Error getting posts: ${err.error}`)
			}
		)
	}

	publishPost(): void {
		let postText =  (<HTMLTextAreaElement>document.getElementById('newpost')).value
		let isPublic =  (<HTMLInputElement>document.getElementById('private-post')).checked ? '0': '1'
		let newPost = {
			post: postText,
			is_public: isPublic
		}
		this.postsApi.PublishPost(newPost).subscribe(
			res => {
				this.ngOnInit()
			},
			err => {
				alert(`Error publishing post: ${err.error}`)
			}
		)
	}

}
