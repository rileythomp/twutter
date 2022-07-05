import { Component, OnInit } from '@angular/core';
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

  	constructor(private route: ActivatedRoute, private postsApi: PostsService) { }

  	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];
			this.postsApi.GetPostsByUsername(this.username, this.sortBy).subscribe(
				res => this.posts = res,
				err => console.log(`Error getting posts: ${err.error}`)
			)
		})
	}

	getPosts(ev: any): void {
		this.sortBy = ev.target.value
		this.postsApi.GetPostsByUsername(this.username,this.sortBy).subscribe(
			res => this.posts = res,
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
