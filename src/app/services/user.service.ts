import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { JsonOpts, ApiAddr, GetJsonOpts, GetImgOpts } from 'src/app/helpers';

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

	UpdateUser(user): Observable<any> {
		return this.http.put<any>(
			`${ApiAddr}/user/update`,
			user,
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
}
