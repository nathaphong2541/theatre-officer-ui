import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Skill {
    id?: number;
    nameTh: string;
    nameEn: string;
    description?: string;
    positionId: number;
}

@Injectable({ providedIn: 'root' })
export class SkillService {
    private readonly baseUrl = `${environment.apiUrl}/master/skills`;

    constructor(private http: HttpClient) { }

    // GET: Get All
    getAll(): Observable<Skill[]> {
        return this.http.get<Skill[]>(this.baseUrl);
    }

    // GET: Get By Id
    getById(id: number): Observable<Skill> {
        return this.http.get<Skill>(`${this.baseUrl}/${id}`);
    }

    // POST: Create
    create(payload: Skill): Observable<Skill> {
        return this.http.post<Skill>(this.baseUrl, payload);
    }

    // PUT: Update
    update(id: number, payload: Skill): Observable<Skill> {
        return this.http.put<Skill>(`${this.baseUrl}/${id}`, payload);
    }

    // DELETE: Delete
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
