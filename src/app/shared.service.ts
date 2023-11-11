import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
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

  async getTestById(id: string) {
    const tests = collection(this.fs, 'tests');
    const testDoc = doc(tests, id);
    
    try {
      const doc = await getDoc(testDoc);
      if (doc.exists()) {
        const specificTestData = doc.data();
        return specificTestData;
      } else {
        console.log('Document not found');
        return null;
      }
    } catch (error) {
      console.error('Error getting document:', error);
      return null;
    }
  }

  async addTest(
    testName: string,
    testId: string,
    allowRetake: boolean,
    timeLimit: string,
    questions: any
  ) {
    let data = {
      testName: testName,
      allowRetake: allowRetake,
      timeLimit: timeLimit,
      questions: questions,
    };
    let tests = collection(this.fs, 'tests');
    const docRef = doc(tests, testId);

    await setDoc(docRef, data);
    return testId;
  }

  getUser() {
    const users = collection(this.fs, 'users');
    return collectionData(users, { idField: 'id' });
  }

  addUser(
    uid: string,
    name: string,
    password: string,
    email: string,
    regNo: number,
    tandc: boolean
  ) {
    let data = {
      name: name,
      password: password,
      email: email,
      regNo: regNo,
      tandc: tandc,
    };
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
