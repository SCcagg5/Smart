import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import React from 'react';
import userAvatar from '../assets/images/users/user4.jpg';
import entIcon from '../assets/images/entreprise-icon.png';
import Data from '../data/Data';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SmartService from '../provider/SmartService';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const getLabel = ({ option }) => {
  return (
    <React.Fragment>
      {' '}
      <img src={option.image} alt="" style={{ width: 30, height: 30 }} />
      &nbsp;&nbsp;{option.id}
    </React.Fragment>
  );
};

function renderSearchOption(props, option, snapshot, className) {
  const imgStyle = {
    borderRadius: '50%',
    verticalAlign: 'middle',
    marginRight: 10,
    width: 32, height: 32, objectFit: 'cover'
  };

  return (
    <button {...props} className={className} type="button">
            <span>
                <img alt="" style={imgStyle}
                     src={option.ContactType === '1' ? option.imageUrl ? option.imageUrl : userAvatar : entIcon} />
                <span style={{ fontSize: 13 }}>{option.ContactName + (option.societyName !== "" ? (" - " + option.societyName) : "") }</span>
            </span>
    </button>
  );
}

const getTimeSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : Data.timeSuggestions.filter(x =>
    x.toLowerCase().slice(0, inputLength) === inputValue
  );
};



 let index = {};

 let buildIndex = (root, children) => {
  for (let i in children) {
    index[children[i].id] = root;
    buildIndex(children[i].id, children[i].Content ? children[i].Content.folders : []);
  }
};

 let getPath = (id, drive) => {
  if (drive) buildIndex('Mon drive', drive);
  return index[id] ? getPath(index[id]).concat([id]) : [id];
};

 const getBreadcumpsPath = (idFolder, drive) => {
   let breadCrumbArray = getPath(idFolder, drive);
   let breadcrumbs = [];
   breadCrumbArray.map((id, key) => {
     if (id !== 'Mon drive') {
       let name = getFolderNameById(id, drive);
       if (getFolderTypeById(id, drive) === 'shared')
         breadcrumbs.push('Partagés avec moi');
       breadcrumbs.push(name);
     } else {
       breadcrumbs.push(id);
     }
   });
   return breadcrumbs.join(' / ');
 };

 const getFolderNameById = (id, drive) => {
  for (let i = 0; i < drive.length; i++) {
    if (drive[i].id !== id) {
      let found = getFolderNameById(id, drive[i].Content.folders);
      if (found) return found;
    } else return drive[i].name;
  }
};

 const getFolderTypeById = (id, drive) => {
  for (let i = 0; i < drive.length; i++) {
    if (drive[i].id !== id) {
      let found = getFolderNameById(id, drive[i].Content.folders);
      if (found) return found;
    } else return drive[i].proprietary ? 'shared' : 'proprietary';
  }
};

 const getFolderFoldersById = (id, drive) => {
   for (let i = 0; i < drive.length; i++) {
     if (drive[i].id !== id) {
       let found = getFolderFoldersById(id, drive[i].Content.folders);
       if (found) return found;
     } else return drive[i].Content.folders;
   }
 };

 const getFolderFilesById = (id, drive) => {
  for (let i = 0; i < drive.length; i++) {
    if (drive[i].id !== id) {
      let found = getFolderFilesById(id, drive[i].Content.folders);
      if (found) return found;
    } else return drive[i].Content.files;
  }
};

 const changeStructure = (drive,showFiles) => {
  const list = [];
  for (let i = 0; i < drive.length; i++) {
    const key = drive[i].id.toString();
    const treeNode = {
      title: drive[i].type ? drive[i].name + '.pdf' : drive[i].name,
      key,
      icon: drive[i].type ? (
        <DescriptionIcon style={{ color: 'red', backgroundColor: '#fff' }} />
      ) : (
        ({ selected }) =>
          selected ? (
            drive[i].id !== "parent" ? <FolderIcon style={{ color: '#1a73e8' }} /> : <PeopleOutlineOutlinedIcon style={{ color: '#1a73e8' }}/>
          ) : (
            drive[i].id !== "parent" ? <FolderIcon style={{ color: 'grey' }} /> : <PeopleOutlineOutlinedIcon style={{ color: 'grey' }}/>
          )
      ),
      files: drive[i].Content ? drive[i].Content.files || [] : [],
      folders: drive[i].Content ? drive[i].Content.folders || [] : [],
      typeF: drive[i].type ? 'file' : 'folder',
      rights:drive[i].rights || undefined,
      proprietary:drive[i].proprietary || undefined
    };

    if (drive[i].Content && (drive[i].Content.folders.length > 0)) {
      treeNode.children = changeStructure(drive[i].Content.folders || [],showFiles);
    }
    if(showFiles === true){
      if (drive[i].Content && (drive[i].Content.files.length > 0)) {
        treeNode.children = (treeNode.children || []).concat(changeStructure(drive[i].Content.files,showFiles) || []);
      }
    }
    list.push(treeNode);
  }
  return list;
};

 const getFolderById = (id, drive) => {
  for (let i = 0; i < drive.length; i++) {
    if (drive[i].id) {
      if (drive[i].id !== id) {
        let found = getFolderById(id, drive[i].Content.folders);
        if (found) return found;
      } else return drive[i];
    } else {
      if (drive[i].key !== id) {
        let found = getFolderById(id, drive[i].folders);
        if (found) return found;
      } else return drive[i];
    }
  }
};

