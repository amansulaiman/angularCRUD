import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-payment-detail-list',
  templateUrl: './payment-detail-list.component.html',
  styleUrls: ['./payment-detail-list.component.css']
})
export class PaymentDetailListComponent implements OnInit {
  faTrash = faTrash;
  constructor(public service: PaymentDetailService) { }

  ngOnInit() {
    this.service.refreshList();
  }

  populateForm(pd: PaymentDetail) {
    this.service.formData = Object.assign({}, pd);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePaymentDetail(id).subscribe(res => {
          this.service.refreshList();
          console.log('Success');
      }, err => {
          console.log(err);
      });
    }
  }
}
