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

  getTest() {
    const tests = collection(this.fs, 'tests');
    return collectionData(tests, { idField: 'id' });
  }

  addTest(
    testName: string,
    testId: string,
    allowRetake: boolean,
    timeLimit: string,
    questions: any
  ) {
    let data = {
      testName: testName,
      testId: testId,
      allowRetake: allowRetake,
      timeLimit: timeLimit,
      questions: questions,
    };
    let tests = collection(this.fs, 'tests');
    return addDoc(tests, data);
  }

  getUser() {
    const users = collection(this.fs, 'users');
    return collectionData(users, { idField: 'id' });
  }

  addUser(uid: string, name: string, password: string, email:string, regNo: number, tandc: boolean) {
    let data = { name: name, password: password, email:email, regNo: regNo, tandc: tandc };
    let users = collection(this.fs, 'users');
    // let userDoc = users.doc(uid);
    // return userDoc.set(data);
    return addDoc(users, data);
  }

  deletUser(id: string) {
    let docRef = doc(this.fs, 'users/' + id);
    return deleteDoc(docRef);
  }
}
