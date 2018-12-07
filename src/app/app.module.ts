import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CabinetMedicalService } from './cabinet-medical.service';
import { SecretaryComponent } from './secretary/secretary.component';
import {HttpModule} from "@angular/http";
import { PatientComponent } from './patient/patient.component';
import {
    MatButtonModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatInput, MatInputModule, MatOption,
    MatOptionModule,
    MatSelect, MatSelectModule
} from "@angular/material";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from "@angular/forms";
import {InfirmierComponent} from "./infirmier/infirmier.component";

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    PatientComponent,
      InfirmierComponent
  ],
  imports: [
    BrowserModule,
      HttpModule,
      FormsModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatOptionModule
  ],
  providers: [CabinetMedicalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
