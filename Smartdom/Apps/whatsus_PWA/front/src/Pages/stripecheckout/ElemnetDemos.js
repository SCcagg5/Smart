import React from "react";
import {
    Switch,
    Route,
    Redirect,
    useLocation,
    useHistory
} from "react-router-dom";
import SplitForm from "../../Components/stripe/SplitForm";

const ElementDemos = ({ demos }) => {
    const location = useLocation();
    const history = useHistory();

    return (
        <div className="DemoWrapper">

          <div className="Demo">
              <SplitForm />
          </div>
        </div>
    );
};

export default ElementDemos;
