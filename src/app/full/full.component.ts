import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Contact } from '../services/contact';
import { ContactService } from '../services/contact.service';
import { WindowRef } from '../services/window-ref.service';

import { FadeAnimation, TopDownAnimation } from '../animations';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class FullComponent implements OnInit {
  contacts = [];
  filteredContacts = [];
  filter = '';
  loading = true;
  error = false;

  constructor(
    private sanitizer: DomSanitizer,
    private contactService: ContactService,
    private winRef: WindowRef
  ) { }

  ngOnInit() {
    this.getContacts();
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

  insurance() {
    window.open('../../assets/pdfs/2017-18-auto-id-cards.pdf');
  }

  printList() {
    this.winRef.nativeWindow.print();
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
}
