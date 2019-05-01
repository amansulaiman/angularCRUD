import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertServiceService } from '../services/alert-service.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy  {
  private subscription: Subscription;
  message: any;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private alertService: AlertServiceService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
  });
  }

}
