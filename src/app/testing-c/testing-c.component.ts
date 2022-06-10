import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminServiceService } from '../services/admin-service.service';
@Component({
  selector: 'app-testing-c',
  templateUrl: './testing-c.component.html',
  styleUrls: ['./testing-c.component.scss']
})
export class TestingCComponent implements OnInit {

  constructor(private adminService:AdminServiceService) { }

  ngOnInit(): void {
  }
  postForm(form:NgForm){
  let data=form.value;
  console.log(data)
  this.adminService.postAdmin(data).subscribe(
    (data)=>{
      console.log(data)
    }
  )
  }
}