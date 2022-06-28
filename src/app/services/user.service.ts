import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class UserService {
  	private readonly jsonOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		})
	}

	private readonly ApiAddr = 'http://localhost:5000'

	constructor(private http: HttpClient) { }

	getCookie(cname) {
		let name = cname + "=";
		let decodedCookie = decodeURIComponent(document.cookie);
		let ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
		}
		return "";
	}

	optsWithToken() {
		return  {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Token': this.getCookie('access_token')
			})
		}
	}

	AddUser(user): Observable<any> {
		return this.http.post<any>(
			`${this.ApiAddr}/user/add`,
			user,
			this.jsonOptions,
		)
	}

	GetUser(): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.get<any>(
			`${this.ApiAddr}/user`,
			httpOptions
		)
	}

	DeleteUser(): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.delete<any>(
			`${this.ApiAddr}/user/delete`,
			httpOptions
		)	
	}

	UpdateUser(user): Observable<any> {
		let httpOptions = this.optsWithToken()
		return this.http.put<any>(
			`${this.ApiAddr}/user/update`,
			user,
			httpOptions
		)
	}

	ChangePicture(formData: any): Observable<any> {
		let httpOptions = {
			headers: new HttpHeaders({
				'Accept': 'text/plain',
				'Access-Token': this.getCookie('access_token')
			})
		}
		return this.http.put<any>(
			`${this.ApiAddr}/user/picture`,
			formData,
			httpOptions
		)
	}
}
