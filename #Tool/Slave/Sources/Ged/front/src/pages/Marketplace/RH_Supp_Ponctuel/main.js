import React from "react";

export default class main extends React.Component{

    state={

    }


    render() {
        return(
            <div>
                <h4 className="mt-0 mb-1">Contacts de fournisseurs de prestations de services</h4>
                <div className="mt-2" style={{textAlign:"right"}}>
                    <div className="text-sm-right">
                        <button
                            onClick={() => {
                                //this.props.onAddBtnClick()
                            }}
                            className="btn btn-danger waves-effect waves-light mb-2">
                            <i className="mdi mdi-plus-circle mr-1" /> Ajouter
                        </button>
                    </div>
                </div>
                <div>

                </div>
            </div>
        )
    }

}