import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Message} from "../models/message";
import {HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  messageresponse:Message={
    message:''
  }
  user:User=new User();
  form!:FormGroup;
  constructor(private https:HttpClient) {
    this.user=new User();
  }


  onSubmit() {
    this.user.name=this.form.get('name')?.value;
    this.user.email=this.form.get('email')?.value;
    this.user.password=this.form.get('password')?.value;
    this.https.post<Message>('http://localhost:8080/register',this.user).subscribe(
      res => {
        this.messageresponse = res;
        alert(this.messageresponse.message);
      }
    )
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      "name": new FormControl("", Validators.required),
      "email": new FormControl("", Validators.required),
      "password": new FormControl("", Validators.required),
    });
  }
}
