import React from "react";
import ComptaInvoicesTable from "../../components/Tables/TableComptaFactures";



export default function ComptaInvoices(props){


    return(
        <div>
            <h4 className="mt-0 mb-1">Liste des factures </h4>

            <ComptaInvoicesTable
                factures={props.factures}
                contacts={props.contacts}
                clients_tempo={props.clients_tempo}
                annuaire_clients_mandat={props.annuaire_clients_mandat}
                rerender={props.rerender}
                show_odoo_facture={props.show_odoo_facture}
                openFacture={props.openFacture}
                openPdf={props.openPdf}
                setLoading={props.setLoading}
            />

        </div>
    )




}
