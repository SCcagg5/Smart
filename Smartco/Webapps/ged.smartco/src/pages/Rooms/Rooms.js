import React from "react";
import RoomTabs from "../../components/Tabs/RoomTabs";
import AltAvatarGroup from "@atlaskit/avatar-group";

export default function Rooms(props) {


    return (
        <div>
            <div>
                <h4 className="mt-0 mb-1">{props.selectedRoom.title}</h4>
                <p>{(props.selectedRoom.members || []).length} utilisateur{(props.selectedRoom.members || []).length > 1 && "s"}</p>
                <AltAvatarGroup appearance="stack" maxCount={8} borderColor="#C0C0C0" isTooltipDisabled={false} size="small"
                                data={(props.selectedRoom.members || []).map((item,key) => ({
                                    name:item.email,
                                    src:(props.contacts || []).find(x => x.email === item.email) ? ((props.contacts || []).find(x => x.email === item.email)).imageUrl : "" ,
                                    appearance:"circle",
                                    size:"small",
                                    borderColor:"#C0C0C0"
                                }))}
                />

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
                          openB64PdfModal={props.openB64PdfModal}
                          setSelectedRoom={props.setSelectedRoom}
                          openSnackbar={props.openSnackbar}
                          onLoadSharedMiniDriveData={props.onLoadSharedMiniDriveData}
                          sharedMiniDrive={props.sharedMiniDrive}
                />
            </div>
        </div>
    )

}