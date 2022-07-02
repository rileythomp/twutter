import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GetJsonOpts, ApiAddr, GetTextOpts } from 'src/app/helpers'
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostsService {
	constructor(private http: HttpClient) { }

	PublishPost(post: any): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.post<any>(
			`${ApiAddr}/posts/add`,
			post,
			httpOptions
		)
	}

	GetLikedPosts(sortBy: string): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.get<any>(
			`${ApiAddr}/posts/liked?sortby=${sortBy}`,
			httpOptions
		)
	}

	GetPosts(sortBy: string): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.get<any>(
			`${ApiAddr}/posts?sortby=${sortBy}`,
			httpOptions
		)
	}

	GetPostsByUsername(username: string, sortBy: string): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.get<any>(
			`${ApiAddr}/posts/${username}?sortby=${sortBy}`,
			httpOptions
		)
	}

	DeletePost(postId: string): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.delete(
			`${ApiAddr}/posts/${postId}`,
			httpOptions
		)
	}

	UpdatePost(post: any): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.put<any>(
			`${ApiAddr}/posts/${post.post_id}`,
			post,
			httpOptions
		)
	}

	ChangePostPrivacy(post: any): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.put<any>(
			`${ApiAddr}/posts/privacy/${post.post_id}`,
			post,
			httpOptions
		)	
	}

	LikePost(postId: string, change: number): Observable<number> {
		let httpOptions = GetTextOpts()
		return this.http.put<any>(
			`${ApiAddr}/posts/like/${postId}`,
			change,
			httpOptions
		)
	}
}
