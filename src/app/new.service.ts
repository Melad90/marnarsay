import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NEW } from './new';

const api = '/api';

@Injectable({
  providedIn: 'root'
})
export class NewService {

  constructor(private http: HttpClient) { }

  getNews(){
    return this.http.get<Array<NEW>>(`${api}/news`);
  }

  deleteNews(news: NEW){
    return this.http.delete(`${api}/news/${news.id}`);
  }
  
  addNews(news: NEW){
    return this.http.post<NEW>(`${api}/news/`, news);
  }
  
  updateNews(news: NEW){
    return this.http.put<NEW>(`${api}/news/${news.id}`, news);
  }
}
