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
}
