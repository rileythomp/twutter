import { Component, OnInit, HostListener } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.less']
})
export class PostsComponent implements OnInit {
	posts: any;
	isPrivate: boolean;
	sortBy: string = 'newest'
	page: number = 0;
	nextPage: number = 1;

	constructor(private postsApi: PostsService) { }

	ngOnInit(): void {
		this.isPrivate = true;
		this.page = 0
		this.nextPage = 1
		this.postsApi.GetPosts(this.sortBy, this.page).subscribe(
			res => {
				this.posts = res
				this.formatDates()
			},
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}

	@HostListener('window:scroll', ['$event'])
	onScroll() {
		if (Math.ceil(window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight * 0.8)) {
			if (this.page+1 == this.nextPage) {
				this.page += 1
				this.postsApi.GetPosts(this.sortBy, this.page).subscribe(
					res => {
						this.posts = this.posts.concat(res)
						this.nextPage += 1
					},
					err => console.log(`Error getting posts: ${err.error}`)
				)
			}
		}
	}

	postImage(): void {
		var formData = new FormData();

		let file = (<HTMLInputElement>document.getElementById('image-post-upload')).files[0];
		if (file == undefined || file == null) {
			alert('Could not find image')
			return
		}
		formData.append('file', file);

		let isPublic =  (<HTMLInputElement>document.getElementById('private-post')).checked ? '0' : '1'
		formData.append('is_public', isPublic)

		this.postsApi.PostPicture(formData).subscribe(
			res => {
				this.ngOnInit()
				this.imageUploadModal(false)
			}, 
			err => alert(`Error posting image: ${err.error}`)
		)
	}

	imageUploadModal(show: boolean): void {
		document.getElementById('overlay').style.display = show ? 'block' : 'none';
		document.getElementById('image-modal').style.display = show ? 'block': 'none';
	}

	publishPost(): void {
		let textArea = <HTMLTextAreaElement>document.getElementById('newpost')
		let postText =  textArea.value
		let isPublic =  (<HTMLInputElement>document.getElementById('private-post')).checked ? 0 : 1
		let newPost = {
			post_text: postText,
			is_public: isPublic
		}
		this.postsApi.PublishPost(newPost).subscribe(
			res => {
				this.ngOnInit()
				textArea.value = ''
			},
			err => alert(`Error publishing post: ${err.error}`)
		)
	}

	deletePost(postId: string): void {
		let del = confirm('Are you sure you want to delete this post? This action is irreversible');
		if (del) {
			this.postsApi.DeletePost(postId).subscribe(
				res => this.ngOnInit(),
				err => alert(`Error deleting post: ${err.error}`)
			)
		}
	}

	editPost(ev: any, postId: string): void {
		let post = document.getElementById(postId)
		post.style.display = 'none';
		let postEdit = document.getElementById(postId + '-edit')
		postEdit.style.display = 'block';
		postEdit.innerHTML = post.innerHTML
		ev.target.style.display = 'none';
		let postUpdate = document.getElementById(postId + '-update')
		postUpdate.style.display = 'inline';
	}

	updatePost(postId: string): void {
		let postText =  (<HTMLTextAreaElement>document.getElementById(postId + '-edit')).value
		let newPost = {
			post_id: postId,
			post_text: postText
		}
		this.postsApi.UpdatePost(newPost).subscribe(
			res => this.ngOnInit(),
			err => alert(`Error editing post: ${err.error}`)
		)
	}

	changePostPrivacy(ev: any, postId: string): void {
		let isPublic = !ev.target.checked
		let sure = confirm(`Are you sure you want to make this post ${isPublic ? 'public': 'private'}?`)
		if (!sure) { return }
		let newPost = {
			post_id: postId,
			is_public: isPublic ? 1 : 0
		}
		this.postsApi.ChangePostPrivacy(newPost).subscribe(
			res => this.ngOnInit(), 
			err => alert(`Error changing post privacy: ${err.error}`)
		)
	}

	getPosts(ev: any): void {
		this.sortBy = ev.target.value
		this.page = 0
		this.nextPage = 1
		this.postsApi.GetPosts(this.sortBy, this.page).subscribe(
			res => {
				this.posts = res
				this.formatDates()
			},
			err => console.log(`Error getting posts: ${err.error}`)
		)
	}

	formatDates(): void {
		this.posts.forEach((post, i) => {
			let published = new Date(post.created_at * 1000)
			const datepipe: DatePipe = new DatePipe('en-US')
			this.posts[i].published = datepipe.transform(published, 'MMMM dd yyyy')
		})
	}

	togglePostComments(postId: string) {
		for (let i = 0; i < this.posts.length; i++) {
			if (this.posts[i].post_id == postId) {
				this.posts[i].showComments = !this.posts[i].showComments
				break
			}
		}
	}

	setCommentCount(count, postId) {
		for (let i = 0; i < this.posts.length; i++) {
			if (this.posts[i].post_id == postId) {
				this.posts[i].comments = count
				break
			}
		}
	}

	likePost(change: number, postId: string): void {
		this.postsApi.LikePost(postId, change).subscribe(
			res => {
				for (let i = 0; i < this.posts.length; i++) {
					if (this.posts[i].post_id == postId) {
						this.posts[i].liked = change == 1 && res > this.posts[i].likes
						this.posts[i].disliked = change == -1 && res < this.posts[i].likes
						this.posts[i].likes = res
						break
					}
				}
			},
			err => alert(`Error liking post: ${err.error}`)
		)
	}
}
