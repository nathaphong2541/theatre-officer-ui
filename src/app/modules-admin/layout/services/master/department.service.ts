import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Department {
    id?: number;
    nameTh: string;
    nameEn: string;
    description?: string;
}

export interface ApiPage<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
    totalPages: number;
}

@Injectable({ providedIn: 'root' })
export class DepartmentService {
    private readonly baseUrl = `${environment.apiUrl}/master/departments`;

    constructor(private http: HttpClient) { }

    // ✅ ใช้กับหน้า list ที่ต้องมี pagination
    list(page = 0, size = 5): Observable<ApiPage<Department>> {
        return this.http.get<ApiPage<Department>>(`${this.baseUrl}?page=${page}&size=${size}`);
    }

    // ✅ ถ้าบางหน้าต้องการเอา "ทั้งหมด" เป็น array อย่างเดียว (ไม่สน meta)
    getAll(page = 0, size = 1000): Observable<Department[]> {
        return this.list(page, size).pipe(map(res => res?.items ?? []));
    }

    getById(id: number): Observable<Department> {
        return this.http.get<Department>(`${this.baseUrl}/${id}`);
    }

    create(payload: Department): Observable<Department> {
        return this.http.post<Department>(this.baseUrl, payload);
    }

    update(id: number, payload: Department): Observable<Department> {
        return this.http.put<Department>(`${this.baseUrl}/${id}`, payload);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
