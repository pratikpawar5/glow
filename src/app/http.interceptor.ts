import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@services/token/token.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
    providedIn: 'root'
})

export class GlobalInterceptor implements HttpInterceptor {
    constructor(private token: TokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        let token = this.token.getToken();
        if (token) {
            authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken()) });
        }
        return next.handle(authReq)
    }
}