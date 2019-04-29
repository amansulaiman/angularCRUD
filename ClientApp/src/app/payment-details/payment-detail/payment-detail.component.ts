import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { faUserCircle, faCreditCard, faCalendar, faKey, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail',
  templateUrl: './payment-detail.component.html',
  styleUrls: ['./payment-detail.component.css']
})
export class PaymentDetailComponent implements OnInit {

  faUserCircle = faUserCircle;
  faCreditCard = faCreditCard;
  faCalender = faCalendar;
  faKey = faKey;
  faDatabase = faDatabase;
  constructor(public service: PaymentDetailService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      cardOwner: '',
      cardNumber: '',
      cvv: '',
      expDate: ''
    };
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.id == null) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }
  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Successfull');
      },
      err => {
        this.toastr.warning('An Error Occured');
        console.log(err);
      }
    );
  }
  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Successfull');
      },
      err => {
        this.toastr.warning('An Error Occured');
        console.log(err);
      }
    );
  }
}
