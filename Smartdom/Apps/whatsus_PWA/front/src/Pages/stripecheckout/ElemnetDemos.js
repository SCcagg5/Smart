import React from "react";
import {
    useLocation,
    withRouter
} from "react-router-dom";
import SplitForm from "../../Components/stripe/SplitForm";

const ElementDemos = ({ history , produits }) => {
    const location = useLocation();


    return (
        <div className="DemoWrapper">

          <div className="Demo">
              <SplitForm produits={produits} history={history} />
          </div>
        </div>
    );
};

export default withRouter( ElementDemos);
