import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  signInForm!: FormGroup
  errorMessage!: string

//  subscription!: Subscription

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm = () => {
    this.signInForm = this.formBuilder.group({
      email: ["test4@test.fr", [Validators.required, Validators.email]],
      password: ["password", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
    })
  }

  onSubmit = () => {
    const email = this.signInForm.get("email")!.value
    const password = this.signInForm.get("password")!.value

/*    this.subscription = this.authentService.connection(email, password).subscribe({
      next: (res: any) => {
        this.authentService.authentication.authenticated = true
        this.authentService.authentication.email = email
        this.authentService.setToken(res.token)
        this.router.navigate(['documents'])
        this.errorMessage = res.message
      },
      error: (error) => {
        this.errorMessage = error.error.message
      },
      complete () {
        console.log('complete')
      }
    })
*/
  }

  ngOnDestroy() {
//    if(this.subscription) {
//      this.subscription.unsubscribe();
//    }
  }

  navigateTo(target: string) {
    this.router.navigate([target])
  }

}
