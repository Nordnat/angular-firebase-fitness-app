import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UiService} from "../../shared/ui.service";
import {takeWhile} from "rxjs/operators";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate;
  isLoading = false;
  private alive = true;

  constructor(private authService: AuthService, private uiService: UiService) { }

  ngOnInit(): void {
    this.uiService.loadingStateChanged
      .pipe(
        takeWhile(() => this.alive)
      ).subscribe(state => {
      this.isLoading = state;
    })
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
