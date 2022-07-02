import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { JsonOpts, ApiAddr, GetJsonOpts, GetOpts } from 'src/app/helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }

	AddUser(user): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/add`,
			user,
			JsonOpts,
		)
	}

	GetUserByName(username: string): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.get<any>(
			`${ApiAddr}/user/${username}`,
			httpOptions
		)
	}

	GetUser(): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.get<any>(
			`${ApiAddr}/user`,
			httpOptions
		)
	}

	DeleteUser(): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.delete<any>(
			`${ApiAddr}/user/delete`,
			httpOptions
		)	
	}

	UpdateUser(user): Observable<any> {
		let httpOptions = GetJsonOpts()
		return this.http.put<any>(
			`${ApiAddr}/user/update`,
			user,
			httpOptions
		)
	}

	ChangePicture(formData: any): Observable<any> {
		let httpOptions = GetOpts('multipart/form-data', 'text/plain', 'access_token')
		return this.http.put<any>(
			`${ApiAddr}/user/picture`,
			formData,
			httpOptions
		)
	}
}
