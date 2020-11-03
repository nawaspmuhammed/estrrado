import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ProductService } from 'src/app/product.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { OrderService } from 'src/app/order.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class OrderAddComponent implements OnInit {
  response : any = {};
  users: [];
  products:[];
  results: any = {};
  price_amount = "";
  angForm : FormGroup;
  constructor(private productService: ProductService,private userService: UserService,private orderService:OrderService,private fb : FormBuilder) {
    this.angForm = this.fb.group({
      name: [''],
      product: [''],
      price: [''],
      quantity: ['', Validators.required ]
    });    
   }

  ngOnInit() {
    this.getProducts();
    this.getUsers();
    
	}
  getUsers() {
		this.userService.getUser().subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
				this.users = this.response.users;
			} else {
			}
		});
	}
	getProducts() {
		this.productService.getProducts().subscribe((res) => {
			this.response = res;
			if (this.response.status == 'success'){
				this.products = this.response.products;
			} else {
			}
		});
  }
  addOrder() {
    console.log(this.angForm.value);
    this.orderService.addOrder(this.angForm.value).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success'){
        this.orderService.alert('Order submitted successfully!','success');
        this.angForm.reset();
      } else {
        this.orderService.alert('Error saving order!','error');
      }
    })
  }
  onChange(event){
   
    this.productService.getProduct(event.target.value).subscribe(res => {
        
      this.results = res;
      this.results = this.results.product;
     
      this.price_amount = this.results.price;
     
    });
  }

}
