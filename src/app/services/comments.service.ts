import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetTextOpts, ApiAddr } from '../helpers';

@Injectable({
	providedIn: 'root'
})
export class CommentsService {

	constructor(private http: HttpClient) { }

	PublishComment(comment: string): Observable<any> {
		let httpOptions = GetTextOpts()
		return this.http.post<any>(
			`${ApiAddr}/comments/add`,
			comment, 
			httpOptions
		)
	}
}
