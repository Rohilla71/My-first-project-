import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { confirmPasswordValidator } from 'src/app/Validators/confirm-password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {


  email:string
  resetForm = new FormGroup({
    password : new FormControl('', [Validators.required]),
    confirmPassword : new FormControl('', [Validators.required]),
    code: new FormControl('', [Validators.required])
  },
  { validators: [confirmPasswordValidator] })
  constructor(private router: Router, private route: ActivatedRoute,private authService:AuthService , private snackBar: MatSnackBar) { }



	// On Login link click
	onLogin() {
	  this.router.navigate(['sign-in'], { relativeTo: this.route.parent });
	}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
  });
  }

  onSubmit() {
    // this.showSnackbarTopPosition('Net is offline, Trying to reconnect in 2 seconds....','Done','1000')
    var rsetObj ={
      usernameOrEmail : this.email,
      newPassword :this.resetForm.controls['password'].value,
      code :this.resetForm.controls['code'].value.toString()
    }
    this.authService.resetPassword(rsetObj)
    .subscribe({
      complete: () => {  }, 
      error: (error) => {  
        this.showSnackbarTopPosition('Some error occured !!!','Error','2000') 
      },   
      next: (resp) => { 
        this.showSnackbarTopPosition('Password updated sucessfully !!!','Error','2000') 
        },     // nextHandler
  });
    
    
  //   .subscribe(res=>{
  //     this.showSnackbarTopPosition('Some error occured !!!','Error','2000') 

  // }) 
  }


    
  openSnackBar(message: string, action: string) {
    //this.snackBar.open(message, action);
  }
  showSnackbar(content) {
    this.snackBar.open(content);
  }
  showSnackbarAction(content, action) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {
    });
    snack.onAction().subscribe(() => {
    });
  }
  showSnackbarDuration(content, action, duration) {
    this.snackBar.open(content, action, duration);
  }
  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
  showSnackbarCssStyles(content, action, duration) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
}
