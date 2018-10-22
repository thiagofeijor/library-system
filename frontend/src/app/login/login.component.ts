import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { AppService } from "../app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginGroup: FormGroup;
  inRequest = false;

  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private appService: AppService,
    private router: Router,
    ) {
    this.loginGroup = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit() {}

  login() {
    if (this.loginGroup.valid) {
      this.inRequest = true;
      this.appService
        .login(this.loginGroup.value)
        .toPromise()
        .then((resp: any) => {
          this.inRequest = false;
          if (!!resp.auth_token) {
            localStorage.setItem('token', resp.auth_token)
            this.router.navigate(['/admin'])
          }
        })
        .catch((resp) => {
          this.inRequest = false;
          switch (resp.error.message) {
            case 'invalid_credentials':
              this.snackBar.open("Usuário ou senha inválidos!", 'Fechar');
              break;
          }
        });
    } else {
      this.snackBar.open("Todos campos são obrigatórios!", 'Fechar');
    }
  }
}
