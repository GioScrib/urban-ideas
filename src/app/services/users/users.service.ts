import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../shared/user';

const API = "https://gorest.co.in/public/v2";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly httpClient: HttpClient;
  private authToken: string | null;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.authToken = localStorage.getItem('auth_token');
  }

  userList(params: {
    page?: number,
    per_page?: number,
    name?: string,
    email?: string
  }) {
    let p = new HttpParams();

    if(params['page']) {
      p.set('page', params['page']);
    }
    if(params['per_page']) {
      p.set('per_page', params['per_page']);
    }
    if(params['name']) {
      p.set('name', params['name']);
    }
    if(params['email']) {
      p.set('email', params['email']);
    }
    return this.httpClient.get<User[]>(API + '/users/', {params: p, observe: 'response'});
  }

  get(id: number) {
    return this.httpClient.get<User>(API + '/users/' + id);
  }
}
