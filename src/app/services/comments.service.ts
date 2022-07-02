import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTextOpts, ApiAddr, GetOpts, GetJsonOpts } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class CommentsService {

	constructor(private http: HttpClient) { }

	PublishComment(comment: string, postId: string): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.post<any>(
			`${ApiAddr}/comments/add`,
			{
				'comment': comment,
				'post_id': postId
			}, 
			httpOptions
		)
	}

	GetPostComments(postId: string): Observable<any> {
		let httpOptions = GetOpts('text/plain', 'application/json', 'access_token')
		return this.http.get<any>(
			`${ApiAddr}/comments/${postId}`,
			httpOptions
		)
	}
}
