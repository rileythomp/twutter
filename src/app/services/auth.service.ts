import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonOpts, TextOpts, ApiAddr, GetOpts, GetTextOpts, GetJsonOpts } from 'src/app/helpers';
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private http: HttpClient) { }

	// User endpoints

	AuthenticateUser(user: any): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/user/authenticate`,
			user,
			JsonOpts
		)
	}

	SetNewPassword(newPassword: string): Observable<any> {
		return this.http.put<any>(
			`${ApiAddr}/user/setpassword`,
			newPassword,
			GetOpts('text/plain', 'application/json', 'password_token')
		)
	}

	// Codes endpoints

	// Unauthenticated codes endpoints

	ValidateCode(authCode: string, userContact: string, action: string, method: string): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/validate/${action}/${method}`,
			{
				'auth_code': authCode,
				'user_contact': userContact
			},
			JsonOpts
		)
	}

	CreateCode(userContact: string, action: string, method: string): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/create/${action}/${method}`,
			userContact,
			TextOpts
		)
	}

	// Authenticated codes endpoints

	ValidateAuthCode(authCode: string, userContact: string, action: string, method: string): Observable<any> {
		return this.http.post<any>(
			`${ApiAddr}/code/auth/validate/${action}/${method}`,
			{
				'auth_code': authCode,
				'user_contact': userContact
			},
			GetOpts('application/json', 'text/plain', 'access_token')
		)
	}

	CreateAuthCode(userContact: string, action: string, method: string) {
		return this.http.post<any>(
			`${ApiAddr}/code/auth/create/${action}/${method}`,
			userContact,
			GetTextOpts()
		)
	}
}
