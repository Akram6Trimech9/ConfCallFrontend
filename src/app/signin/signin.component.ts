import {  Component, OnInit } from '@angular/core';
 import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({

  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formg!:FormGroup ; 
  constructor(private fb:FormBuilder,
    private userservice: UserService,
    private router: Router) {
    let formcontrols={
      email : new FormControl(),
      motdepasse: new FormControl()
    }
    this.formg=this.fb.group(formcontrols)
   }

  ngOnInit() {
  }
  role!:"client"
  submit(){
    const usercord={
      'email':this.formg.value.email ,
      'motdepasse':this.formg.value.motdepasse,
    }
    console.log(usercord)
    this.userservice.signInemployee(usercord).subscribe((data)=>{
      this.userservice.initializeLocalStorage(data.token) ; 
      this.userservice.getTokenClaims(data.token);
      setTimeout(() => {
        this.router.navigateByUrl('client')
      }, 1500);
    }

    )
  }

}

