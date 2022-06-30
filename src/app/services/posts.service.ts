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

	PublishPost(post: any): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
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

	DeletePost(postId: string): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.delete(
			`${ApiAddr}/posts/${postId}`,
			httpOptions
		)
	}

	UpdatePost(post: any): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.put<any>(
			`${ApiAddr}/posts/${post.post_id}`,
			post,
			httpOptions
		)
	}

	ChangePostPrivacy(post: any): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.put<any>(
			`${ApiAddr}/posts/privacy/${post.post_id}`,
			post,
			httpOptions
		)	
	}

	LikePost(postId: string): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.put<any>(
			`${ApiAddr}/posts/like/${postId}`,
			{},
			httpOptions
		)
	}
}
