import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { JsonOpts, ApiAddr, GetJsonOpts, GetImgOpts, GetTextOpts } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }

	AddUser(
		username: string,
		password: string,
		email: string,
		phoneNum: string,
		isPublic: number
	): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/add`,
			{
				username: username,
				password: password,
				email: email,
				phone_number: phoneNum,
				is_public: isPublic
			},
			JsonOpts,
		)
	}

	GetUserByName(username: string): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/user/${username}`,
			GetJsonOpts()
		)
	}

	GetUser(): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/user`,
			GetJsonOpts()
		)
	}

	DeleteUser(): Observable<any> {
		return this.http.delete<any>(
			`${ApiAddr}/user/delete`,
			GetJsonOpts()
		)	
	}

	UpdateUser(
		username: string,
		email: string,
		phoneNum: string,
		bio: string,
		isPublic: number
	): Observable<any> {
		return this.http.put<any>(
			`${ApiAddr}/user/update`,
			{
				username: username,
				email: email,
				phone_number: phoneNum,
				bio: bio,
				is_public: isPublic
			},
			GetJsonOpts()
		)
	}

	ChangePicture(formData: any): Observable<any> {
		return this.http.put<any>(
			`${ApiAddr}/user/picture`,
			formData,
			GetImgOpts()
		)
	}

	SearchUsers(search: string): Observable<any> {
		return this.http.get<any>(
			`${ApiAddr}/user/search?search=${search}`,
			GetJsonOpts()
		)
	}

	FollowUser(username: string): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/follow`,
			username,
			GetTextOpts()
		)
	}

	UnfollowUser(username: string): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/unfollow`,
			username,
			GetTextOpts()
		)
	}
}
