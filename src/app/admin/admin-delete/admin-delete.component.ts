import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Contact } from '../../services/contact';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent implements OnInit {
  contact: Contact;
  success = false;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<AdminDeleteComponent>,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.contact = this.contactService.getCurrentContact();
    console.log(this.contact);
  }

  deleteContact() {
    this.contactService.deleteContact(this.contact)
      .then(() => {
        this.success = true;
      })
      .catch(() => {
        this.showError();
      });
  }

  showError() {
    this.error = true;
  }

  hideError() {
    this.error = false;
  }
}
