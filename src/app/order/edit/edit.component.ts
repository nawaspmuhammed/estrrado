import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class OrderEditComponent implements OnInit {

  response : any = {};
  users: [];
  products:[];
  results: any = {};
  price_amount = "";
  order: any = {};
  angForm : FormGroup;
  constructor(private route: ActivatedRoute,private router: Router, private productService: ProductService,private userService: UserService,private orderService:OrderService,private fb : FormBuilder) {
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
    this.route.params.subscribe(params => {
			this.orderService.editOrder(params['id']).subscribe(res => {
        console.log(res);
        this.order = res;
        this.order = this.order.order;
        
			});
		});
    
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
  updateOrder() {
    this.route.params.subscribe(params => {
    this.orderService.updateOrder(params['id'], this.angForm.value).subscribe(res => {
      this.response = res;
      if (this.response.status == 'success'){
        this.orderService.alert('Order submitted successfully!','success');
        this.router.navigate(['order']);
      } else {
        this.orderService.alert('Error saving order!','error');
      }
    });
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