const getFileById = (id, drive) => {
  for (let i = 0; i < drive.length; i++) {
    if (drive[i].Content.files) {
      let item = drive[i].Content.files.find(x => x.id === id);
      if(item){
        return item
      }else{
        let found = getFileById(id, drive[i].Content.folders);
        if (found) return found;
      }
    }
  }
};

function insertNodeIntoTree(drive, nodeId, newNode) {
  for (let j = 0; j < drive.length; j++) {
    if (drive[j].id === nodeId) {
      if (newNode.type) {
        drive[j].Content.files.push(newNode);
      }else{
        drive[j].Content.folders.push(newNode)
      }
    } else if (drive[j].Content.folders != null) {
      insertNodeIntoTree(drive[j].Content.folders, nodeId, newNode);
    }
  }
}

 //File seulement
function deleteFileFromTree(drive, nodeId) {
  for (let j = 0; j < drive.length; j++) {
    if(drive[j].Content.files != null){
      let filtered = drive[j].Content.files.filter(f => f.id === nodeId);
      if (filtered && filtered.length > 0) {
        console.log("found")
        drive[j].Content.files = drive[j].Content.files.filter(f => f.id !== nodeId);
        return;
      }
    }
    if (drive[j].Content.folders != null) {
      deleteFileFromTree(drive[j].Content.folders, nodeId);
    }
  }
}

function deleteFolderFromTree(drive, nodeId) {
  for (let j = 0; j < drive.length; j++) {
    if (drive[j].id === nodeId) {
      console.log("found")
      drive = drive.filter(f => f.id !== nodeId);
      return drive
    }
    if(drive[j].Content.folders != null){
      let filtered = drive[j].Content.folders.filter(f => f.id === nodeId);
      if (filtered && filtered.length > 0) {
        console.log("found")
        drive[j].Content.folders = drive[j].Content.folders.filter(f => f.id !== nodeId);
        return ;
      }
      deleteFolderFromTree(drive[j].Content.folders, nodeId);
    }
  }
}


const findContactByEmail = (email, contacts) => {
  let index;
  contacts.map((contact, key) => {
    if (contact.email && contact.email === email) index = key;
  });
  return index;
};

const findContactByUid = (uid, contacts) => {
  let index;
  contacts.map((contact, key) => {
    if (contact.uid && contact.uid === uid) index = key;
  });
  return index;
};

const findClientMondatById = (id, clients) => {
  let index;
  clients.map((client, key) => {
    if (client.ID && client.ID === id) index = key;
  });
  return index;
};

const getOAContactByEmail2 = (contacts, email) => {
  let OAcontact = '';
  contacts.map((contact, key) => {
    if (contact && contact.email && contact.email === email) OAcontact = contact;
  });
  return OAcontact;
}

