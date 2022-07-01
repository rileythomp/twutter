import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
	comments: any;
	
	constructor() { }

	ngOnInit(): void {
		// fetch comments
		this.comments = ['comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 comment1 ', 'hello', 'acbdefg']
	}

	postComment(): void {
		// post comment
	}
}
