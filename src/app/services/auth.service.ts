import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, LoginUserDTO } from '../models/user.model';
import { Auth } from '../models/auth.model';
import { tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPointUrl = `${environment.API_URL}/api/auth`

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(dto: LoginUserDTO) {
    return this.http.post<Auth>(`${this.endPointUrl}/login`, dto)
    .pipe(
      tap(response => this.tokenService.saveToken(response.access_token))
    )
  }

  logout() {
    this.tokenService.removeToken();
  }

  profile() {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.endPointUrl}/profile`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   // 'Content-type': 'application/json'
      // }
    })
  }
}
