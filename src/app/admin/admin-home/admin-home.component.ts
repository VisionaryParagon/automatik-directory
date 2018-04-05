import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { CookieService } from 'ngx-cookie';

import { Contact } from '../../services/contact';
import { ContactService } from '../../services/contact.service';
import { SortService } from '../../services/sort.service';
import { AdminService } from '../../services/admin.service';

import { FadeAnimation, TopDownAnimation } from '../../animations';

import { AdminFormComponent } from '../admin-form/admin-form.component';
import { AdminDeleteComponent } from '../admin-delete/admin-delete.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class AdminHomeComponent implements OnInit {
  contacts = [];
  filteredContacts = [];
  contact: Contact;
  filter = '';
  sortOptions = [
    'last_name'
  ];
  modalOptions = {
    maxWidth: '768px'
  };
  loading = true;
  error = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private cookieService: CookieService,
    private contactService: ContactService,
    private sortService: SortService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts()
      .then(res => {
        this.contacts = this.sortService.sort(res, this.sortOptions);
        this.filteredContacts = this.sortService.sort([...res], this.sortOptions);
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
      });
  }

  resetContacts() {
    this.filter = '';
    this.getContacts();
    this.contactService.clearCurrentContact();
  }

  newContact() {
    this.contact = new Contact();
    this.contactService.setCurrentContact(this.contact);

    const dialogRef = this.dialog.open(AdminFormComponent, this.modalOptions);

    dialogRef.afterClosed().subscribe(() => {
      this.resetContacts();
    });
  }

  editContact(id) {
    this.contact = this.contacts.filter(contact => contact._id === id)[0];
    this.contactService.setCurrentContact(this.contact);

    const dialogRef = this.dialog.open(AdminFormComponent, this.modalOptions);

    dialogRef.afterClosed().subscribe(() => {
      this.resetContacts();
    });
  }

  deleteContact(id) {
    this.contact = this.contacts.filter(contact => contact._id === id)[0];
    this.contactService.setCurrentContact(this.contact);

    const dialogRef = this.dialog.open(AdminDeleteComponent, this.modalOptions);

    dialogRef.afterClosed().subscribe(() => {
      this.resetContacts();
    });
  }

  updateFilter() {
    const val = this.filter.toLowerCase();

    const filtered = this.filteredContacts.filter(d => {
      return  d.first_name.toLowerCase().indexOf(val) !== -1 ||
              d.last_name.toLowerCase().indexOf(val) !== -1 ||
              d.phone.toLowerCase().indexOf(val) !== -1 ||
              d.email.toLowerCase().indexOf(val) !== -1;
    });

    this.contacts = filtered;
  }

  clearFilter() {
    this.filter = '';
    this.getContacts();
  }

  logout() {
    this.adminService.loggedIn = false;
    this.cookieService.removeAll();
    this.adminService.logout();

    this.router.navigate(['/admin/login']);
  }
}
