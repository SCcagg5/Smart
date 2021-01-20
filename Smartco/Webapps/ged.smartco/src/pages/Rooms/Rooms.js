import React from "react";
import RoomTabs from "../../components/Tabs/RoomTabs";
import AvatarGroup from '@atlaskit/avatar-group';
import "./room.css"

export default function Rooms(props) {

    /*const data = (props.selectedRoom.members || []).map(d => ({
        email: d.email,
        key: d.uid,
        name: d.name,
        href: '#',
    }));*/

    return(
        <div>
            <div>
                <h4 className="mt-0 mb-1">{props.selectedRoom.title}</h4>
                <p>{(props.selectedRoom.members || []).length} membres</p>
                {/*<AvatarGroup appearance="stack" data={data} />*/}
                <RoomTabs contacts={props.contacts}
                          annuaire_clients_mandat={props.annuaire_clients_mandat}
                          room={props.selectedRoom}
                          addNewTask={(title, desc, assignedTo, client, teamEmails, priority, tags, date_deadline) => {
                              props.addNewtask(title, desc, assignedTo, client, teamEmails, priority, tags, date_deadline)
                          }}
                          onDeleteTask={(key) => props.onDeleteTask(key)}
                          onDropFile={(node) => props.onDropFile(node)}
                          history={props.history}
                          selectedRoomTab={props.selectedRoomTab}
                          handleRoomTabsChange={props.handleRoomTabsChange}
                          miniDrive={props.miniDrive}
                          openPdfModal={props.openPdfModal}
                          setSelectedRoom={props.setSelectedRoom}
                          openSnackbar={props.openSnackbar}
                />
            </div>
        </div>
    )

}
