import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Contact } from './contact';

@Injectable()
export class ContactService {
  private contactUrl = '/dir/contacts';
  currentContact: Contact = new Contact();

  constructor(
    private http: Http
  ) { }

  // get all contacts
  getContacts() {
    return this.http.get(this.contactUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // get one contact
  getContact(contact) {
    const idUrl = this.contactUrl + '/' + contact;
    return this.http.get(idUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // set current contact
  setCurrentContact(contact) {
    this.currentContact = contact;
  }

  // get current contact
  getCurrentContact() {
    return this.currentContact;
  }

  // clear current contact
  clearCurrentContact() {
    this.currentContact = new Contact();
  }

  // create new contact
  createContact(contact) {
    return this.http.post(this.contactUrl, contact)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // delete contact
  deleteContact(contact) {
    const idUrl = this.contactUrl + '/' + contact._id;
    return this.http.delete(idUrl)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // update contact
  updateContact(contact) {
    const idUrl = this.contactUrl + '/' + contact._id;
    return this.http.put(idUrl, contact)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError (error: any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject('An error occurred');
  }
}
