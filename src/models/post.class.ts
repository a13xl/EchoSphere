export class Post {
  id: string;
  author: string;
  timestamp: number;
  message: string;
  replay: string[] = [];
  reaction: string[] = [];
  pinned: boolean;

  constructor(obj?: any) {
    this.id = obj ? obj.id : '';
    this.author = obj ? obj.author : '';
    this.timestamp =
      obj && obj.timestamp ? new Date(obj.timestamp).getTime() : Date.now();
    this.message = obj ? obj.message : '';
    this.replay = obj ? obj.replay : [];
    this.reaction = obj ? obj.reaction : [];
    this.pinned = obj ? obj.pinned : false;
  }

  public toJson() {
    return {
      // id: this.id,
      author: this.author,
      timestamp: this.timestamp,
      message: this.message,
      replay: this.replay,
      reaction: this.reaction,
      pinned: this.pinned,
    };
  }
}
