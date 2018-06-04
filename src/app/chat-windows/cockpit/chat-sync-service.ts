import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { UnsyncedMessages } from '../model/unsynced-messages';
import { ChatMessage } from '../model/chat-message';
import { UserService } from '../../user-service';

@Injectable()
export class ChatSyncService {
  constructor(private http: HttpClient, private userService: UserService) { }

  sendMessages(unsyncedMessages: UnsyncedMessages) {
    const params = new HttpParams()
    .set('uid', this.userService.userId.toString())
    .set('partnerId', unsyncedMessages.partnerId.toString());

    return this.http.post<void>('/api/message/syncMessages', {params: params});
  }

  queryMessages(partnerId: number, lastSyncTime: number): Observable<ChatMessage[]> {
    const params = new HttpParams()
      .set('uid', this.userService.userId.toString())
      .set('partnerId', partnerId.toString())
      .set('lastSync', lastSyncTime.toString());

    return this.http.get<ChatMessage[]>('/api/message/queryMessages', {params: params});
  }
//   registerNewTopic(topicName: string): Observable<Topic> {
//     return this.http.get<Topic>(
//       '/api/registerNewTopic',
//       {params: new HttpParams().append('topicName', topicName)}
//     );
//   }
}
