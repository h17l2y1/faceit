import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {authToken, serverToken} from "../constants/for-development";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // let token = req.url.includes('/v1/') ? authToken : serverToken;
    //
    // token = serverToken;

    const authReq = req.clone({
      // headers: req.headers
        // .set('Authorization', `Bearer ${token}`)
        // .set('Content-Type', 'application/json'),
    })

    return next.handle(authReq).pipe(
      tap((event) => {
          if (event instanceof HttpResponse){
            // console.log('Server response')
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401){
              console.log('Unauthorized')
            }
            if (err.status == 404){
              console.log('cant find this on faceit')
            }
          }
        }
      )
    )
  }
}
