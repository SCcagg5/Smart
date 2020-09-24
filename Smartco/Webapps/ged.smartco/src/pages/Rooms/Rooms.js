import React from "react";
import RoomTabs from "../../components/Tabs/RoomTabs";

export default function Rooms(props) {

    return(
        <div>
            {
                props.rooms.length === 0 ?
                    <div>
                        <h4 className="mt-0 mb-1">Rooms</h4>
                        <div style={{marginTop: 25, display: "flex"}}>
                            <h5 style={{fontSize: 16, color: "gray"}}>
                                Aucune "Room" encore ajouté !</h5>&nbsp;&nbsp;
                            <h6 style={{
                                cursor: "pointer",
                                color: "#000",
                                textDecoration: "underline", marginTop: 12
                            }} onClick={() => {props.openNewRoomModal()}}
                            >
                                Ajouter une</h6>
                        </div>
                    </div> :

                    <div>
                        <h4 className="mt-0 mb-1">{props.selectedRoom.title}</h4>
                        <p>{props.selectedRoom.members.length} membres</p>
                        <RoomTabs contacts={props.contacts}
                                  annuaire_clients={props.annuaire_clients}
                                  room={props.selectedRoom}
                                  addNewTask={(title, assignedTo,teamEmails,selectedDateTime) => {
                                      props.addNewtask(title, assignedTo, teamEmails, selectedDateTime )
                                  }}
                                  onDeleteTask={(key) => props.onDeleteTask(key) }
                                  onDropFile={(node) => props.onDropFile(node)}
                        />
                    </div>
            }

        </div>
    )

}