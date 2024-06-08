import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errors: string[] | null = null;
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    isActive: new FormControl(true)
  })

  constructor(private router: Router, private route: ActivatedRoute,private authService:AuthService,
    private snackBar: MatSnackBar
  ) {

    
   }


  // On Signup link click
  onSubmit() {
    this.authService.register(this.signUpForm.value)
    
    .subscribe({
      complete: () => {  }, 
      error: (error) => {  
        
        this.showSnackbarTopPosition(error.error,'Error','2000') 
      },   
      next: () => {  
        this.showSnackbarTopPosition('User created successfully !!!','Success','2000') 
       },     // nextHandler
  });
  // .subscribe(res=>{
  //   })
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

  
  
  countries: string[] = [
    'India',
    'America',
    'China',
    'Arab',
    'Dubai',
    'Japan',
    'Nepal',
    'England',
    'Canada',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];


}
