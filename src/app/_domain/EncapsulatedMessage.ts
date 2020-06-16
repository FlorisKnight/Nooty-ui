export class EncapsulatedMessage {
  messageType: string;
  messageData: string;

  constructor(messageType: string, messageData: string) {
    this.messageType = messageType;
    this.messageData = messageData;
  }
}
