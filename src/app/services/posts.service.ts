import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { GetJsonOpts, ApiAddr, GetTextOpts, GetImgOpts, JsonOpts } from 'src/app/helpers'
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PostsService {
	constructor(private http: HttpClient) { }

	PublishPost(post: any): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/posts/add`,
			post,
			GetJsonOpts()
		)
	}

	PostPicture(formData: any): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/posts/add/image`,
			formData,
			GetImgOpts()
		)
	}

	GetPosts(sortBy: string, page: number): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/posts?sortby=${sortBy}}&page=${page}`,
			GetJsonOpts()
		)
	}

	GetLikedPosts(sortBy: string, page: number): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/posts/liked?sortby=${sortBy}&page=${page}`,
			GetJsonOpts()
		)
	}

	GetPostsByUsername(username: string, sortBy: string, page: number): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/posts/${username}?sortby=${sortBy}&page=${page}`,
			GetJsonOpts()
		)
	}

	GetUserFeed(sortBy: string, page: number): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/posts/feed?sortby=${sortBy}&page=${page}`,
			GetJsonOpts()
		)
	}

	GetAllFeed(sortBy: string, page: number): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/posts/feed/all?sortby=${sortBy}&page=${page}`,
			JsonOpts
		)
	}

	DeletePost(postId: string): Observable<any> {
		return this.http.delete(
			`${ApiAddr}/posts/${postId}`,
			GetJsonOpts()
		)
	}

	UpdatePost(post: any): Observable<any> {
		return this.http.put<any>(
			`${ApiAddr}/posts/${post.post_id}`,
			post,
			GetJsonOpts()
		)
	}

	ChangePostPrivacy(post: any): Observable<any> {
		return this.http.put<any>(
			`${ApiAddr}/posts/privacy/${post.post_id}`,
			post,
			GetJsonOpts()
		)	
	}

	LikePost(postId: string, change: number): Observable<number> {
		return this.http.put<any>(
			`${ApiAddr}/posts/like/${postId}`,
			change,
			GetTextOpts()
		)
	}
}
