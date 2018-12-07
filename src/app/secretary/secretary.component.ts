import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {PatientComponent} from "../patient/patient.component";
import {Http} from "@angular/http";

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],

})
export class SecretaryComponent implements OnInit {
  private  cabinet: CabinetInterface = {
    infirmiers : [],
    patientsNonAffectés : [],
    adresse : null};



  currentPage = 'add-patient';
  //@ViewChild('patients') patients: PatientComponent;

    patientName: string;

    patientForName: string;

    patientNumber: string;

    patientSex: string;

    patientBirthday: string;

    patientFloor: string;

    patientStreetNumber: string;

    patientStreet: string;

    patientPostalCode: string;

    patientCity: string;


    @ViewChild("form") form: ElementRef;

  constructor(private cabinetService: CabinetMedicalService , private http: Http , private refElem: ElementRef) {
    cabinetService.getData( '/data/cabinetInfirmier.xml' )
        .then(data => this.cabinet = data);
  }



  ngOnInit() {

  }

  showPage(page: string){
    this.currentPage = page;
  }


  submit(): void{

      let allValid = true;

      let field = this.refElem.nativeElement.querySelectorAll('input, select');

      for (let i = 0; i < field.length; i++){
          if(!field[i].reportValidity())
          {
              allValid = false;
              break;
          }
      }

      if(allValid){
          this.http.post("/addPatient", {
              patientName: this.patientName,
              patientForname: this.patientForName,
              patientNumber: this.patientNumber,
              patientSex: this.patientSex || "M",
              patientBirthday: this.patientBirthday.split("/").reverse().join("-"),
              patientFloor: this.patientFloor,
              patientStreetNumber: this.patientStreetNumber,
              patientStreet: this.patientStreetNumber,
              patientPostalCode: this.patientPostalCode,
              patientCity: this.patientCity
          }).toPromise()
              .then(data => {
                  this.form.nativeElement.reset();
                  window['swal']({
                      text: 'Patient ajouté avec succès',
                      title:"Succès",
                      type: "success",
                      showCancelButton: false,
                      closeOnConfirm: true
                  }, () => {
                      this.currentPage = 'aff-patient';
                  });

              })
              .catch(error => {
                  console.log(error)
                  window['swal']({
                      text: 'Opération échouée',
                      title:"Erreur",
                      type: "error",
                  });
              })
      }

  }

}
