import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { PostviewComponent } from '../../postview/postview.component';
import { ViewChild } from '@angular/core';

@Component({
	selector: 'app-likes',
	templateUrl: './likes.component.html',
	styleUrls: ['./likes.component.less']
})
export class LikesComponent implements OnInit {
	posts: any;
	sortBy: string = 'newest'

	@ViewChild(PostviewComponent) postsView: PostviewComponent;

  	constructor(private route: ActivatedRoute, private postsApi: PostsService) { }

	ngOnInit(): void {
		this.postsApi.GetLikedPosts(this.sortBy).subscribe(
			res =>this.postsView.formatPosts(res),
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}

	getLikedPosts(ev: any): void {
		this.sortBy = ev.target.value;
		this.postsApi.GetLikedPosts(this.sortBy).subscribe(
			res => this.postsView.formatPosts(res),
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}
}
