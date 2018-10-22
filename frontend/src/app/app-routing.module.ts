import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { AuthGuard } from "./auth.guard";

const appRoutes: Routes = [
  { path: "", component: ListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: "admin",
    loadChildren: "src/app/admin/admin.module#AdminModule",
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
