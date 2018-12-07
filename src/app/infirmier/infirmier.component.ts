import { Component, OnInit } from '@angular/core';
import {CabinetMedicalService} from "../cabinet-medical.service";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {PatientInterface} from "../dataInterfaces/patient";
import {Http} from "@angular/http";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css'],
  /*encapsulation: ViewEncapsulation.None*/
})
export class InfirmierComponent implements OnInit {

    patientsNonAffecte: PatientInterface[] = [];
    infirmiers: InfirmierInterface[] = [];
    willAffectId:string = "none";


    //@Output()
    //selectionChange: EventEmitter<MatSelectChange> = new EventEmitter();

    constructor(private cabinetService: CabinetMedicalService, private http: Http ) {
        this.fetchData();

    }

    fetchData(){
        this.cabinetService.getData( '/data/cabinetInfirmier.xml' ).then(data => {
            //this.patientsNonAffecte = data.patientsNonAffectés;
            this.infirmiers = data.infirmiers;

            console.log(this.infirmiers)
        });
    }

    ngOnInit() {
    }


    affChanged(event){
        if(this.willAffectId !== "none"){

            window['swal']({
                text: 'Veuillez confirmer votre choix',
                title:"Confirmation requise",
                type: "warning",
                showCancelButton: true,
                closeOnConfirm: true
            },  (bool) => {
                if(bool){
                    this.http.post( "/affectation", {
                        infirmier: "none",
                        patient: this.willAffectId
                    })
                        .toPromise()
                        .then(data => {
                            setTimeout(() => {
                                window['swal']({
                                    text: 'Opération réussie',
                                    title:"Succès",
                                    type: "success",
                                    showCancelButton: false,
                                    closeOnConfirm: true
                                }, () => {
                                    this.fetchData();
                                });
                            }, 200)

                        })
                        .catch(error => {
                            window['swal']({
                                text: "Opération de désaffectation échouée",
                                title:"Erreur",
                                type: "error",
                            });
                        })
                }
                else{
                    this.willAffectId = "none";
                }
            });

        }

    }



}
