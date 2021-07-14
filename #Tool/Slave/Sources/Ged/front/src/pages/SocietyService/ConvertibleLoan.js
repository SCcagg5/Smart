import React from "react";
import calendar from "../../assets/icons/calendar_icon.jpg";
import DatePicker from "react-date-picker";
import {Divider} from "semantic-ui-react";
import moment from "moment";
import DocGenerationService from "../../provider/DocGenerationService";


export default function ConvertibleLoan(props){


    const [date, setDate] = React.useState(null);
    const [amount, setAmount] = React.useState("");
    const [businessDays, setBusinessDays] = React.useState(40);
    const [interestPercent, setInterestPercent] = React.useState("2");
    const [maturityDate, setMaturityDate] = React.useState("");
    const [conversionMethode, setConversionMethode] = React.useState("A");
    const [adminFnameSign, setAdminFnameSign] = React.useState("");
    const [emp_fname, setEmp_fname] = React.useState("");
    const [emp_adress, setEmp_adress] = React.useState("");
    const [emp_rep, setEmp_rep] = React.useState("");
    const [pret_fname, setPret_fname] = React.useState("");
    const [pret_adress, setPret_adress] = React.useState("");
    const [pret_rep, setPret_rep] = React.useState("");


    const generateConvertibleLoan = () => {
        props.setLoading(true)
        let convertible_data = {
            "data":{
                date:moment(date).format("DD-MM-YYYY"),
                borrower_desc:emp_fname + ", " + emp_adress,
                lender_desc:pret_fname + ", " + pret_adress,
                borrower_sname:emp_fname,
                lender_sname:pret_fname,
                amount:amount,
                business_days:businessDays,
                interestPercent:interestPercent,
                maturityDate:maturityDate,
                admin_fname:adminFnameSign,
                conversionMethode:conversionMethode
            }
        }
        console.log(convertible_data)
        DocGenerationService.generate_Suisse_convertible_loan(convertible_data).then( genRes => {
            console.log(genRes)
            if(genRes && genRes.data){
                props.setLoading(false)
                props.openPdf(genRes.data,"convertible_loan_"+moment().format("DD-MM-YYYY"),"pdf")
            }
        }).catch( err => {console.log(err)})
    }


    return(

        <div>
            <h4>CONTRAT DE PRÊT CONVERTIBLE</h4>

            <div style={{
                marginTop: 35,
                padding: 10,
                paddingBottom: 50,
                paddingLeft: 35,
                border: "2px solid #f0f0f0",
                minWidth: 1000
            }}>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Date</h5>
                        <DatePicker
                            calendarIcon={<img alt="" src={calendar} style={{width: 20}}/>}
                            onChange={(e) => {
                                setDate(e)
                            }}
                            value={date}
                            dayPlaceholder="dd"
                            monthPlaceholder="mm"
                            yearPlaceholder="yyyy"
                            format="dd-MM-yyyy"
                        />
                    </div>
                    <div className="col-md-6">
                        <h5>Montant du prêt(CHF)</h5>
                        <input
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value)
                            }}/>
                    </div>
                </div>
                <Divider className="mt-3"/>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Emprunteur</h5>
                        <input
                            placeholder="Nom du société"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={emp_fname}
                            onChange={(e) => {
                                setEmp_fname(e.target.value)
                            }}/>
                        <input
                            placeholder="Représentant"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={emp_rep}
                            onChange={(e) => {
                                setEmp_rep(e.target.value)
                            }}/>
                        <input
                            placeholder="Adresse"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={emp_adress}
                            onChange={(e) => {
                                setEmp_adress(e.target.value)
                            }}/>

                    </div>
                    <div className="col-md-6">
                        <h5>Prêteur</h5>
                        <input
                            placeholder="Nom du société"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={pret_fname}
                            onChange={(e) => {
                                setPret_fname(e.target.value)
                            }}/>
                        <input
                            placeholder="Représentant"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={pret_rep}
                            onChange={(e) => {
                                setPret_rep(e.target.value)
                            }}/>
                        <input
                            placeholder="Adresse"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={pret_adress}
                            onChange={(e) => {
                                setPret_adress(e.target.value)
                            }}/>
                    </div>
                </div>
                <Divider className="mt-3"/>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Nb jours à compter pour le paiement sur le compte bancaire de l'emprunteur </h5>
                        <input
                            placeholder="Adresse"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={businessDays}
                            onChange={(e) => {
                                setBusinessDays(e.target.value)
                            }}/>
                    </div>
                    <div className="col-md-6">
                        <h5>Quel taux d'intérêt pour le prêt convertible ?</h5>
                        <select className="form-control custom-select"
                                style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                onChange={(event) => {
                                    setInterestPercent(event.target.value)
                                }}
                                value={interestPercent}
                        >
                           <option value="0" label="0%"/>
                           <option value="0.5" label="0.5%"/>
                           <option value="1" label="1%"/>
                           <option value="2" label="2%"/>
                           <option value="3" label="3%"/>
                           <option value="4" label="4%"/>
                           <option value="5" label="5%"/>


                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Méthode de conversion</h5>
                        <select className="form-control custom-select"
                                style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                onChange={(event) => {
                                    setConversionMethode(event.target.value)
                                }}
                                value={conversionMethode}
                        >
                            <option value="A" label="X = A/B"/>
                            <option value="B" label="Taux de conversion fixe"/>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <h5>Date d'échéance(jours)</h5>
                        <input
                            placeholder="Nb jours ouvrés à compter de la réception par l'Emprunteur de l'avis de remboursement"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={maturityDate}
                            onChange={(e) => {
                                setMaturityDate(e.target.value)
                            }}/>
                    </div>
                </div>
                <Divider className="mt-3"/>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <h5>Administrateur de la société qui prête (2éme signature)</h5>
                        <input
                            placeholder="Nom & Prénom"
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            value={adminFnameSign}
                            onChange={(e) => {
                                setAdminFnameSign(e.target.value)
                            }}/>
                    </div>
                </div>
                <div className="mt-2" align="center">
                    <button
                        onClick={() => {
                            generateConvertibleLoan()
                        }}
                        className="btn btn-danger waves-effect waves-light mb-2">
                        <i className="mdi mdi-check mr-1"/> Valider
                    </button>
                </div>

            </div>

        </div>

    )
}
