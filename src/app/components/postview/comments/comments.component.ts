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

	@Input()
	postId: any;
	
	constructor(private commentsApi: CommentsService) { }

	ngOnInit(): void {
		this.commentsApi.GetPostComments(this.postId).subscribe(
			res => this.comments = res,
			err => alert(`Error getting comments: ${err.error}`)
		)
	}

	postComment(): void {
		let textArea = <HTMLTextAreaElement>document.getElementById('comment-text')
		let commentText =  textArea.value
		this.commentsApi.PublishComment(commentText, this.postId).subscribe(
			res => {
				textArea.value = ''
				this.ngOnInit()
			},
			err => alert(`Error posting comment: ${err.error}`)
		)
	}
}
