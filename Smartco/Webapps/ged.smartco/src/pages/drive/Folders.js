import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ListIcon from "@material-ui/icons/List";
import SearchResults from "../../components/Search/SearchResults";
import SmartService from "../../provider/SmartService";
import ListFolders from "../../components/List/ListFolders";
import ListDocs from "../../components/List/ListDocs";
import {FileUploader} from "baseui/file-uploader";
import axios from "axios";
import data from "../../data/Data";
import {Button, SHAPE, SIZE} from "baseui/button";
import {ALIGN, Radio, RadioGroup} from "baseui/radio";
import {Checkbox, LABEL_PLACEMENT, STYLE_TYPE} from "baseui/checkbox";
import {isEmail, ReactMultiEmail} from "react-multi-email";
import {Select} from "baseui/select";
import swissImg from "../../assets/images/flags/swiss.svg";
import euImg from "../../assets/images/flags/eu.svg";
import frImg from "../../assets/images/flags/france.png";
import {Textarea} from "baseui/textarea";
import PDFViewer from "../../customComponents/pdf-viewer-reactjs";
import Draggable from "react-draggable";
import Delete from "baseui/icon/delete";

const getLabel = ({option}) => {
     return (
          <React.Fragment>
               {" "}
               <img src={option.image} alt="" style={{width: 30, height: 30}} />
               &nbsp;&nbsp;{option.id}
          </React.Fragment>
     );
};

export default class Folders extends React.Component{

     state={

     }

     componentDidMount() {

          this.setState(this.props.state)
     }

