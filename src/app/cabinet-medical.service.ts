import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {CabinetInterface} from "./dataInterfaces/cabinet";
import {Adresse} from "./dataInterfaces/adress";
import {sexe} from "./dataInterfaces/sexe";
import {PatientInterface} from "./dataInterfaces/patient";
import {InfirmierInterface} from "./dataInterfaces/nurse";

@Injectable()
export class CabinetMedicalService {

  constructor(private http: Http) {
  }



  getData(url: string): Promise<CabinetInterface> {
    return this.http.get(url).toPromise().then(
      (response: Response) => {
        const text = response.text();
        //console.log(text);
        const parser: DOMParser = new DOMParser();
        const doc = parser.parseFromString(text, "text/xml");
        //console.log(doc);
        if (doc) {
          const cabinet: CabinetInterface = {
            infirmiers: [],
            patientsNonAffectés: [],
            adresse: this.getAdressFrom(doc.querySelector("cabinet")),
          };
          const infirmiersXML = Array.from(doc.querySelectorAll("infirmiers > infirmier"));
          cabinet.infirmiers = infirmiersXML.map(
            infXML => ( {
              id: infXML.getAttribute("id"),
              prénom: infXML.querySelector("prénom").textContent,
              nom: infXML.querySelector("nom").textContent,
              photo: infXML.querySelector("photo").textContent,
              patients: [],
              adresse: this.getAdressFrom(infXML),
            })
          )
          const patientsXML = Array.from(
            doc.querySelectorAll("patients > patient"));
          const patients: PatientInterface [] = patientsXML.map(
            patXML => ( {
              prénom: patXML.querySelector("prénom").textContent,
              nom: patXML.querySelector("nom").textContent,
              sexe: patXML.querySelector("sexe").textContent === "M" ? sexe.M : sexe.F,
              numéroSécuritéSociale : patXML.querySelector("numéro").textContent,
              adresse: this.getAdressFrom(patXML)
            })
          );

          const affectations = patientsXML.map (
            ( patXML, i) =>  {
              const visiteXML = patXML.querySelector("visite[intervenant]");
              let infirmier: InfirmierInterface = null;

              if ( visiteXML != null) {
                infirmier = cabinet.infirmiers.find (I =>
                  I.id === visiteXML.getAttribute("intervenant"));
              }

                //patients [i].adresse =

              return {patient: patients [i], infirmier: infirmier }
                        });
          affectations.forEach(affectation => {
            const  {patient , infirmier } = affectation;
            if (infirmier) {
              infirmier.patients.push(patient);
            }else {
              cabinet.patientsNonAffectés.push(patient);

            }
           //console.log(doc, affectations);
          //console.log(doc, cabinet);


        });
            return cabinet;

        }

        return null;
      });

  }

  private getAdressFrom(Root: Element): Adresse {
    let node: Element;
    return {
      ville: ( node = Root.querySelector("adresse > ville ")) ? node.textContent:"",
      codePostal: (node = Root.querySelector("adresse > codePostal")) ? parseInt(node.textContent, 10) : 0,
      rue: (node = Root.querySelector("adresse > rue")) ? node.textContent :"",
      étage: (node = Root.querySelector("adresse > etage")) ? node.textContent :"",
      numéro: (node = Root.querySelector("adresse > numéro")) ? node.textContent : "",
      lat: 0,
      lng: 0,
    };
  }
}
