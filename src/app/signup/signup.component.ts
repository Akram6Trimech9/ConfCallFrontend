import {  Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms"
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  Myform!: FormGroup;
  selectedpicture!: File;
  constructor(private Fb: FormBuilder,private userService : UserService,private router: Router, private route: ActivatedRoute) { 
    let formcontrols = {
      nom: new FormControl(),
      prenom: new FormControl(),
      email: new FormControl(),
      motdepasse: new FormControl(),
      datedenais: new FormControl()}
    this.Myform = this.Fb.group(formcontrols);
  }
  roletype = "client";
  onpictureselected(event:any) {
    this.selectedpicture = <File>event.target.files[0]
  }
  saveuser() {
    var formdata = new FormData();
    formdata.append('nom', this.Myform.value.nom)
    formdata.append('prenom', this.Myform.value.prenom)
    formdata.append('email', this.Myform.value.email)
    formdata.append('motdepasse', this.Myform.value.motdepasse)
    formdata.append('image', this.selectedpicture, this.selectedpicture.name);
    formdata.append('datenaissance', this.Myform.value.datedenais)
    formdata.append('roleType', this.roletype)
    this.userService.singupEmployee(formdata).subscribe((res)=>{

 console.log(res)
 setTimeout( ()=>{
  this.router.navigate([`/client`]);
 }, 2000)

    },err=>{
      console.error(err);
    })
    
   
  
    }
  ngOnInit(): void {
  }

}
