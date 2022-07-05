import { Component, OnInit, Output, Input, EventEmitter} from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
	comments: any;
	commentText: string;

	@Input() postId: any;

	@Output() setCommentCount = new EventEmitter<number>();

	constructor(private commentsApi: CommentsService) { }

	ngOnInit(): void {
		this.commentText = ''
		this.commentsApi.GetPostComments(this.postId).subscribe(
			res => {
				this.comments = res
				this.setCommentCount.next(this.comments.length)
			},
			err => alert(`Error getting comments: ${err.error}`)
		)
	}

	postComment(): void {
		this.commentsApi.PublishComment(this.commentText, this.postId).subscribe(
			res => this.ngOnInit(),
			err => alert(`Error posting comment: ${err.error}`)
		)
	}
}
