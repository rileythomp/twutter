import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.less']
})
export class UserpageComponent implements OnInit {
	username: string;
	imgUrl: string;
	bio: string;
	email: string;
	posts: any;

	constructor(private route: ActivatedRoute, private users: UserService, private postsApi: PostsService) { }

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.username = params['username'];

			this.users.GetUserByName(this.username).subscribe(
				user => {
					this.email = user.email
					this.bio = user.bio
					this.imgUrl = user.imgUrl
				},
				err => {
				}
			)

			this.postsApi.GetPostsByUsername(this.username).subscribe(
				res => {
					this.posts = res
				},
				err => {
					alert(`Error getting posts: ${err.error}`)
				}
			)

		});
	}

}
