import { HttpHeaders } from "@angular/common/http";

export const JsonOpts = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	})
}
  
export const TextOpts = {
	headers: new HttpHeaders({
		'Content-Type': 'text/plain',
	})
}

export const ApiAddr = 'http://localhost:5000'

function GetCookie(cname) {
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
export { GetCookie }

function GetOpts(contentType, accept, token) {
	return {
		headers: new HttpHeaders({
			'Content-Type': contentType,
			'Accept': accept,
			'Access-Token': GetCookie(token)
		})
	}
}
export { GetOpts }

function GetJsonOpts() {
	return GetOpts('application/json', 'application/json', 'access_token')
}
export { GetJsonOpts }

function GetTextOpts() {
	return GetOpts('text/plain', 'text/plain', 'access_token')
}
export { GetTextOpts }

function GetImgOpts() {
	return {
		headers: new HttpHeaders({
			'Accept': 'text/plain ',
			'Access-Token': GetCookie('access_token')
		})
	}
}
export { GetImgOpts }