export class Chat {
    person1Id: string;
    person2Id: string;
    message: {author: string, timestamp: number, message: string }[];
  
    constructor(obj?: any) {
      this.person1Id = obj ? obj.person1Id : '';
      this.person2Id = obj ? obj.person2Id : '';
      this.message = obj && obj.message ? obj.message : [];
    }
  
    public toJSON() {
      return {
        person1Id: this.person1Id,
        person2Id: this.person2Id,
        message: this.message
      };
    }
  }