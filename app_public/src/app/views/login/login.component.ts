import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HistoryService } from '../../services/history.service';
import { PageInfo } from '../../interfaces/PageInfo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs/operators';
import { Subscription, throwError } from 'rxjs';
import { User } from '../../classes/user';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, PageInfo, OnDestroy {

  form: FormGroup;

  private lSub: Subscription;

  submitted: boolean;

  public formError = '';

  public pageContent = {
    header: {
      title: 'Sign in to Loc8r',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private historyService: HistoryService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.lSub) {
      this.lSub.unsubscribe();
    }
  }

  /**
   * Init form
   * @private
   */
  private initForm(): void {
    this.form = new FormGroup(
      {
        email: new FormControl(null, [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(6)
        ])
      }
    );
  }

  /**
   * Submit to register
   */
  public onLoginSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loadingService.loadingOn();
    this.submitted = true;

    this.doLogin();
  }

  /**
   * Registration
   *
   * @private
   */
  private doLogin(): void {

    const user: User = this.form.value;

    this.lSub = this.authenticationService
      .login(user)
      .pipe(
        catchError(err => {
          this.formError = err.error.message;
          console.error('While logging ...', err);
          return throwError(err);
        }),
        finalize(() => {
          this.loadingService.loadingOff();
          this.submitted = false;
        })
      )
      .subscribe(() => {
        const lastUrl = this.historyService.getLastNonLoginUrl();
        this.router.navigateByUrl(lastUrl);
      });
  }
}
