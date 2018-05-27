import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Topic } from '../../commons/model/topic-dto';

@Injectable()
export class TopicService {
  constructor(private http: HttpClient) { }

  getTopics(): Observable<Topic[]> {
      return this.http.get<Topic[]>('/api/allTopics');
  }

  registerNewTopic(topicName: string): Observable<Topic> {
    return this.http.get<Topic>(
      '/api/registerNewTopic',
      {params: new HttpParams().append('topicName', topicName)}
    );
  }
}
