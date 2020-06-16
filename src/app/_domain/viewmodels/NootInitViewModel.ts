export class NootInitViewModel {
  userId: string;
  wantedNoots: string;
  ammount: number;
  lastId: string;
  userIds: Array<string>;

  constructor(userId: string, wandetNoots: string) {
    this.userId = userId;
    this.wantedNoots = wandetNoots;
  }
}
