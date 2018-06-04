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

    constructor(private http: HttpClient) {
        console.log(localStorage.getItem('userId'));
        if (localStorage.getItem('userId') != null) {
            this.userId = parseInt(localStorage.getItem('userId'), 10);
        }
     }

    registerUser() {
        this.http.get<number>('/api/user/register').subscribe(data => {
            this.userId = data;
            localStorage.setItem('userId', this.userId.toString());
            console.log(this.userId);
        });


    }
}
