import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../shared/title.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.tittleService.title = null;
  }

  constructor(private tittleService: TitleService) {
    this.tittleService.title = 'Payment Detail Register';
  }

  ngOnInit() {
  }

}
