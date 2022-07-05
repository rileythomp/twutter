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
		return this.http.post<any>(
			`${ApiAddr}/comments/add`,
			{
				'comment': comment,
				'post_id': postId
			}, 
			GetJsonOpts()
		)
	}

	GetPostComments(postId: string): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/comments/${postId}`,
			GetOpts('text/plain', 'application/json', 'access_token')
		)
	}
}
