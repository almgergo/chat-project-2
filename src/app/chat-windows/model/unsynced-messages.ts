import { ChatMessage } from './chat-message';

export class UnsyncedMessages {
    messages: ChatMessage[];
    partnerId: number;

    UnsyncedMessages() {
        this.messages = [];
    }
}
