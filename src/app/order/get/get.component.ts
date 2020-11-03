import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { OrderService } from '../../order.service';
@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class OrderGetComponent implements OnInit {

  orders: [];
	response : any = {};
  responseDelete : any = {};
  angForm : FormGroup;
	constructor(private us: OrderService,private fb : FormBuilder) { 
    this.angForm = this.fb.group({
      user: ['',Validators.required],
      
    });   
  }

	ngOnInit() {
		this.getOrders();
	}

	getOrders() {
		this.us.getOrders().subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
				this.orders = this.response.orders;
			} else {
			}
		});
  }
  searchItem() {
    var input = this.angForm.value;
    console.log(input);
		this.us.searchItem(input.user).subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
        this.orders = this.response.orders;
       
			} else {
			}
		});
	}

	deleteOrder(id) {
		this.us.deleteOrder(id).subscribe(res => {
			this.responseDelete = res;
			if (this.responseDelete.status == 'success'){
				this.us.alert('Order deleted successfully!','success');
				this.getOrders();
			} else {
				this.us.alert('Error deleting product!','error');
			}
		});
  }
  onChange(event,prod){
    var input = event.target.value;
    
    console.log(input);
		this.us.searchDate(input,prod).subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
        this.orders = this.response.orders;
       
			} else {
			}
		});
  }
}
