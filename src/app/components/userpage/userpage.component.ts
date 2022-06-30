import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { PostsService } from 'src/app/services/posts.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common'

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
	posts: any[];

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
					this.posts = []
					for (let post of res) {
						let published = new Date(post.created_at * 1000)
						const datepipe: DatePipe = new DatePipe('en-US')
						post.published = datepipe.transform(published, 'MMMM dd yyyy')
						this.posts.push(post)
					}
				},
				err => {
					console.log(`Error getting posts: ${err.error}`)
				}
			)

		});
	}

}
