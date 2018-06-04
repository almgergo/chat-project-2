import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    _userId: number;

    get userId(): number {
        if (this._userId === null || this._userId === undefined) {
            this.registerUser();
        }
        return this._userId;
    }

    set userId(uid: number) {
        this._userId = uid;
    }

    constructor(private http: HttpClient) { }

    registerUser() {
        this.http.get<number>('/api/user/register').subscribe(data => {
            this.userId = data;
            console.log(this.userId);
        });
    }
}
