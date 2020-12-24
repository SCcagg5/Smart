import React from "react";
import RoomTabs from "../../components/Tabs/RoomTabs";

export default function Rooms(props) {

    return(
        <div>
            <div>
                        <h4 className="mt-0 mb-1">{props.selectedRoom.title}</h4>
                        <p>{(props.selectedRoom.members || []).length} membres</p>
                        <RoomTabs contacts={props.contacts}
                                  annuaire_clients={props.annuaire_clients}
                                  room={props.selectedRoom}
                                  addNewTask={(title,selectedClient, assignedTo,teamEmails,selectedDateTime) => {
                                      props.addNewtask(title,selectedClient, assignedTo, teamEmails, selectedDateTime )
                                  }}
                                  onDeleteTask={(key) => props.onDeleteTask(key) }
                                  onDropFile={(node) => props.onDropFile(node)}
                                  history={props.history}
                        />
                    </div>
        </div>
    )

}