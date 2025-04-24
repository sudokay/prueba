

import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Chart } from 'chart.js';  // Importa Chart.js

@Component({
  selector: 'app-admin-dash',
  standalone: false,
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent{

  userCreate:boolean = false;
  userList:boolean = false;
  
  productList:boolean = false;
  productCreate:boolean = false;

  hideAllPages(){
    this.userCreate = false;  // Alterna la visibilidad
    this.userList = false;
    this.productList = false;
    this.productCreate = false;
  }

  showUserCreate() {
    this.hideAllPages()
    this.userCreate = true;
  }
  showUserList() {
    this.hideAllPages()
    this.userList = true;
  }
  
  showProductList() {
    this.hideAllPages()
    this.productList = true;
  }
  showProductCreate(){
    this.hideAllPages()
    this.productCreate = true;

  }
}
