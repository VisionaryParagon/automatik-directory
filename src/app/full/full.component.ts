import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ContactService } from '../services/contact.service';
import { SortService } from '../services/sort.service';
import { WindowRef } from '../services/window-ref.service';

import { FadeAnimation, TopDownAnimation } from '../animations';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class FullComponent implements OnInit {
  contacts = [];
  filteredContacts = [];
  filter = '';
  sortOptions = [
    'last_name'
  ];
  loading = true;
  error = false;

  constructor(
    private sanitizer: DomSanitizer,
    private contactService: ContactService,
    private sortService: SortService,
    private winRef: WindowRef
  ) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this.contactService.getContacts()
      .subscribe(
        res => {
          this.contacts = this.sortService.sort(res, this.sortOptions);
          this.filteredContacts = this.sortService.sort([...res], this.sortOptions);
          this.loading = false;
        },
        err => this.error = true
      );
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
