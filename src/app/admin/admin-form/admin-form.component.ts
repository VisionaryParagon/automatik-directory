import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Contact } from '../../services/contact';
import { ContactService } from '../../services/contact.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminFormComponent implements OnInit {
  contact: Contact;
  edit = false;
  submitted = false;
  success = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<AdminFormComponent>,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contact = this.contactService.getCurrentContact();
    // console.log(this.contact);

    if (this.contact._id) {
      this.edit = true;
    }
  }

  saveContact(isValid) {
    this.submitted = true;

    if (isValid) {
      if (!this.contact.image) {
        this.contact.image = '/assets/images/no-image.jpg';
      }

      if (!this.edit) {
        this.contactService.createContact(this.contact)
          .subscribe(
            res => {
              this.success = true;
              this.submitted = false;
            },
            err => {
              this.showError();
              this.submitted = false;
            }
          );
      } else {
        this.contactService.updateContact(this.contact)
          .subscribe(
            res => {
              this.success = true;
              this.submitted = false;
            },
            err => {
              this.showError();
              this.submitted = false;
            }
          );
      }
    }
    return false;
  }

  addAnother() {
    this.contact = new Contact();
    this.success = false;
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
