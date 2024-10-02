import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { addDoc, collection } from 'firebase/firestore';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss'],
})
export class SendComponent implements OnInit, OnDestroy {
  name = '';
  price: number = 0;
  detail = '';
  selectdImage: any = null;
  uploadPercent: number | undefined;
  uploadSubscription: Subscription | null = null;

  constructor(
    private modalCtrl: ModalController,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {}

  ngOnDestroy() {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  onFileSelected(event: any) {
    this.selectdImage = event.target.files[0];
  }

  async onSubmit() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const filePath = `users_images/${Date.now()}_${this.selectdImage.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, this.selectdImage);

      uploadTask.percentageChanges().subscribe((percentage) => {
        this.uploadPercent = percentage;
      });

      let downloadURL: string | undefined;
      try {
        await uploadTask;
        downloadURL = await fileRef.getDownloadURL().toPromise();
      } catch (error) {
        console.log('Error uploading image:', error);
        return;
      }
      if (downloadURL) {
        try {
          const filestoreInstance = this.firestore.firestore;
          const dataCollection = collection(filestoreInstance, 'data');

          const docRef = await addDoc(dataCollection, {
            name: this.name,
            price: this.price,
            detail: this.detail,
            imageURL: downloadURL,
            userId: user.uid,
            userEmail: user.email,
            userDisplayName: user.displayName
          });

          console.log("Collection Document ID:",docRef.id);
        } catch (error) {}
      }
    }
  }
}
