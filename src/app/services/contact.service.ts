import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = '/dir/contacts';
  currentContact: Contact = new Contact();

  constructor(
    private http: HttpClient
  ) { }

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

  // get all contacts
  getContacts() {
    return this.http.get<Contact[]>(this.contactUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // get one contact
  getContact(contact) {
    const idUrl = this.contactUrl + '/' + contact;
    return this.http.get<Contact>(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // create new contact
  createContact(contact) {
    return this.http.post<Contact>(this.contactUrl, contact)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // delete contact
  deleteContact(contact) {
    const idUrl = this.contactUrl + '/' + contact._id;
    return this.http.delete<any>(idUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  // update contact
  updateContact(contact) {
    const idUrl = this.contactUrl + '/' + contact._id;
    return this.http.put<Contact>(idUrl, contact)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }
}
