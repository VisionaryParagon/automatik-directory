import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie';

import { Contact } from '../services/contact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  contacts = [];
  filteredContacts = [];
  filter = '';
  adminCookie = this.cookieService.get('adminId');
  admin = false;
  loading = true;
  error = false;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private cookieService: CookieService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.getContacts();

    if (this.adminCookie) {
      this.admin = true;
    }
  }

  getContacts() {
    this.contactService.getContacts()
      .then(res => {
        this.contacts = res;
        this.filteredContacts = [...res];
        this.loading = false;
      })
      .catch(() => {
        this.error = true;
      });
  }

  sanitize(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  goAdmin() {
    this.router.navigate(['/admin']);
  }

  updateFilter() {
    const val = this.filter.toLowerCase();

    const filtered = this.filteredContacts.filter((d) => {
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
}
