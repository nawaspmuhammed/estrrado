import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	url = 'http://localhost:3000/product';

	constructor(private http: HttpClient) { }

	addProduct(product) {
		return this.http.post(this.url+'/add', product);
	}

	getProducts() {
		return this.http.get(this.url);
	}

	editProduct(id) {
		return this.http.get(this.url+'/edit/'+id);
	}
	getProduct(name) {
		return this.http.get(this.url+'/getProduct/'+name);
	}

	updateProduct(id, product) {
		return this.http.post(this.url+'/update/'+id, product);
	}

	deleteProduct(id) {
		return this.http.get(this.url+'/delete/'+id);
	}

	alert(mssg, status) {
		swal.fire(mssg, "", status);
	}
}
