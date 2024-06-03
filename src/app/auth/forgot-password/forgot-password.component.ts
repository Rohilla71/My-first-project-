import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = new FormGroup({

    usernameOrEmail: new FormControl('', [Validators.required, Validators.email])
  })
  constructor(private router: Router, private route: ActivatedRoute,private authService:AuthService, private snackBar: MatSnackBar) { }

	// On SignIn link click
	onSignIn() {
	  this.router.navigate(['sign-in'], { relativeTo: this.route.parent });
	}


  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.sendForgotPasswordMail(this.forgotForm.value)
    .subscribe({
      complete: () => {  }, 
      error: (error) => {  
        this.showSnackbarTopPosition('Some error occured !!!','Error','2000') 
        
      },   
      next: (resp) => {
          this.router.navigateByUrl('auth/reset-password?email='+this.forgotForm.controls['usernameOrEmail'].value+''); 
          console.log(resp)
        },  
          
  });
  }

  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }

}
