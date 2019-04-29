import { Injectable, Inject } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  formData: PaymentDetail;

  list: PaymentDetail[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private rootURL: string) { }

  postPaymentDetail() {
   return this.http.post(this.rootURL + 'api/PaymentDetail', this.formData);
  }
  putPaymentDetail() {
   return this.http.put(this.rootURL + 'api/PaymentDetail/' + this.formData.id, this.formData);
  }

  refreshList() {
    return this.http.get(this.rootURL + 'api/PaymentDetail')
      .toPromise()
      .then(res => this.list = res as PaymentDetail[]);
  }
  deletePaymentDetail(id: string) {
    return this.http.delete(this.rootURL + 'api/PaymentDetail/' + id);
  }
}
