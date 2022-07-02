import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Input } from '@angular/core';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
	comments: any;
	commentText: string;

	@Input() postId: any;

	constructor(private commentsApi: CommentsService) { }

	ngOnInit(): void {
		this.commentsApi.GetPostComments(this.postId).subscribe(
			res => this.comments = res,
			err => alert(`Error getting comments: ${err.error}`)
		)
	}

	postComment(): void {
		this.commentsApi.PublishComment(this.commentText, this.postId).subscribe(
			res => {
				this.commentText = ''
				this.ngOnInit()
			},
			err => alert(`Error posting comment: ${err.error}`)
		)
	}
}
