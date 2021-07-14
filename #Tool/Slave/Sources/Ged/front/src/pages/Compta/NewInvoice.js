import React from "react";
import main_functions from "../../controller/main_functions";
import SelectSearch from 'react-select-search';
import calendar from "../../assets/icons/calendar_icon.jpg";
import DatePicker from "react-date-picker";

export default function NewInvoice(props){


    const [client, setClient] = React.useState("");
    const [client_case, setClient_case] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [date, setDate] = React.useState(null);
    const [amount, setAmount] = React.useState("");
    const [currency, setCurrency] = React.useState("");
    const [tva, setTva] = React.useState("");


    const renderClientCases = (client_id) => {
        let cases = [];
        let clientsTempo = props.clients_tempo || [];
        clientsTempo.map((tmp, key) => {
            (tmp.folders || []).map((f, i) => {
                if (tmp.ID_client === client_id) {
                    cases.push({
                        value: f.folder_id,
                        label: f.name
                    })
                }
            })
        })
        return (
            cases.map((item, key) => (
                <option key={key} value={item.value}>{item.label}</option>
            ))
        )
    }


    return(
        <div>
            <h4 className="mt-0 mb-1">Ajouter une nouvelle facture</h4>

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
                        <h5>Nom du client</h5>
                        <SelectSearch
                            options={
                                props.annuaire_clients_mandat.map(({ contactName,societyName, type, imageUrl, ID }) =>
                                    ({
                                        value: ID,
                                        name: contactName,
                                        ContactType: type,
                                        ContactName: contactName,
                                        societyName:societyName,
                                        imageUrl: imageUrl
                                    }))
                            }
                            value={client}
                            renderOption={main_functions.renderSearchOption}
                            search
                            placeholder="Chercher votre client"
                            onChange={e => {
                                console.log(e)
                                setClient(e)
                                let cases = [];
                                let clientsTempo = props.clients_tempo || [];
                                clientsTempo.map((tmp,key) => {
                                    (tmp.folders || []).map((f,i) => {
                                        if(tmp.ID_client === e){
                                            cases.push({
                                                value:f.folder_id,
                                                label:f.name
                                            })
                                        }
                                    })
                                })
                                setClient_case(cases.length > 0 ? cases[0].value : "")
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <h5>Dossier du client </h5>
                        <select className="form-control custom-select"
                                style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                                onChange={(event) => {
                                    setClient_case(event.target.value)
                                }}
                                value={client_case}
                        >
                            {
                                renderClientCases(client)
                            }


                        </select>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <h5>Description</h5>
                        <textarea
                            className="form-control "
                            id="ezefze"
                            style={{width: 300, border: "2px solid #f0f0f0", borderRadius: 7.5}}
                            name="ezefze"
                            rows={3}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                    </div>
                    <div className="col-md-6">
                        <h5>Date facture</h5>
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
                </div>
            </div>
        </div>

    )


}
