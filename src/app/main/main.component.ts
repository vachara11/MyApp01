import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { SendComponent } from '../send/send.component';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {

  user: any=null;
  private authSub: Subscription | undefined;

  items= [
    {
      name: '',
      price:'',
      detail:'',
      imageURL: 'http://placehold.co/600x400'
    },
  ];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }


  gotoDetails(item:any){
    this.navCtrl.navigateForward('/detail',{state:{item}});
  }

  ngOnInit() {
    this.authSub = this.afAuth.authState.subscribe(
      user => {
        this.user = user;
      if(!user){
          this.router.navigate(['/home']);
      } else {
        this.firestore.collection('data').valueChanges().subscribe((articles:any[])=>{
          this.items = articles;
        });
      }
    });
  }

  async openSendComponent(){
    const modal = await this.modalCtrl.create({
      component: SendComponent,
    });
    return await modal.present();
  }

}
