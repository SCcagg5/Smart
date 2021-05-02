import React, { useEffect, useState } from "react";
import VoiceRecorder from "../../Components/Recorder/VoiceRecorder"
import Timer from 'react-compound-timer';
import {IconButton} from "@material-ui/core";
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';


const recordAudio = () => {
    return new Promise(resolve => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                let audioChunks = [];

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                const start = () => {
                    audioChunks = [];
                    mediaRecorder.start();
                };

                const stop = () => {
                    return new Promise(resolve => {
                        mediaRecorder.addEventListener("stop", () => {
                            const audioBlob = new Blob(audioChunks);
                            const audioUrl = URL.createObjectURL(audioBlob);
                            var reader = new window.FileReader();
                            reader.readAsDataURL(audioBlob);
                            reader.onloadend = () => {
                                let base64 = reader.result.split(',')[1];
                                resolve({ audioBlob, base64 });
                            }

                        });

                        mediaRecorder.stop();
                    });
                };

                resolve({ start, stop });
            });
    });
};

export const AudioRecorder= (props) => {

    /*let [audioURL, isRecording, startRecording, stopRecording] = VoiceRecorder();*/
    const [isRecording,setIsRecording] = useState(false)
    const [record,setRecord] = useState(null)

    useEffect( () => {
        callRecorder()
    },[])

    async function callRecorder(){
        let recorder = await recordAudio();
        setRecord(recorder)
    }

    return(
        <div style={{alignSelf:"center",flex:"none",margin:10,display:"flex"}} >

                <Timer
                    initialTime={0}
                    startImmediately={false}
                >
                    {({ start, resume, pause, stop, reset, getTimerState, getTime }) => (
                        <React.Fragment>
                            {
                                isRecording === true &&
                                <div
                                    align="center"
                                    style={{
                                        color: '#000',
                                        fontSize: 15,
                                        margin:10,
                                        marginLeft:0
                                    }}>

                                    <HighlightOffOutlinedIcon color="error" style={{marginRight:10,fontSize:"1.79rem"}}
                                                              onClick={ async () => {
                                                                  reset()
                                                                  stop()
                                                                  record.stop();
                                                                  setIsRecording(false)
                                                              }}
                                                              fontSize="large"
                                    />
                                    {/*<div className="recorder_animate"></div>  */}
                                    <Timer.Minutes
                                        formatValue={(value) => `${(value < 10 ? `${value}` : value)}:`} />
                                    <Timer.Seconds
                                        formatValue={(value) => `${(value < 10 ? `0${value}` : value)}`} />
                                    <CheckCircleOutlinedIcon color="primary" style={{marginLeft:10,fontSize:"1.79rem"}}
                                                             onClick={ async () => {
                                                                 const audio = await record.stop();
                                                                 props.addAudioMsg(audio.base64,getTime())
                                                                 setIsRecording(false)
                                                                 reset()
                                                                 stop()
                                                             }}
                                    />

                                </div>
                            }

                            {
                                isRecording === false &&
                                <i className="fa fa-microphone attachment" aria-hidden="true"
                                   style={{
                                       fontSize: 20,
                                       cursor: "pointer",
                                       color:isRecording === true ? "red" : "#919191",
                                       margin:10,
                                       marginLeft:0
                                   }}
                                   onClick={async (event) => {
                                       record.start()
                                       setIsRecording(true)
                                       start()
                                   }}
                                />
                            }

                        </React.Fragment>
                    )}
                </Timer>
        </div>
    )
};