     render() {

          console.log(this.state)


          return(

               <div>
                    {
                         this.state.showNewDocScreen === false ?
                              (this.state.loading === false && this.state.firstLoading === false && (
                                        <div>
                                             <div
                                                  style={{
                                                       display: "flex",
                                                       justifyContent: "space-between",
                                                  }}
                                             >
                                                  <div style={{width: "100%"}}>
                                                       <h5 className="mt-0 mb-1">
                                                            {this.props.location.pathname === "search"
                                                                 ? "Résultats de recherche"
                                                                 : this.props.location.pathname ===
                                                                 "/home/drive"
                                                                      ? "Mon drive"
                                                                      : this.state.breadcrumbs}
                                                       </h5>
                                                       <div
                                                            style={{
                                                                 position: "absolute",
                                                                 right: 25,
                                                                 marginTop: -44,
                                                            }}
                                                       >
                                                            <IconButton
                                                                 aria-label={
                                                                      this.state.viewMode === "list"
                                                                           ? "Vue liste"
                                                                           : "Vue grille"
                                                                 }
                                                                 onClick={() => {
                                                                      this.state.viewMode === "list"
                                                                           ? this.setState({
                                                                                viewMode: "grid",
                                                                           })
                                                                           : this.setState({
                                                                                viewMode: "list",
                                                                           });
                                                                 }}
                                                                 title={
                                                                      this.state.viewMode === "list"
                                                                           ? "Vue liste"
                                                                           : "Vue grille"
                                                                 }
                                                                 color="default"
                                                            >
                                                                 {this.state.viewMode === "list" ? (
                                                                      <ViewComfyIcon />
                                                                 ) : (
                                                                      <ListIcon />
                                                                 )}
                                                            </IconButton>
                                                       </div>
                                                       <div
                                                            style={{
                                                                 height: 1,
                                                                 backgroundColor: "#dadce0",
                                                                 marginBottom: 15,
                                                                 marginTop: 15,
                                                            }}
                                                       />
                                                  </div>
                                             </div>
                                             <div
                                                  style={{
                                                       flexWrap: "wrap",
                                                       display: "block",
                                                  }}
                                             >
                                                  {this.props.match.params.section === "search" ? (
                                                       <div>
                                                            <SearchResults
                                                                 textSearch={this.state.textSearch}
                                                                 data={this.state.searchResult}
                                                                 viewMode={this.state.viewMode}
                                                                 onClickDoc={(item) =>
                                                                      this.setState({
                                                                           selectedDoc: item,
                                                                           openRightMenu: true,
                                                                      })
                                                                 }
                                                                 onPdfIconClick={(item) => {
                                                                      this.setState({loading: true});
                                                                      //console.log(item)
                                                                      SmartService.getFile(
                                                                           item.file_id,
                                                                           localStorage.getItem("token"),
                                                                           localStorage.getItem("usrtoken"),
                                                                      )
                                                                           .then((fileRes) => {
                                                                                if (
                                                                                     fileRes.succes === true &&
                                                                                     fileRes.status === 200
                                                                                ) {
                                                                                     this.setState({
                                                                                          loading: false,
                                                                                     });
                                                                                     this.showDocInPdfModal(
                                                                                          fileRes.data.Content.Data,
                                                                                     );
                                                                                } else {
                                                                                     console.log(fileRes.error);
                                                                                }
                                                                           })
                                                                           .catch((err) => console.log(err));
                                                                 }}
                                                                 setLoading={(b) =>
                                                                      this.setState({loading: b})
                                                                 }
                                                            />
                                                       </div>
                                                  ) : this.state.folders.length === 0 &&
                                                  this.state.rootFiles.length === 0 ? (
                                                       <div
                                                            style={{
                                                                 marginTop: 25,
                                                                 display: "flex",
                                                            }}
                                                       >
                                                            <h5
                                                                 style={{
                                                                      fontSize: 16,
                                                                      color: "gray",
                                                                 }}
                                                            >
                                                                 Aucun dossier encore ajouté !
                                                            </h5>
                                                            &nbsp;&nbsp;
                                                            <h6
                                                                 style={{
                                                                      cursor: "pointer",
                                                                      color: "#000",
                                                                      textDecoration: "underline",
                                                                 }}
                                                                 onClick={() => {
                                                                      this.setState({
                                                                           newFolderModal: true,
                                                                           newFolderFromRacine: true,
                                                                      });
                                                                 }}
                                                            >
                                                                 Ajouter un dossier
                                                            </h6>
                                                       </div>
                                                  ) : (
                                                       <div>
                                                            <ListFolders
                                                                 items={this.state.rootFolders}
                                                                 onDoubleClickFolder={(folder) => {
                                                                      this.props.history.push({
                                                                           pathname: "/home/drive/" + folder.id,
                                                                      });
                                                                      this.setState({
                                                                           selectedDriveItem: [folder.id],
                                                                           expandedDriveItems: [folder.id],
                                                                           autoExpandParent: true,
                                                                           selectedFolder: this.getFolderById(
                                                                                folder.id,
                                                                                this.state.folders,
                                                                           ),
                                                                           selectedFoldername: folder.name,
                                                                           selectedFolderFiles:
                                                                                folder.Content.files || [],
                                                                           selectedFolderFolders:
                                                                                folder.Content.folders || [],
                                                                           focusedItem: "Drive",
                                                                           breadcrumbs: this.getBreadcumpsPath(
                                                                                folder.id,
                                                                                this.state.reelFolders.concat(
                                                                                     this.state.sharedDrive,
                                                                                ),
                                                                           ),
                                                                           selectedFolderId: folder.id,
                                                                           showContainerSection: "Drive",
                                                                      });
                                                                 }}
                                                            />
                                                            <ListDocs
                                                                 docs={this.state.rootFiles || []}
                                                                 viewMode={this.state.viewMode}
                                                                 onDocClick={(item) =>
                                                                      this.setState({
                                                                           selectedDoc: item,
                                                                           openRightMenu: true,
                                                                      })
                                                                 }
                                                                 showDoc={(doc) =>
                                                                      this.openPdfModal(doc.id)
                                                                 }
                                                                 setLoading={(b) =>
                                                                      this.setState({loading: b})
                                                                 }
                                                                 setSelectedFile={(file) =>
                                                                      this.setState({
                                                                           selectedFile: file,
                                                                      })
                                                                 }
                                                                 openShareFileModal={() =>
                                                                      this.setState({
                                                                           openShareDocModal: true,
                                                                      })
                                                                 }
                                                                 onDeleteFile={(file) => {
                                                                      this.deleteFile_Folder(file);
                                                                 }}
                                                                 onRenameFile={(file, newName) => {
                                                                      this.renameFile_Folder(file, newName);
                                                                 }}
                                                                 onSignBtnClick={(id) => {
                                                                      this.props.history.push(
                                                                           "/signDoc/doc/" + id,
                                                                      );
                                                                 }}
                                                            />
                                                       </div>
                                                  )}
                                             </div>
                                        </div>
                                   )
                              ) : (
                                   <div>
                                        {this.state.showUploadStep === "upload" && (
                                             <div>
                                                  <div className="">
                                                       <button
                                                            className="btn btn-sm btn-light"
                                                            onClick={() =>
                                                                 this.setState({
                                                                      showNewDocScreen: false,
                                                                      newFileFromRacine: false,
                                                                 })
                                                            }
                                                       >
                                                            <i
                                                                 className="mdi mdi-arrow-left font-16"
                                                                 style={{
                                                                      color: "#000",
                                                                      fontWeight: "bold",
                                                                 }}
                                                            />
                                                            &nbsp;Retour
                                                       </button>
                                                  </div>
                                                  <div align="center"
                                                       className="mt-5">
                                                       <h1 className="skh1">
                                                            Télécharger un document
                                                       </h1>
                                                       <p
                                                            style={{fontSize: "1rem"}}
                                                            className="mt-2"
                                                       >
                                                            Faites glisser et déposez un documents PDF
                                                            sur le terrain ou sélectionnez un fichier
                                                            depuis votre ordinateur.
                                                       </p>
                                                       <div className="sk_elupload_drag">
                                                            <FileUploader
                                                                 onCancel={() => {
                                                                 }}
                                                                 onDrop={(acceptedFiles, rejectedFiles) => {
                                                                      let formData = new FormData();
                                                                      formData.append("file", acceptedFiles[0]);
                                                                      this.state.selectedFolderId !== ""  &&
                                                                      formData.append(
                                                                           "folder_id",
                                                                           this.state.selectedFolderId,
                                                                      );
                                                                      axios.request({
                                                                           method: "POST",
                                                                           url:
                                                                                data.endpoint +
                                                                                "/ged/896ca0ed-8b4a-40fd-aeff-7ce26ee1bcf9/doc/addfile",
                                                                           data: formData,
                                                                           headers: {
                                                                                "Content-Type":
                                                                                     "multipart/form-data",
                                                                                token: localStorage.getItem(
                                                                                     "token",
                                                                                ),
                                                                                usrtoken: localStorage.getItem(
                                                                                     "usrtoken",
                                                                                ),
                                                                           },
                                                                           onUploadProgress: (p) => {
                                                                                this.setState({
                                                                                     progressUpload:
                                                                                          (p.loaded / p.total) * 100,
                                                                                });
                                                                           },
                                                                      })
                                                                           .then((res) => {
                                                                                if (
                                                                                     res.data.succes === true &&
                                                                                     res.data.status === 200
                                                                                ) {
                                                                                     SmartService.getFile(
                                                                                          res.data.data.file_id,
                                                                                          localStorage.getItem("token"),
                                                                                          localStorage.getItem("usrtoken"),
                                                                                     )
                                                                                          .then((fileRes) => {
                                                                                               if (
                                                                                                    fileRes.succes === true &&
                                                                                                    fileRes.status === 200
                                                                                               ) {
                                                                                                    this.setState({
                                                                                                         newFileFromRacine: false,
                                                                                                         showNewDocScreen: false,
                                                                                                         progressUpload: undefined,
                                                                                                         showUploadStep: "",
                                                                                                         uploadedName: fileRes.data.name + ".pdf",
                                                                                                         uploadedPath:
                                                                                                         fileRes.data.Content.Data,
                                                                                                    });
                                                                                                    this.reloadGed();
                                                                                               } else {
                                                                                                    console.log(fileRes.error);
                                                                                               }
                                                                                          })
                                                                                          .catch((err) => {
                                                                                               console.log(err);
                                                                                          });
                                                                                } else {
                                                                                     console.log(res.error);
                                                                                }
                                                                           })
                                                                           .catch((err) => {
                                                                                console.log(err);
                                                                           });
                                                                 }} // progressAmount is a number from 0 - 100 which indicates the percent of file transfer completed
                                                                 progressAmount={this.state.progressUpload}
                                                                 progressMessage={
                                                                      this.state.progressUpload
                                                                           ? "Téléchargement de " +
                                                                           this.state.progressUpload.toFixed(
                                                                                2,
                                                                           ) +
                                                                           "% de 100%"
                                                                           : ""
                                                                 }
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                        )}
                                        {this.state.showUploadStep === "upload_succes" && (
                                             <div>
                                                  <div align="center"
                                                       className="mt-5">
                                                       <h1 className="skh1">Téléchargement réussi</h1>
                                                       <p
                                                            style={{fontSize: "1rem"}}
                                                            className="mt-2"
                                                       >
                                                            Continuez à utiliser le document suivant:
                                                       </p>
                                                       <div className="sk_upload_preview">
                                                            <div className="sk_upload_doc">
                                                                 <img
                                                                      className="cf-itemDoc_preview_staticImgUploaded"
                                                                      alt=""
                                                                      src={this.state.uploadedThumb}
                                                                 />
                                                            </div>
                                                            <div className="sk_upload_filename">
                                                                 {this.state.uploadedName}
                                                            </div>
                                                            <Button
                                                                 shape={SHAPE.round}
                                                                 size={SIZE.mini}
                                                                 onClick={() => {
                                                                 }}
                                                            >
                                                                 {" "}
                                                                 <Delete />{" "}
                                                            </Button>
                                                            <div
                                                                 className="mt-2"
                                                                 style={{display: "contents"}}
                                                            >
                                                                 <h1 className="skh2">
                                                                      Souhaitez-vous signer ce documents ?
                                                                 </h1>
                                                                 <RadioGroup
                                                                      value={this.state.signDoc}
                                                                      onChange={(e) =>
                                                                           this.setState({
                                                                                signDoc: e.target.value,
                                                                           })
                                                                      }
                                                                      name="signDoc"
                                                                      align={ALIGN.horizontal}
                                                                 >
                                                                      {" "}
                                                                      <Radio
                                                                           overrides={{
                                                                                RadioMarkOuter: {
                                                                                     style: ({$theme}) => ({
                                                                                          backgroundColor:
                                                                                          $theme.colors.negative300,
                                                                                     }),
                                                                                },
                                                                           }}
                                                                           value="true"
                                                                      >
                                                                           Oui
                                                                      </Radio>{" "}
                                                                      <Radio
                                                                           overrides={{
                                                                                RadioMarkOuter: {
                                                                                     style: ({$theme}) => ({
                                                                                          backgroundColor:
                                                                                          $theme.colors.negative300,
                                                                                     }),
                                                                                },
                                                                           }}
                                                                           value="false"
                                                                      >
                                                                           Non
                                                                      </Radio>
                                                                 </RadioGroup>
                                                            </div>
                                                            {this.state.showBtnInviteSign === true && (
                                                                 <div align="center">
                                                                      <button
                                                                           className=" mt-3 btn btn-lg text-white btn-danger font-18"
                                                                           style={{
                                                                                backgroundColor: "blue",
                                                                                borderColor: "blue",
                                                                           }}
                                                                           onClick={() =>
                                                                                this.setState({
                                                                                     showUploadStep: "inviteSigners",
                                                                                })
                                                                           }
                                                                      >
                                                                           inviter les signataires
                                                                      </button>
                                                                 </div>
                                                            )}
                                                       </div>
                                                  </div>
                                                  {this.state.showBtnInviteSign === false && (
                                                       <div className="float-right mt-1">
                                                            <button
                                                                 className="btn btn-lg text-white btn-danger mr-2 font-18"
                                                                 style={{
                                                                      backgroundColor: "blue",
                                                                      borderColor: "blue",
                                                                 }}
                                                                 onClick={() =>
                                                                      this.setState({
                                                                           showBtnInviteSign: true,
                                                                      })
                                                                 }
                                                            >
                                                                 Continuer
                                                            </button>
                                                       </div>
                                                  )}
                                             </div>
                                        )}
                                        {this.state.showUploadStep === "inviteSigners" && (
                                             <div align="center">
                                                  <div className="ml-2 mt-2">
                                                       <h1
                                                            className="skh1"
                                                            style={{fontSize: "1.7rem"}}
                                                       >
                                                            Invitez les gens à signer
                                                       </h1>
                                                       <p
                                                            style={{fontSize: "1.0rem"}}
                                                            className="mt-2"
                                                       >
                                                            Saisissez l'adresse e-mail des personnes qui
                                                            doivent signer ce document.
                                                       </p>
                                                       <div className="mt-4">
                                                            <strong
                                                                 style={{
                                                                      color: "#293d66",
                                                                      fontSize: "1.1rem",
                                                                 }}
                                                            >
                                                                 Vous vous signez ?
                                                            </strong>
                                                            <div
                                                                 className={
                                                                      this.state.signMySelf === true
                                                                           ? "sk_signmyself sk_signmyself_active"
                                                                           : "sk_signmyself"
                                                                 }
                                                            >
                                                                 <div className="sk_signmyself_text">
                                                                      {localStorage.getItem("email")}
                                                                 </div>
                                                                 <div className="sk_signmyself_switch">
                                                                      <Checkbox
                                                                           checked={this.state.signMySelf}
                                                                           checkmarkType={STYLE_TYPE.toggle_round}
                                                                           onChange={(e) =>
                                                                                this.setState({
                                                                                     signMySelf: e.target.checked,
                                                                                })
                                                                           }
                                                                           labelPlacement={LABEL_PLACEMENT.left}
                                                                           overrides={{
                                                                                Label: {
                                                                                     style: ({$theme}) => ({
                                                                                          color:
                                                                                               this.state.signMySelf === true
                                                                                                    ? $theme.colors.positive300
                                                                                                    : $theme.colors.primary200,
                                                                                     }),
                                                                                },
                                                                                Toggle: {
                                                                                     style: ({$checked, $theme}) => ({
                                                                                          backgroundColor: $checked
                                                                                               ? $theme.colors.positive300
                                                                                               : $theme.colors.primary200,
                                                                                     }),
                                                                                },
                                                                           }}
                                                                      >
                                                                           {" "}
                                                                           Je signe{" "}
                                                                      </Checkbox>
                                                                 </div>
                                                            </div>
                                                            <div className="mt-3">
                                                                 <strong
                                                                      style={{
                                                                           color: "#293d66",
                                                                           fontSize: "1.1rem",
                                                                      }}
                                                                 >
                                                                      Ajouter d'autres signataires
                                                                 </strong>
                                                                 <ReactMultiEmail
                                                                      placeholder="Cliquer sur 'Entrée' pour ajouter une adresse mail "
                                                                      emails={this.state.signatiaresEmails}
                                                                      onChange={(_emails) => {
                                                                           this.setState({
                                                                                signatiaresEmails: _emails,
                                                                           });
                                                                      }}
                                                                      validateEmail={(email) => {
                                                                           return isEmail(email); // return boolean
                                                                      }}
                                                                      getLabel={(
                                                                           email,
                                                                           index,
                                                                           removeEmail = (index) => {
                                                                           },
                                                                      ) => {
                                                                           return (
                                                                                <div data-tag=""
                                                                                     key={index}>
                                                                                     {email}{" "}
                                                                                     <span
                                                                                          data-tag-handle=""
                                                                                          onClick={() =>
                                                                                               removeEmail(index)
                                                                                          }
                                                                                     >
                                                    ×
                                                  </span>
                                                                                </div>
                                                                           );
                                                                      }}
                                                                 />
                                                            </div>
                                                            <div className="mt-2">
                                                                 <strong
                                                                      className="mb-1"
                                                                      style={{
                                                                           color: "#293d66",
                                                                           fontSize: "1.1rem",
                                                                      }}
                                                                 >
                                                                      Exigences légales
                                                                 </strong>
                                                                 <div className="mt-2">
                                                                      <div style={{width: "70%"}}>
                                                                           <Select
                                                                                options={[
                                                                                     {
                                                                                          id: "Swiss law (ZertES)",
                                                                                          image: swissImg,
                                                                                     },
                                                                                     {
                                                                                          id: "EU law (eIDAS)",
                                                                                          image: euImg,
                                                                                     },
                                                                                     {
                                                                                          id: "France (eIDAS)",
                                                                                          image: frImg,
                                                                                     },
                                                                                ]}
                                                                                labelKey="id"
                                                                                valueKey="id"
                                                                                onChange={(options) =>
                                                                                     this.setState({
                                                                                          selectedSignatureType:
                                                                                          options.value,
                                                                                     })
                                                                                }
                                                                                value={
                                                                                     this.state.selectedSignatureType
                                                                                }
                                                                                getOptionLabel={getLabel}
                                                                                getValueLabel={getLabel}
                                                                                placeholder=""
                                                                           />
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                            <div className="mt-2">
                                                                 <strong
                                                                      className="mb-1"
                                                                      style={{
                                                                           color: "#293d66",
                                                                           fontSize: "1.1rem",
                                                                      }}
                                                                 >
                                                                      {" "}
                                                                      Message à tous les signataires
                                                                 </strong>
                                                                 <div
                                                                      style={{width: "70%"}}
                                                                      className="mt-1"
                                                                 >
                                                                      <Textarea
                                                                           value={this.state.messageToSignatories}
                                                                           onChange={(e) =>
                                                                                this.setState({
                                                                                     messageToSignatories:
                                                                                     e.target.value,
                                                                                })
                                                                           }
                                                                           placeholder=""
                                                                      />
                                                                 </div>
                                                                 <div align="center"
                                                                      className="mt-2">
                                                                      <button
                                                                           className="btn btn-lg text-white btn-danger mr-2 font-18"
                                                                           style={{
                                                                                backgroundColor: "blue",
                                                                                borderColor: "blue",
                                                                           }}
                                                                           onClick={() => {
                                                                                this.setState({
                                                                                     showUploadStep: "signForm",
                                                                                });
                                                                           }}
                                                                      >
                                                                           Continuer
                                                                      </button>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )}
                                        {this.state.showUploadStep === "signForm" && (
                                             <div>
                                                  <div className="sk_appwrap">
                                                       <div className="sk_viewr">
                                                            <div className="sk_pdfviewr">
                                                                 <PDFViewer
                                                                      document={{
                                                                           base64: this.state.uploadedPath,
                                                                      }}
                                                                      minScale={0.25}
                                                                      scale={1.05}
                                                                      navbarOnTop={true}
                                                                      scaleStep={0.25}
                                                                      loader={
                                                                           <h5 style={{color: "#fa5b35"}}>
                                                                                Chargement...
                                                                           </h5>
                                                                      }
                                                                      alert={
                                                                           <h5 style={{color: "red"}}>
                                                                                Une erreur s'est produite lors de
                                                                                chargement du doument !
                                                                           </h5>
                                                                      }
                                                                 />
                                                            </div>
                                                            <div className="sk_signatures_viewr">
                                                                 <div className="sk_signatures_viewr_content">
                                                                      <div className="btn-group mb-2">
                                                                           <button
                                                                                className="btn font-weight-bold   btn-light"
                                                                                onClick={() =>
                                                                                     this.setState({
                                                                                          showUploadStep: "inviteSigners",
                                                                                     })
                                                                                }
                                                                           >
                                                                                Retour
                                                                           </button>
                                                                           &nbsp;&nbsp;
                                                                           <button
                                                                                className="btn custom_p_btn  btn-blue"
                                                                                onClick={() => {
                                                                                     this.setState({
                                                                                          loading: true,
                                                                                     });
                                                                                     let docs =
                                                                                          this.state.documents || [];
                                                                                     let signers = [];
                                                                                     let signataires = this.state
                                                                                          .signatiaresEmails;
                                                                                     if (
                                                                                          this.state.signMySelf === true
                                                                                     ) {
                                                                                          signers.push({
                                                                                               email: localStorage.getItem(
                                                                                                    "email",
                                                                                               ),
                                                                                               signature: "",
                                                                                               signed_at: new Date(),
                                                                                               key: 1,
                                                                                          });
                                                                                     }
                                                                                     signataires.map((item, key) => {
                                                                                          signers.push({
                                                                                               email: item,
                                                                                               signature: "",
                                                                                               signed_at: "",
                                                                                               key:
                                                                                                    this.state.signMySelf ===
                                                                                                    true
                                                                                                         ? key + 2
                                                                                                         : key + 1,
                                                                                          });
                                                                                          return null;
                                                                                     });

                                                                                     docs.push({
                                                                                          title: this.state.uploadedName,
                                                                                          type: "ad",
                                                                                          desc: "",
                                                                                          thumbnail: this.state
                                                                                               .uploadedThumb,
                                                                                          path: this.state.uploadedPath,
                                                                                          created_at: new Date(),
                                                                                          signers: signers,
                                                                                     });
                                                                                     this.setState({
                                                                                          showUploadStep: "successfulStep",
                                                                                          loading: false,
                                                                                     });
                                                                                }}
                                                                           >
                                                                                <h1 className="skh_btn">
                                                                                     {this.state.signMySelf === true
                                                                                          ? "Signer maintenant"
                                                                                          : "Envoyer les invitations"}
                                                                                </h1>
                                                                           </button>
                                                                      </div>
                                                                      <h1 className="skh1">
                                                                           Positionnez les champs de signature
                                                                      </h1>
                                                                      <p style={{fontSize: "1.1rem"}}>
                                                                           Faites glisser et déposez les champs de
                                                                           signature à l'endroit où les gens
                                                                           doivent signer.
                                                                      </p>
                                                                      <div style={{marginTop: "2.8rem"}}>
                                                                           {this.state.signMySelf === true && (
                                                                                <Draggable>
                                                                                     <div className="sk_signature_sticker">
                                                                                          <div
                                                                                               id={"sk_signature"}
                                                                                               className="sk_signature_card p-1"
                                                                                          >
                                                                                               <div align="center">
                                                                                                    <h1 className="skh3">
                                                                                                         {localStorage.getItem(
                                                                                                              "email",
                                                                                                         )}
                                                                                                    </h1>
                                                                                               </div>
                                                                                               <div
                                                                                                    style={{
                                                                                                         display: "flex",
                                                                                                         marginBottom: 8,
                                                                                                    }}
                                                                                               >
                                                                                                    <button
                                                                                                         className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                                                                                         style={{
                                                                                                              backgroundColor:
                                                                                                                   "deepskyblue",
                                                                                                              borderColor:
                                                                                                                   "deepskyblue",
                                                                                                         }}
                                                                                                    >
                                                                                                         SES
                                                                                                    </button>
                                                                                                    <h1
                                                                                                         className="skh4"
                                                                                                         style={{
                                                                                                              marginLeft: 15,
                                                                                                              marginTop: 42,
                                                                                                         }}
                                                                                                    >
                                                                                                         Simple electronic signature
                                                                                                    </h1>
                                                                                               </div>
                                                                                          </div>
                                                                                     </div>
                                                                                </Draggable>
                                                                           )}{" "}
                                                                           {this.state.signatiaresEmails.map(
                                                                                (item, key) => (
                                                                                     <Draggable
                                                                                          key={key}>
                                                                                          <div className="sk_signature_sticker">
                                                                                               <div
                                                                                                    id={"sk_signature" + key}
                                                                                                    className="sk_signature_card p-1"
                                                                                               >
                                                                                                    <div align="center">
                                                                                                         <h1 className="skh3">
                                                                                                              {item}
                                                                                                         </h1>
                                                                                                    </div>
                                                                                                    <div
                                                                                                         style={{
                                                                                                              display: "flex",
                                                                                                              marginBottom: 8,
                                                                                                         }}
                                                                                                    >
                                                                                                         <button
                                                                                                              className=" mt-4 btn btn-sm btn-danger p-1 ml-3"
                                                                                                              style={{
                                                                                                                   backgroundColor:
                                                                                                                        "deepskyblue",
                                                                                                                   borderColor:
                                                                                                                        "deepskyblue",
                                                                                                              }}
                                                                                                         >
                                                                                                              SES
                                                                                                         </button>
                                                                                                         <h1
                                                                                                              className="skh4"
                                                                                                              style={{
                                                                                                                   marginLeft: 15,
                                                                                                                   marginTop: 42,
                                                                                                              }}
                                                                                                         >
                                                                                                              Simple electronic
                                                                                                              signature
                                                                                                         </h1>
                                                                                                    </div>
                                                                                               </div>
                                                                                          </div>
                                                                                     </Draggable>
                                                                                ),
                                                                           )}{" "}
                                                                           {this.state.signatiaresEmails.length >
                                                                           0 && (
                                                                                <p
                                                                                     style={{
                                                                                          fontSize: "1.1rem",
                                                                                          marginTop: 25,
                                                                                     }}
                                                                                >
                                                                                     Une invitation sera envoyé au
                                                                                     signataires dés que vous validez
                                                                                     votre signature.
                                                                                </p>
                                                                           )}
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                        )}
                                        {this.state.showUploadStep === "successfulStep" && (
                                             <div>
                                                  <div className="sk_detail_container">
                                                       <div className="float-right">
                                                            <button
                                                                 onClick={() => {
                                                                      this.setState({
                                                                           showUploadStep: "",
                                                                           showNewDocScreen: false,
                                                                      });
                                                                      this.reloadGed();
                                                                 }}
                                                                 className="btn-rounded btn-small btn-light"
                                                            >
                                                                 <i className="mdi mdi-close font-18 font-weight-bold" />
                                                            </button>
                                                       </div>
                                                       <div className="mt-4">
                                                            <h1
                                                                 className="skh1"
                                                                 style={{fontSize: "2.0rem"}}
                                                            >
                                                                 Les invitations à signer sont envoyée avec succès
                                                            </h1>
                                                            <p style={{fontSize: "1.2rem"}}>
                                                                 Vous serez averti par e-mail dès la
                                                                 signature du document.
                                                            </p>
                                                            <div className="sk_detail_upload">
                                                                 <div className="sk_detail_upload_pic">
                                                                      <img
                                                                           src={this.state.uploadedThumb}
                                                                           alt=""
                                                                           style={{
                                                                                maxWidth: "100%",
                                                                                maxHeight: "100%",
                                                                           }}
                                                                      />
                                                                 </div>
                                                                 <div className="sk_detail_upload_text">
                                                                      <div className="sk_detail_upload_text_row">
                                                                           <strong
                                                                                style={{color: "#293d66"}}>
                                                                                Document
                                                                           </strong>
                                                                           <br /> {this.state.uploadedName}
                                                                      </div>
                                                                      {this.state.signMySelf === true && (
                                                                           <div className="sk_detail_upload_text_row">
                                                                                <strong
                                                                                     style={{color: "#293d66"}}>
                                                                                     Signataire 1
                                                                                </strong>
                                                                                <br />{" "}
                                                                                {localStorage.getItem("email")}
                                                                           </div>
                                                                      )}{" "}
                                                                      {this.state.signatiaresEmails.map(
                                                                           (item, key) => (
                                                                                <div
                                                                                     key={key}
                                                                                     className="sk_detail_upload_text_row"
                                                                                >
                                                                                     <strong
                                                                                          style={{color: "#293d66"}}
                                                                                     >
                                                                                          Signataire{" "}
                                                                                          {this.state.signMySelf === true
                                                                                               ? key + 2
                                                                                               : key + 1}
                                                                                     </strong>
                                                                                     <br />{" "}
                                                                                     {localStorage.getItem("email")}
                                                                                </div>
                                                                           ),
                                                                      )}
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div align="center" className="">
                                                       <div className="btn-group">
                                                            <button
                                                                 className="btn btn-lg btn-outline-blue"
                                                                 onClick={() =>
                                                                      this.showDocInPdfModal(
                                                                           this.state.uploadedPath,
                                                                      )
                                                                 }
                                                            >
                                                                 Visualiser
                                                            </button>
                                                            &nbsp;&nbsp;
                                                            <button
                                                                 className="btn btn-lg btn-pink ">
                                                                 Télécharger
                                                            </button>
                                                       </div>
                                                  </div>
                                             </div>
                                        )}
                                   </div>
                              )}
               </div>

          )

     }

}