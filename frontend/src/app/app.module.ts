import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppCommonModule } from "./common.module";
import { ListComponent } from "./list/list.component";
import { LoginComponent } from './login/login.component';
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [AppComponent, ListComponent, LoginComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule,
    AppCommonModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
