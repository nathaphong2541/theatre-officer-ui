import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseMaster } from './model/base';
import { ApiPage } from './department.service';

@Injectable({ providedIn: 'root' })
export class GenderIdentityService {
    private baseUrl = `${environment.apiUrl}/master/gender-identities`;

    constructor(private http: HttpClient) { }

    // ✅ ใช้กับหน้า list ที่ต้องมี pagination
    list(page = 0, size = 5): Observable<ApiPage<BaseMaster>> {
        return this.http.get<ApiPage<BaseMaster>>(`${this.baseUrl}?page=${page}&size=${size}`);
    }

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
