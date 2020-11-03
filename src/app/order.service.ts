import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

@Injectable({
	providedIn: 'root'
})
export class OrderService {
	url = 'http://localhost:3000/order';

	constructor(private http: HttpClient) { }

	addOrder(order) {
		return this.http.post(this.url+'/add', order);
	}

	getOrders() {
		return this.http.get(this.url+'/'+name);
	}

	editOrder(id) {
		return this.http.get(this.url+'/edit/'+id);
	}

	updateOrder(id, order) {
		return this.http.post(this.url+'/update/'+id, order);
	}

	deleteOrder(id) {
		return this.http.get(this.url+'/delete/'+id);
    }
    searchItem(name){
        return this.http.get(this.url+'/search/'+name);
    }
    searchDate(value1,value2=null){
        if(value2 != ""){
            return this.http.get(this.url+'/searchDate/'+value1+'/'+value2);
        }else{
            return this.http.get(this.url+'/searchDate/'+value1);
        }
       
    }

	alert(mssg, status) {
		swal.fire(mssg, "", status);
	}
}
