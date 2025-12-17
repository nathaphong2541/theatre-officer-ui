import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseMaster } from './model/base';

@Injectable({ providedIn: 'root' })
export class RacialIdentityService {
    private baseUrl = `${environment.apiUrl}/master/racial-identities`;

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<BaseMaster[]>(this.baseUrl);
    }

    getById(id: number) {
        return this.http.get<BaseMaster>(`${this.baseUrl}/${id}`);
    }

    create(payload: BaseMaster) {
        return this.http.post<BaseMaster>(this.baseUrl, payload);
    }

    update(id: number, payload: BaseMaster) {
        return this.http.put<BaseMaster>(`${this.baseUrl}/${id}`, payload);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
