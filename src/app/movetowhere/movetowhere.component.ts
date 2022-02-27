import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-movetowhere',
  templateUrl: './movetowhere.component.html',
  styleUrls: ['./movetowhere.component.scss']
})
export class MovetowhereComponent implements OnInit {

  constructor(private userservice:UserService) { }

  ngOnInit(): void {
    this.takeemployee()
  }
  nom!: string ; 
  prenom!: string ; 
  image!:any  ; 
  takeemployee(){
    const tokenloc = localStorage.getItem('access_token');
    var token : any = tokenloc;
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    var tokenInfo = JSON.parse(window.atob(base64));
    this.userservice.getemployee(tokenInfo.employee_id).subscribe(res=>{
   // this.image=res.image;
   this.nom=res.nom;
   this.prenom=res.prenom;
  this.image="http://localhost:3000/"+res.image.toString().split("\\")[0]+"/"+
  res.image.toString().split("\\")[1]+"/"+res.image.toString().split("\\")[2];
  console.log(res.image)
  console.log(this.image)
    })}
}
