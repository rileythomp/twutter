import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { JsonOpts, ApiAddr } from './defaults';
import { getCookie } from 'src/app/helpers'


@Injectable({
  providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient) { }

	optsWithToken() {
		return  {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': getCookie('access_token')
			})
		}
	}

	AddUser(user): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/add`,
			user,
			JsonOpts,
		)
	}

	GetUserByName(username: string): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.get<any>(
			`${ApiAddr}/user/${username}`,
			httpOptions
		)
	}

	GetUser(): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.get<any>(
			`${ApiAddr}/user`,
			httpOptions
		)
	}

	DeleteUser(): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.delete<any>(
			`${ApiAddr}/user/delete`,
			httpOptions
		)	
	}

	UpdateUser(user): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.put<any>(
			`${ApiAddr}/user/update`,
			user,
			httpOptions
		)
	}

	ChangePicture(formData: any): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Accept': 'text/plain',
				'Access-Token': getCookie('access_token')
			})
		}
		return this.http.put<any>(
			`${ApiAddr}/user/picture`,
			formData,
			httpOptions
		)
	}
}
