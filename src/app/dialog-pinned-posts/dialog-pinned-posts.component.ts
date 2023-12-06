import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/models/post.class';

@Component({
  selector: 'app-dialog-pinned-posts',
  templateUrl: './dialog-pinned-posts.component.html',
  styleUrls: ['./dialog-pinned-posts.component.scss'],
})
export class DialogPinnedPostsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pinnedPosts: Post[] },
    public dialogRef: MatDialogRef<DialogPinnedPostsComponent>
  ) {
    this.data.pinnedPosts.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

 

  getPreviousPost(currentPost: Post): Post | undefined {
    const currentIndex = this.data.pinnedPosts.indexOf(currentPost);
    if (currentIndex > 0) {
      return this.data.pinnedPosts[currentIndex - 1];
    }
    return undefined;
  }

  shouldShowDate(previousPost: Post | undefined, currentPost: Post): boolean {
    if (previousPost && currentPost) {
      const previousDate = new Date(
        previousPost.timestamp
      ).toLocaleDateString();
      const currentDate = new Date(currentPost.timestamp).toLocaleDateString();
      return previousDate !== currentDate;
    }
    return false;
  }

}