const getOAContactByUid = (contacts,uid) => {
  let OAcontact = '';
  contacts.map((contact, key) => {
    if (contact && contact.uid && contact.uid === uid) OAcontact = contact;
  });
  return OAcontact;
}

const getContactById = (contacts,id) => {
  return contacts.find(x => x.id === id);
}

const getContactImageById = (contacts,id) => {
  let find = contacts.find(x => x.id === id);
  return find ? find.imageUrl : "";
}

const getContactFnameById = (contacts,id) => {
  let find = contacts.find(x => x.id === id);
  if(find) return find.nom + " " + find.prenom
  else return ""
}

const getContactEmailById = (contacts,id) => {
  let find = contacts.find(x => x.id === id);
  return find ? find.email : "";
}

const getContactIdByEmail = (contacts,email) => {
  let find = contacts.find(x => x.email === email);
  return find ? find.id : "";
}

const getClientById = (clients,id) => {
  return clients.find(x => x.id === id)
}

const getClientNameById = (clients,id) => {
  let find = clients.find(x => x.id === id)
  if(find){
    if(find.type === "0") return find.contactName + " - " + find.societyName
    else return find.contactName
  }else return ""
}

const getClientEmailById = (clients,id) => {
  let find = clients.find(x => x.id === id)
  if(find){
    return find.email
  }else return ""
}

const getClientTypeById = (clients,id) => {
  let find = clients.find(x => x.id === id)
  if(find){
    return find.type
  }else return ""
}

