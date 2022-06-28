import { HttpHeaders } from '@angular/common/http'

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
