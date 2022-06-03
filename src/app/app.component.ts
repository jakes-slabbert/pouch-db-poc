import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as PouchDB from 'pouchdb';
import { ActivityTracker } from 'src/providers/ActivityTracker';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pouchdb: any;
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public pouchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private at: ActivityTracker) {
    this.pouchForm = formBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required)
    });
  }

  public saveForm(): void {
    if (this.pouchForm.invalid) {
      alert('Pleasse complete the form.');
      return;
    }

    this.at.saveActivity(this.pouchForm);
  }
}
