import React from 'react';
import utilFunctions from "../tools/functions";
import moment from "moment";
import rethink from "../controller/rethink";

const db_name = "OA_LEGAL"

export default class test extends React.Component{



  state={

  }

  componentDidMount() {
  }


  render() {
    return(
      <div style={{marginTop:50}}>
        <button
            onClick={() => {
              rethink.tableList(db_name,"test").then(tablesRes => {

                tablesRes.map((item, key) => {

                  rethink.getTableData(db_name, "test", item).then( rr => {

                    utilFunctions.createJsonFile(JSON.stringify(rr),"oa_"+item+"-"+moment().format("DD-MM-YYYY-HH-mm")+".json","application/json")
                  })
                })
              })

            }}
            className="btn btn-sm btn-outline-info">Get All OA DATA
        </button>
      </div>
    )

  }


}