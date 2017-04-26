import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const settingsRoutes = [
];
@NgModule({
    imports: [
        RouterModule.forChild(settingsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class SettingsRoutingModule { }