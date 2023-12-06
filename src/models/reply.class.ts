// reply.class.ts
export class Reply {
  id?: string;
  userId: string;
  message: string;
  timestamp: number;

  constructor(obj?: any) {
    this.userId = obj ? obj.userId : '';
    this.message = obj ? obj.message : '';
    this.timestamp =
      obj && obj.timestamp ? new Date(obj.timestamp).getTime() : Date.now();
  }

  toJson() {
    return {
      userId: this.userId,
      message: this.message,
      timestamp: this.timestamp,
    };
  }
}
