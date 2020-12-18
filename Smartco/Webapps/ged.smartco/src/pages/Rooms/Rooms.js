import React from "react";
import RoomTabs from "../../components/Tabs/RoomTabs";
import AvatarGroup from '@atlaskit/avatar-group';

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
                          annuaire_clients={props.annuaire_clients}
                          room={props.selectedRoom}
                          addNewTask={(title,selectedClient, assignedTo,teamEmails,selectedDateTime) => {
                              props.addNewtask(title,selectedClient, assignedTo, teamEmails, selectedDateTime )
                          }}
                          onDeleteTask={(key) => props.onDeleteTask(key) }
                          onDropFile={(node) => props.onDropFile(node)}
                />
            </div>
        </div>
    )

}