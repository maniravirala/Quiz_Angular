import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private fs: Firestore) {}

  getUser() {
    const users = collection(this.fs, 'users');
    return collectionData(users, { idField: 'id' });
  }

  addUser(name: string, password: string, email:string, regNo: number, tandc: boolean) {
    let data = { name: name, password: password, email:email, regNo: regNo, tandc: tandc };
    let users = collection(this.fs, 'users');
    return addDoc(users, data);
  }

  deletUser(id: string) {
    let docRef = doc(this.fs, 'users/' + id);
    return deleteDoc(docRef);
  }
}
