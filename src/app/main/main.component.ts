import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent  implements OnInit {

  items= [
    {
      id:1,
      title: 'Service A',
      content:'this is the content of the service A',
      imageURL: 'http://placehold.co/600x400'
    },
    {
      id:2,
      title: 'Service B',
      content:'this is the content of the service B',
      imageURL: 'http://placehold.co/600x400'
    },
    {
      id:3,
      title: 'Service C',
      content:'this is the content of the service C',
      imageURL: 'http://placehold.co/600x400'
    },
    {
      id:4,
      title: 'Service D',
      content:'this is the content of the service D',
      imageURL: 'http://placehold.co/600x400'
    }
  ];

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  gotoDetails(item:any){
    this.navCtrl.navigateForward('/detail',{state:{item}});
  }

}
