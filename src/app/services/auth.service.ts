import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, LoginUserDTO } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endPointUrl = `${environment.API_URL}/api/auth`

  constructor(
    private http: HttpClient
  ) { }

  login(dto: LoginUserDTO) {
    return this.http.post<Auth>(`${this.endPointUrl}/login`, dto)
  }

  profile(token: string) {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.endPointUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        // 'Content-type': 'application/json'
      }
    })
  }
}
