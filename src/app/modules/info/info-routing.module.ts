import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "../user/services/authguard.service";
import { CanActivate } from "@angular/router/src/utils/preactivation";

const routes: Routes = [
  {
    path: "info/release",
    loadChildren: "./pages/info/info.module#InfoPageModule",
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {}
