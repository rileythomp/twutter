import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-postview',
	templateUrl: './postview.component.html',
	styleUrls: ['./postview.component.less']
})
export class PostviewComponent implements OnInit {
	@Input()
	posts: any;

	constructor() { }

	ngOnInit(): void {}
}
