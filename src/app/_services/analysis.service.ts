import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private ApiUrl='http://localhost:3000/analysis/getAllAnalysis'
  constructor(private http: HttpClient) { }

  getAllAnalysis():Observable<any>{

    return this.http.get(this.ApiUrl)
  }
}
