import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ContactService } from '../services/contact.service';
import { SortService } from '../services/sort.service';

import { FadeAnimation, TopDownAnimation } from '../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [ FadeAnimation, TopDownAnimation ]
})
export class MainComponent implements OnInit {
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
    private sortService: SortService
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

  sanitize(url): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  insurance() {
    window.open('../../assets/pdfs/2017-18-auto-id-cards.pdf');
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
