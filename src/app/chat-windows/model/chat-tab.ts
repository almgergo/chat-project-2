import { ChatMessage } from './chat-message';

export class ChatTab {
    id: number;
    partnerUsername: string;
    messages: ChatMessage[] = [];
    active: boolean;

    constructor() {
        this.id = -1;
        this.partnerUsername = '';
        this.messages = [];
        this.active = true;
    }
}
