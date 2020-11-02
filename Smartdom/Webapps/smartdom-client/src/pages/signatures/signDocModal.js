import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid"; 
import SignatureCanvas from 'react-signature-canvas'
import MenuItem from "@material-ui/core/MenuItem";
import signatureService from "../../provider/signatureService";

function getModalStyle() {
    const top = 40;
    const left = 45;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    textField: {
        marginLeft: '15%',
        marginRight: theme.spacing.unit,
        width: '80%'
    },
    media: {
        objectFit: 'cover',
        height: 100,
        width: 100,
        size: '15%'
    },
});

const types = [
    {
        value: 'Dessiner',
        label: 'Dessiner',
    },
    {
        value: 'Importer',
        label: 'Importer',
    },
];

class signDocModal extends React.Component {

    state = {
        name: '',
        eseName: '',
        signuatureUrl: '',
        signatureChoise:'Dessiner',
        signFileName:'',
        cachetFileName:'',
        signfile:'',
        codeSMSTaped:'',
    };

    sigCanvas = {};

    uploadSign = {};
    uploadCachet = {};

    componentWillMount() {
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    onChangeSignFile(event) {

        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];

        var FR= new FileReader();
        FR.addEventListener("load", (e) => {

            this.setState({
                signfile:e.target.result,
                signFileName:file.name
            });
        });
        FR.readAsDataURL(file);

    }


    onChangeCachetFile(event) {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        this.setState({
            cachetFileName:file.name
        })

    }

    render() {
        const {classes, openModal, closeModal, open, handlePDFChange } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={closeModal}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="h6" id="modal-title" style={{marginLeft:-10,marginTop:-5}}>
                            Signature
                        </Typography>
                        <Grid container>
                            <Grid item xs={4} style={{marginTop: 15}}>
                                <Typography component="p" style={{fontSize:"0.7rem"}}>
                                    Code reçu par SMS :
                                </Typography>
                            </Grid>
                            <Grid item xs={8} style={{marginTop: -10}}>
                                <TextField
                                    id="inputSMS"
                                    className={classes.textField}
                                    value={this.state.codeSMSTaped}
                                    onChange={this.handleChange('codeSMSTaped')}
                                    margin="normal"
                                />
                            </Grid>
                            {/*<Grid item xs={3} style={{marginTop: 10}}>
                                <Button variant="contained" color="secondary" disabled={this.state.codeSMSTaped.length !== 6}
                                        onClick={() => {

                                        }}
                                        style={{fontSize: 9}} >Valider</Button>
                            </Grid>*/}



                            <Grid item xs={3} style={{marginTop: 30}}>
                                <Typography component="p">
                                    Type:
                                </Typography>
                            </Grid>
                            <Grid item xs={9} style={{marginTop: 5}}>
                                <TextField
                                    id="inputchoise"
                                    select
                                    className={classes.textField}
                                    value={this.state.signatureChoise}
                                    onChange={this.handleChange('signatureChoise')}
                                    SelectProps={{
                                        MenuProps: {
                                            className: classes.menu,
                                        },
                                    }}
                                    margin="normal"
                                >
                                    {types.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {
                                this.state.signatureChoise === 'Dessiner' ?
                                    <div>
                                        <Grid item xs={12} style={{marginTop: 6,marginLeft:20}}>

                                            <div style={{width:250,height:90,border: '2px solid grey'}}>
                                                <SignatureCanvas ref={(ref) => {
                                                    this.sigCanvas = ref
                                                }} penColor='#000' canvasProps={{width: 248, height: 88, className: 'sigCanvas'}}/>
                                            </div>
                                        </Grid>
                                        <div style={{marginLeft: '75%'}}>
                                            <Button style={{fontSize: 12}} onClick={() => {
                                                this.sigCanvas.clear()
                                            }}>Effacer</Button>
                                        </div>

                                    </div>: null
                            }

                            {
                                this.state.signatureChoise === 'Importer' ?

                                    [<Grid item xs={6} style={{marginLeft:5,marginTop:10}}>
                                        <input id="inputSign"
                                               type="file"
                                               ref={(ref) => this.uploadSign = ref}
                                               style={{display: 'none'}}
                                               onChange={this.onChangeSignFile.bind(this)}
                                        />
                                        <Button  variant="outlined" color="primary" style={{fontSize: 10}}
                                                 onClick={()=>{this.uploadSign.click()}}>Imporetr une signature</Button>
                                    </Grid>,
                                        <Grid item xs={3} style={{marginLeft:5,marginTop:10}}>
                                            <Typography component="p">
                                                {this.state.signFileName}
                                            </Typography>
                                        </Grid>]: null
                            }

                            <Grid item xs={8} style={{marginTop: 15}}>
                                <Button style={{fontSize: 14}} onClick={closeModal}>Annuler</Button>
                            </Grid>
                            <Grid item xs={4} style={{marginTop: 15}}>
                                <Button variant="contained" color="secondary" style={{fontSize: 14}}

                                        disabled={this.props.codeSMSsended !== this.state.codeSMSTaped}
                                        onClick={() => {

                                            if(this.state.signatureChoise === 'Dessiner'){
                                                handlePDFChange(this.sigCanvas.getTrimmedCanvas().toDataURL('image/png'));
                                                closeModal();
                                            }

                                            if(this.state.signatureChoise === 'Importer'){

                                                handlePDFChange(this.state.signfile);
                                                closeModal();
                                            }

                                        }}>Signer</Button>
                            </Grid>


                        </Grid>
                    </div>
                </Modal>
            </div>
        );
    }
}

signDocModal.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(signDocModal);