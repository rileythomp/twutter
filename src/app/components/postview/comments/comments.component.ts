import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
	comments: any;
	
	constructor(private commentsApi: CommentsService) { }

	ngOnInit(): void {
		// fetch comments

		this.comments = ['comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 ', 'hello', 'acbdefg']
	}

	postComment(): void {
		let textArea = <HTMLTextAreaElement>document.getElementById('comment-text')
		let commentText =  textArea.value
		this.commentsApi.PublishComment(commentText).subscribe(
			res => this.comments.push(commentText),
			err => alert(`Error posting comment: ${err.error}`)
		)
	}
}
