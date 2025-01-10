import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../environments/environment';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL: string = environments.baseURL;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null> (null);
  private _authStatus = signal<AuthStatus>( AuthStatus.cheking );

  public currentUser = computed(() => this._currentUser() )
  public authStatus = computed(() => this._authStatus() )

  constructor() { 
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user: User, token: string): boolean{
    this._currentUser.set( user );
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);

    return true;
  }


  login( email: string, contrasenia: string ): Observable<boolean>{

    const url = `${this.baseURL}/api/v1/auth/login`;
    const body = { email, contrasenia };


    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map( ({user, token})  => this.setAuthentication(user, token)),

      catchError(err => throwError(() => err.error.message)
      )
      
    ) ;       
  }

  checkAuthStatus(): Observable<boolean>{
    const url = `${ this.baseURL }/api/v1/auth/check-status`;
    const token = localStorage.getItem('token');

    if( !token ) return of(false);

    const headers = new HttpHeaders()
    .set('Authorization',`Bearer ${ token }`)

    return this.http.get<CheckTokenResponse>(url, { headers })
    .pipe(
      map( ({user, token})  => this.setAuthentication(user, token)),

      catchError(() => {
        this._authStatus.set( AuthStatus.notAuthenticated );
        return of(false);
      }
      )
    )
  }

  logout(){
    localStorage.removeItem('token')
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated )
  }
}
