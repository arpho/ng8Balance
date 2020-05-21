// tslint:disable: quotemark
import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";
import * as admin from "firebase-admin";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface {
  public usersRef: firebase.database.Reference;
  private loggedUser: UserModel;
  items_list: Array<UserModel> = []
  _items: BehaviorSubject<Array<UserModel>> = new BehaviorSubject([])
  readonly items: Observable<Array<UserModel>> = this._items.asObservable()

  constructor() {
    this.usersRef = firebase.database().ref("/userProfile");
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.usersRef = firebase.database().ref(`/userProfile/`);
        this.getEntitiesList().on('value', eventSuppliersListSnapshot => {
          this.items_list = [];
          eventSuppliersListSnapshot.forEach(snap => {
            console.log('loaded user',snap.val())
            const supplier = new UserModel(undefined, snap.key).load(snap.val())
            supplier.key = snap.key // alcuni item non hanno il campo key
            this.items_list.push(supplier);
            if (supplier.key === '') {
            }
          });
          this._items.next(this.items_list)
        });
      }
    });
  }

  getItem(key: string) {
    if (this.usersRef) {
      return this.usersRef.child(key);
    }
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  setLoggedUser(key: string) {
    this.loggedUser = new UserModel(undefined, key);
    this.loggedUser.build({key});
     return this.loggedUser;
  }

  deleteItem(key: string) {
    return this.usersRef.child(key).remove();
  }

  getDummyItem() {
    return new UserModel();
  }

  createItem(item: ItemModelInterface) {
    return this.usersRef.push(item.serialize());
  }

  getEntitiesList(): firebase.database.Reference {
    return this.usersRef;
  }

  updateItem(item: ItemModelInterface) {
    return this.usersRef.child(item.key).update(item.serialize());
  }
}
