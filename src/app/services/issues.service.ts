import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Issues } from '../models/issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient) { }
  api = environment.apiURL + "repos/angular/angular/issues";


  getIssues(): Observable<Issues[]> {
    return this.http.get<Issues[]>(this.api);
  }
}
