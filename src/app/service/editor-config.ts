/**
 * @fileoverview editor config is a service that provides the configuration for the text-editor.
 * this text editor is used in each channel to create a new post.
 */
import { AngularEditorConfig } from '@kolkov/angular-editor';

export const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: 'auto',
  minHeight: '0',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here...',
  defaultParagraphSeparator: '',
  defaultFontName: '',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' },
  ],

  toolbarHiddenButtons: [
    ['fontSize', 'toggleEditorMode', 'insertVideo', 'clearFormatting'],
  ],
};
