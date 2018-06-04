import { ChatMessage } from './chat-message';

export class ChatTab {
    id: number;
    partnerUsername: string;
    partnerId: number;
    messages: ChatMessage[] = [];
    active: boolean;

    currentMessage: string;

    constructor() {
        this.id = -1;
        this.partnerUsername = '';
        this.messages = [];
        this.active = true;
    }
}
