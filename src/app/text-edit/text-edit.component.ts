import { Component, OnInit, Input } from '@angular/core';
import { editorConfig } from './../service/editor-config';
import { Post } from 'src/models/post.class';
import { Reply } from 'src/models/reply.class';
import { AuthenticationService } from '../service/authentication.service';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from './../service/loading.service';
import { DialogService } from '../service/dialog.service';
import { Chat } from 'src/models/chat.class';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss'],
})
export class TextEditComponent {
  @Input() context!: 'channel' | 'reply' | 'directmessage';
  @Input() postId?: string;
  editorConfig = editorConfig;
  editorContent: string = '';
  post: Post = new Post();
  channelId: string = '';
  reply: Reply = new Reply();
  currentChat: Chat = new Chat();
  chatId: string = '';
  // postId: string = '';

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public loadingService: LoadingService,
    public authentication: AuthenticationService,
    private dialogService: DialogService
  ) {}

  // ngOnInit() {
  //   this.route.params.subscribe((params) => {
  //     this.channelId = params['id'];
  //   });
  //   const currentUser = this.authentication.getUserId();
  //   //TODO rausnehmen
  //   console.log('Aktuell angemeldeter Benutzer aus Textedit:', currentUser);
  // }

  ngOnInit() {
    this.route.url.subscribe((segments) => {
      //check if the first segment is 'dm'
      if (segments.length && segments[0].path === 'dm') {
        this.context = 'directmessage';
      }
    });

    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
    });
    const currentUser = this.authentication.getUserId();
    console.log('Aktuell angemeldeter Benutzer aus Textedit:', currentUser);
  }

  save() {
    switch (this.context) {
      case 'channel':
        this.saveChannelPost();
        break;
      case 'reply':
        this.saveReply();
        break;
      case 'directmessage':
        this.saveDirectMessage();
        break;
      default:
        console.error('No valid context provided!');
    }
  }

  async saveDirectMessage() {
    console.log('saveDirectMessage aufgerufen');
    const chatDoc = doc(this.firestore, 'chats', this.channelId); // Annahme: Chat-Daten sind in einer 'chats' Sammlung gespeichert
    const chatSnap = await getDoc(chatDoc);

    if (!chatSnap.exists()) {
      console.error('Chat not found.');
      return;
    }

    const chatData = chatSnap.data();

    // hinzufügen einer neuen Nachricht zum Msg Array
    const newMessage = {
      author: this.authentication.getUserId(),
      timestamp: new Date().getTime(),
      message: this.editorContent,
    };
    if (!chatData['message']) chatData['message'] = [];
      chatData['message'].push(newMessage);


    // aktualisieren des Chat-Dokuments in Firestore
    await updateDoc(chatDoc, { message: chatData['message'] });

    console.log('Direct message added successfully.');
    this.editorContent = ''; // Zurücksetzen des Editors
  }

  saveChannelPost() {
    console.log('savePost aufgerufen');
    //TODO: author actual hardcoded, later dynamic
    //this.post.author = 'hKhYyf1A2qOwLSyxTymq';
    this.post.author = this.authentication.getUserId();
    this.post.timestamp = new Date().getTime();
    this.post.message = this.editorContent;
    console.log(this.post);
    this.addPost();
  }

  onEditorContentChange(event: any) {
    console.log(this.editorContent); // Prints the current content of the editor
  }

  /**
   * Start the loading animation, from the loadingService
   */
  startLoading() {
    this.loadingService.setLoadingState(true);
  }

  /**
   * Stop the loading animation, from the loadingService
   */
  stopLoading() {
    this.loadingService.setLoadingState(false);
  }

  async addPost() {
    this.startLoading();
    // console.log('addPost aufgerufen - channel: ', this.channelId);
    const docRef = await addDoc(
      collection(this.firestore, 'posts'),
      this.post.toJson()
    );
    this.post.id = docRef.id;
    console.log('Document written with ID: ', docRef.id);
    this.editorContent = '';
    // Get the current channel object
    const channelDoc = doc(this.firestore, 'channels', this.channelId);
    const channelSnap = await getDoc(channelDoc);

    if (channelSnap.exists()) {
      // Add the new post ID to the channelPosts array
      const channelData = channelSnap.data();
      channelData['channelPosts'].push(this.post.id);

      // Update the channel document in Firestore
      await updateDoc(channelDoc, {
        channelPosts: channelData['channelPosts'],
      });
    }
    this.stopLoading();
  }

  saveReply() {
    console.log('saveReply aufgerufen');
    // this.reply.userId = 'hKhYyf1A2qOwLSyxTymq'; // userId des aktuellen Benutzers
    this.reply.userId = this.authentication.getUserId();
    this.reply.timestamp = new Date().getTime();
    this.reply.message = this.editorContent;
    console.log(this.reply);
    this.addReply();
    this.dialogService.closeDialog();
  }

  async addReply() {
    if (!this.postId) {
      console.error('postId is not defined.');
      return;
    }
    this.startLoading();
    console.log('addReply aufgerufen - post: ', this.postId);
    const docRef = await addDoc(
      collection(this.firestore, 'replys'),
      this.reply.toJson()
    );
    this.reply.id = docRef.id;
    console.log('Document written with ID: ', docRef.id);
    this.editorContent = '';

    // Get the current post object
    const postDoc = doc(this.firestore, 'posts', this.postId);
    const postSnap = await getDoc(postDoc);

    if (postSnap.exists()) {
      // Add the new reply ID to the reply array of the post
      const postData = postSnap.data();
      postData['replay'].push(this.reply.id);

      // Update the post document in Firestore
      await updateDoc(postDoc, {
        replay: postData['replay'],
      });
    }
    this.stopLoading();
  }
}

 