const generateGed = () => {
  SmartService.addFolder({
    name: 'SECRETARIAT',
    folder_id: null
  }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes => {

    console.log('OK');

    SmartService.addFolder({
      name: 'ETUDE',
      folder_id: addFolderRes.data.id
    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes1 => {

      console.log('OK');
      SmartService.addFolder({
        name: 'BCORP',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'LOGOS',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'PHOTOS',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'CONFERENCE - PUBLICATIONS',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'KNOW HOW',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'NEWSLETTER',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'PRESENTATION ETUDE',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'CALENDRIER',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'EVENT',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'MODELES',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'ARCHIVAGE',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'OUVERTURE DOSSIER',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'LISTE TELEPHONE INTERNE',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'ASSOCIES ***',
        folder_id: addFolderRes1.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes1_assoc => {
        console.log('OK');

        SmartService.addFolder({
          name: 'CONVENTION D\'ACTIONNAIRES',
          folder_id: addFolderRes1_assoc.data.id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
          console.log('OK');

        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'CONTRAT DE TRAVAIL',
          folder_id: addFolderRes1_assoc.data.id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
          console.log('OK');

        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'DECISIONS CONSEIL D\'ADMINISTRATION',
          folder_id: addFolderRes1_assoc.data.id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
          console.log('OK');

        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'ASSEMBLEE GENERALE EXTRAORDINAIRE',
          folder_id: addFolderRes1_assoc.data.id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
          console.log('OK');

        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'ASSEMBLEE GENERALE ORDINAIRE',
          folder_id: addFolderRes1_assoc.data.id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
          console.log('OK');

        }).catch(err => {
          console.log(err);
        });
        SmartService.addFolder({
          name: 'PV REUNION',
          folder_id: addFolderRes1_assoc.data.id
        }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
          console.log('OK');

        }).catch(err => {
          console.log(err);
        });

      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });

    SmartService.addFolder({
      name: 'LOCAUX',
      folder_id: addFolderRes.data.id
    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes2 => {

      SmartService.addFolder({
        name: 'ASSURANCES',
        folder_id: addFolderRes2.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'BAIL A LOYER',
        folder_id: addFolderRes2.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'CAVES',
        folder_id: addFolderRes2.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'BAVITECH',
        folder_id: addFolderRes2.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'NETTOYAGE',
        folder_id: addFolderRes2.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'BADEL',
        folder_id: addFolderRes2.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });

    SmartService.addFolder({
      name: 'COMPTABILITE *',
      folder_id: addFolderRes.data.id
    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes3 => {

      SmartService.addFolder({
        name: 'BUDGET',
        folder_id: addFolderRes3.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'FACTURATION CLIENTS',
        folder_id: addFolderRes3.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'FACTURES FOURNISSEURS',
        folder_id: addFolderRes3.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'TVA',
        folder_id: addFolderRes3.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'LISTES IBAN',
        folder_id: addFolderRes3.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'CAISSE ETUDE',
        folder_id: addFolderRes3.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });

    SmartService.addFolder({
      name: 'RH *',
      folder_id: addFolderRes.data.id
    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes4 => {

      SmartService.addFolder({
        name: 'EMPLOYES',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'WELCOME PACK',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'LPP ETUDE',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'FER CIAM',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'TELETRAVAIL',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'CANDIDATURES',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'OCAS',
        folder_id: addFolderRes4.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });

    SmartService.addFolder({
      name: 'LISTES',
      folder_id: addFolderRes.data.id
    }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes5 => {


      SmartService.addFolder({
        name: 'CLIENTS',
        folder_id: addFolderRes5.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });
      SmartService.addFolder({
        name: 'AVOCATS',
        folder_id: addFolderRes5.data.id
      }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderRes11 => {
        console.log('OK');
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });

  }).catch(err => {
    console.log(err);
  });

  SmartService.addFolder({
    name: 'CLIENTS',
    folder_id: null
  }, localStorage.getItem('token'), localStorage.getItem('usrtoken')).then(addFolderClientRes => {
    console.log('ok');
  }).catch(err => {
    console.log(err);
  });
}

function exportAnnuaire_clients_To_CSVFile(items, fileTitle) {
  let headers = {"type":"type","email":"email","contactName":"contactName","societyName":"societyName","phone":"phone","adress":"adress"}
  var itemsFormatted = [];
  items.forEach((item) => {
    itemsFormatted.push({
      type: item.type || "0",
      email: item.email || "",
      contactName: item.contactName || "",
      societyName: item.societyName || "",
      phone: item.phone || "",
      adress: item.adress || ""
    });
  });
  itemsFormatted.unshift(headers);
  var jsonObject = JSON.stringify(itemsFormatted);
  var csv = convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle || 'export.csv';
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function exportContactCSVFile( items, fileTitle) {
  var headers = {
    nom: "nom",
    prenom: "prenom",
    email: "email",
    phone: "phone",
    adress: "adress",
    pays:"pays",
    rateFacturation:"rateFacturation",
    imageUrl:"imageUrl",
    about:"about"
  };
  var itemsFormatted = [];
  items.forEach((item) => {
    itemsFormatted.push({
      nom: item.nom || " ",
      prenom: item.prenom || " ",
      email: item.email || " ",
      phone: item.phone || " ",
      adress: item.adress || " ",
      pays: item.pays || " ",
      rateFacturation: item.rateFacturation || " ",
      imageUrl: item.imageUrl || " ",
      about: item.about || " "
    });
  });
  if (headers) {
    itemsFormatted.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(itemsFormatted);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle  || 'export.csv';

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line !== '') line += ','

      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}

function csvToJSON(csv){

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

    var obj = {};
    var currentline=lines[i].split(",");

    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);

  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}

function toMMSS(secondes){
  var sec_num = parseInt(secondes, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes + ':' + seconds;
}




 export default {renderSearchOption,getTimeSuggestions,icon,getLabel,checkedIcon,getPath,generateGed,buildIndex,exportAnnuaire_clients_To_CSVFile,exportContactCSVFile,convertToCSV,
   changeStructure,getFolderById,getFolderFilesById,getFolderFoldersById,csvToJSON,getFileById,getContactById,getContactImageById,getContactFnameById,getContactEmailById,getContactIdByEmail,
   getClientById,getClientEmailById,getClientNameById,getClientTypeById,toMMSS,
   getBreadcumpsPath,getFolderNameById,getFolderTypeById,findClientMondatById,findContactByEmail,findContactByUid,getOAContactByEmail2,getOAContactByUid,deleteFileFromTree,deleteFolderFromTree, insertNodeIntoTree};