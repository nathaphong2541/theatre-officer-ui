import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Position {
    id?: number;
    nameTh: string;
    nameEn: string;
    description?: string;
    departmentId: number;
}

export interface PageResponse<T> {
    items: T[];
    total: number;
    page?: number;
    size?: number;
    totalPages?: number;
}

@Injectable({ providedIn: 'root' })
export class PositionService {
    private readonly baseUrl = `${environment.apiUrl}/master/positions`;

    constructor(private http: HttpClient) { }

    // ✅ GET: List (Paged)
    list(page: number, size: number): Observable<PageResponse<Position>> {
        const params = new HttpParams()
            .set('page', String(page))
            .set('size', String(size));

        return this.http.get<PageResponse<Position>>(this.baseUrl, { params });
    }

    // GET: Get By Id
    getById(id: number): Observable<Position> {
        return this.http.get<Position>(`${this.baseUrl}/${id}`);
    }

    // POST: Create
    create(payload: Position): Observable<Position> {
        return this.http.post<Position>(this.baseUrl, payload);
    }

    // PUT: Update
    update(id: number, payload: Position): Observable<Position> {
        return this.http.put<Position>(`${this.baseUrl}/${id}`, payload);
    }

    // DELETE: Delete
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    // ✅ GET: List By Department (Paged)
    listByDepartment(departmentId: number, page: number, size: number): Observable<PageResponse<Position>> {
        const params = new HttpParams()
            .set('page', String(page))
            .set('size', String(size));

        return this.http.get<PageResponse<Position>>(
            `${this.baseUrl}/by-department/${departmentId}`,
            { params }
        );
    }
}
