import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { getCookie } from 'src/app/helpers'
import { Observable } from 'rxjs';
import { ApiAddr } from './defaults';

@Injectable({
	providedIn: 'root'
})
export class PostsService {
	constructor(private http: HttpClient) { }

	PublishPost(post: string): Observable<any> {
		let httpOptions =  {
			headers: new HttpHeaders({
				'Content-Type': 'text/plain',
				'Accept': 'application/json',
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.post<any>(
			`${ApiAddr}/posts/add`,
			post,
			httpOptions
		)
	}

	GetPosts(): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.get<any>(
			`${ApiAddr}/posts`,
			httpOptions
		)
	}

	GetPostsByUsername(username: string): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.get<any>(
			`${ApiAddr}/posts/${username}`,
			httpOptions
		)
	}
}
