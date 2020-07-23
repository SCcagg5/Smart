import React from "react";
import moment from "moment";
import Highlighter from "react-highlight-words";

class SearchResults extends React.Component {


    constructor(prop) {
        super(prop);
        this.state = {
            showResultsContainer: true
        }
    }

    componentDidMount() {
        this.setState({showResultsContainer: true})
    }

    render() {
        let results = this.props.data;
        let textSearch = this.props.textSearch;

        let textToSearch = "";

        results.data.matches.map((item, key) => {
            item.match.perfect ?
                (item.match.perfect.data || []).map((text, k) => {
                    textToSearch = textToSearch.concat(text).concat(". ... ");
                }) :
                (item.match.fuzzy.data || []).map((text, k) => {
                    textToSearch =  textToSearch.concat(text).concat(". ... ");
                })
        });

        return (

            this.state.showResultsContainer === true &&
            <div className="card">
                <div className="card-body">

                    <a style={{color: 'hover: #21a5c2 !important', cursor: 'pointer'}}
                       onClick={() => this.setState({showResultsContainer: false})}
                       className="float-right text-info">
                        <i className="far fa-window-close font-18"/>
                    </a>

                    <ul className="nav nav-tabs nav-bordered">
                        <li className="nav-item">
                            <a href="#home" data-toggle="tab" aria-expanded="true" className="nav-link active">
                                Tous les résultats <span
                                className="badge badge-success ml-1">{results.data.matches.length}</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#docs" data-toggle="tab" aria-expanded="false" className="nav-link">
                                Documents <span className="badge badge-danger ml-1">{results.data.matches.length}</span>
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane active" id="home">
                            <div className="row">
                                <div className="col-md-12">

                                    {
                                        results.data.matches.map((item, key) => (

                                            <div className="search-item mb-2" key={key}>
                                                <div className="row inside">
                                                    <div className="mr-2 btn btn-danger btn-sm">{item.lang}</div>
                                                    <h4 className="mb-1"><a href={item.url} target="_blank"
                                                                            rel="noopener noreferrer">{item.title}</a>
                                                    </h4>
                                                </div>

                                                <div className="font-13 text-success mb-2 text-truncate mt-1">
                                                    {item.url}
                                                </div>

                                                <Highlighter
                                                    highlightClassName="YourHighlightClass"
                                                    searchWords={[textSearch]}
                                                    autoEscape={true}
                                                    textToHighlight={textToSearch}
                                                />

                                            </div>
                                        ))
                                    }


                                    <div className="clearfix"/>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane" id="docs">
                            <div className="row">
                                <div className="col-md-12">


                                    <div className="file-box-content">

                                        {
                                            results.data.matches.map((item, key) => (


                                                <div className="file-box" key={key}>
                                                    <a href={item.url} download={item.title} target="_blank"
                                                       rel="noopener noreferrer" className="download-icon-link">
                                                        <i className="dripicons-download file-download-icon"
                                                           style={{cursor: "pointer"}}/>
                                                    </a>
                                                    <div className="text-center">
                                                        <i className="far fa-file-pdf text-danger"/>
                                                        <h6 className="text-truncate">{item.title}</h6>
                                                        <small className="text-muted">{moment().format("DD MMM YYYY")} /
                                                            4MB</small>
                                                    </div>
                                                </div>

                                            ))
                                        }


                                    </div>


                                    <div className="clearfix"/>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

        )
    }

}

export default SearchResults;