import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'jquery';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  hide = true;
  returnUrl: string;
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

    constructor(private router: Router, private route: ActivatedRoute, private authService:AuthService,
      private snackBar: MatSnackBar
    ) {
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/shop'
     }

    // On Forgotpassword link click
    onForgotpassword() {
      this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
    }
  
    // On Signup link click
    onSignup() {
      this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
    }

    onSubmit()  {
      this.authService.login(this.loginForm.value)
      .subscribe({
        complete: () => {  }, 
        error: (error) => {  
          this.showSnackbarTopPosition('Invalid email or password !!!','Error','2000') 
          console.log(error)
        },   
        next: () => {  this.router.navigate(['']) },     // nextHandler
    });
      // .subscribe({
      //   next: () =>  this.router.navigate(['']),//this.router.navigateByUrl(this.returnUrl)
      // })
      
    
    }
  

  ngOnInit(): void {
  }

  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }



}
