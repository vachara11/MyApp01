import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {

  item:any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.item = navigation?.extras?.state?.['item'];
  }

}
