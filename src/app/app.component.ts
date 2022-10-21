import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { ApiHandlerService } from './services/api-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'my-app';
  registerForm!: FormGroup;
  @ViewChild('submitbutton') submitBtn!: ElementRef;

  constructor(private fb: FormBuilder, private apiHandler: ApiHandlerService) {
    this.createForm();
    this.handleFormChanges();
  }
  ngAfterViewInit(): void {
    fromEvent(this.submitBtn.nativeElement, 'click').subscribe((data) => {
      // console.log(data);
      this.apiHandler.callApi();
    });

    this.apiHandler.callApi();
  }

  createForm() {
    //   this.registerForm = this.fb.group({
    //     email: ['', Validators.compose([Validators.required, Validators.email])]
    //   },
    //     { pwrd: ['****', Validators.compose([Validators.required])] }
    // })
    this.registerForm = this.fb.group({
      uname: ['', Validators.compose([Validators.required, this.userNameValidator])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pwrd: ['*****', Validators.compose([Validators.required])]
    })

  }
  userNameValidator(control: FormControl) {

    if (control.value) {
      const enteredValue = control.value;
      //Allowing numbers, letters and underscore in user id
      //const supportedChar = control.value.replace(/[^a-zA-Z0-9_]/g, '');
      var regExp = /^[a-zA-Z0-9_]*$/g;
      const isValid = regExp.test(control.value);
      console.log(control.value, regExp.test(control.value), isValid);
      return isValid ? null : { 'invalidname': true };
    }
    return null;
  }
  handleFormChanges() {
    this.registerForm.valueChanges.subscribe(resp => {
      console.log("handle Form changes: ", resp);
      // this.registerForm.get('uname')?.valueChanges.subscribe((data) => {
      //   console.log(data);
      // })
    })

  }
  getForm() {
    return this.registerForm;
  }

  submit() {

  }
}

