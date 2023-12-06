/**
 * @fileoverview Channel class to create new Channel objects.
 */
//TODO: talk about the channelType/authorizedUser
export class Channel {
  channelName: string;
  channelPosts: string[] = [];
  // authorizedUser: string[] = [];
  channelType: string | null;

  constructor(obj?: any) {
    this.channelName = obj ? obj.channelName : '';
    this.channelPosts = obj ? obj.channelPosts : [];
    // this.authorizedUser = obj ? obj.authorizedUser : [];
    this.channelType = obj ? obj.channelType : 'public';
  }

  public toJson() {
    return {
      channelName: this.channelName,
      channelPosts: this.channelPosts,
      // authorizedUser: this.authorizedUser,
      channelType: this.channelType,
    };
  }
}
