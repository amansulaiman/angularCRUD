import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private rootURL: string) { }
  getAll() {
    return this.http.get<User[]>(`${this.rootURL}api/user`);
}

getById(id: number) {
    return this.http.get(`${this.rootURL}api/user/${id}`);
}

register(user: User) {
    return this.http.post(`${this.rootURL}api/user/register`, user);
}

update(user: User) {
    return this.http.put(`${this.rootURL}api/user/${user.id}`, user);
}

delete(id: number) {
    return this.http.delete(`${this.rootURL}api/user/${id}`);
}
}
