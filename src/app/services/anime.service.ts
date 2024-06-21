import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private _http = inject(HttpClient);
  constructor() { }

  dataAnime(index: any): Observable<any> {
    let url = `https://box.sphinxanime.net/?v=${index.toString()}`;
    return this._http.get(url, { responseType: 'text' });
  }
}
