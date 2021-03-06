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


const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;
const getLabel = ({option}) => {
    return (
        <React.Fragment>
            {' '}
            <img src={option.image} alt="" style={{width: 30, height: 30}}/>
            &nbsp;&nbsp;{option.id}
        </React.Fragment>
    );
};

function renderSearchOption(props, option, snapshot, className) {
    const imgStyle = {
        borderRadius: '50%',
        verticalAlign: 'middle',
        marginRight: 10,
        width: 32, height: 32, objectFit: 'contain'
    };

    return (
        <button {...props} className={className} type="button">
            <span>
                <img alt="" style={imgStyle}
                     src={option.ContactType === '1' ? option.imageUrl ? option.imageUrl : userAvatar : entIcon}/>
                <span style={{fontSize: 13}}>{option.ContactName}</span>
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

const changeStructure = (drive) => {
    const list = [];
    for (let i = 0; i < drive.length; i++) {
        const key = drive[i].id.toString();
        const treeNode = {
            title: drive[i].type ? drive[i].name + '.pdf' : drive[i].name,
            key,
            icon: drive[i].type ? (
                <DescriptionIcon style={{color: 'red', backgroundColor: '#fff'}}/>
            ) : (
                ({selected}) =>
                    selected ? (
                        drive[i].id !== "parent" ? <FolderIcon style={{color: '#1a73e8'}}/> :
                            <PeopleOutlineOutlinedIcon style={{color: '#1a73e8'}}/>
                    ) : (
                        drive[i].id !== "parent" ? <FolderIcon style={{color: 'grey'}}/> :
                            <PeopleOutlineOutlinedIcon style={{color: 'grey'}}/>
                    )
            ),
            files: drive[i].Content ? drive[i].Content.files || [] : [],
            folders: drive[i].Content ? drive[i].Content.folders || [] : [],
            typeF: drive[i].type ? 'file' : 'folder',
            rights: drive[i].rights || undefined,
            proprietary: drive[i].proprietary || undefined
        };

        if (drive[i].Content && (drive[i].Content.folders.length > 0)) {
            treeNode.children = changeStructure(drive[i].Content.folders);
        }
        /*if (drive[i].Content && (drive[i].Content.files.length > 0)) {
          treeNode.children = (treeNode.children || []).concat(changeStructure(drive[i].Content.files) || []);
        }*/

        list.push(treeNode);
    }
    return list;
};

const changeStructureWithFiles = (drive) => {
    const list = [];
    for (let i = 0; i < drive.length; i++) {
        const key = drive[i].id.toString();
        const treeNode = {
            title: drive[i].type ? drive[i].name + '.pdf' : drive[i].name,
            key,
            icon: drive[i].type ? (
                <DescriptionIcon style={{color: 'red', backgroundColor: '#fff'}}/>
            ) : (
                ({selected}) =>
                    selected ? (
                        drive[i].id !== "parent" ? <FolderIcon style={{color: '#1a73e8'}}/> :
                            <PeopleOutlineOutlinedIcon style={{color: '#1a73e8'}}/>
                    ) : (
                        drive[i].id !== "parent" ? <FolderIcon style={{color: 'grey'}}/> :
                            <PeopleOutlineOutlinedIcon style={{color: 'grey'}}/>
                    )
            ),
            files: drive[i].Content ? drive[i].Content.files || [] : [],
            folders: drive[i].Content ? drive[i].Content.folders || [] : [],
            typeF: drive[i].type ? 'file' : 'folder',
            rights: drive[i].rights || undefined,
            proprietary: drive[i].proprietary || undefined
        };

        if (drive[i].Content && (drive[i].Content.folders.length > 0)) {
            treeNode.children = changeStructureWithFiles(drive[i].Content.folders || []);
        }
        if (drive[i].Content && (drive[i].Content.files.length > 0)) {
            treeNode.children = (treeNode.children || []).concat(changeStructureWithFiles(drive[i].Content.files) || []);
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

const searchFolderParentNodeById = (id, drive) => {
    for (let i = 0; i < drive.length; i++) {
        if (drive[i].id) {
            if (drive[i].Content.folders.findIndex(x => x.id === id) === -1) {
                let found = searchFolderParentNodeById(id, drive[i].Content.folders);
                if (found) return found;
            } else return drive[i];
        } else {
            if (drive[i].Content.folders.findIndex(x => x.key === id) === -1) {
                let found = searchFolderParentNodeById(id, drive[i].folders);
                if (found) return found;
            } else return drive[i];
        }
    }
};

const searchFileParentNodeById = (id, drive) => {
    for (let i = 0; i < drive.length; i++) {
        if (drive[i].id) {
            if (drive[i].Content.files.findIndex(x => x.id === id) === -1) {
                let found = searchFileParentNodeById(id, drive[i].Content.folders);
                if (found) return found;
            } else return drive[i];
        } else {
            if (drive[i].Content.files.findIndex(x => x.key === id) === -1) {
                let found = searchFileParentNodeById(id, drive[i].folders);
                if (found) return found;
            } else return drive[i];
        }
    }
};

const getContactById = (contacts, id) => {
    return contacts.find(x => x.id === id);
}

const getClientNameById = (clients, id) => {
    let find = clients.find(x => x.id === id || x.ID === id)
    if (find) {
        if (find.Type === "0") return find.Nom
        else return find.Nom + " " + find.Prenom
    } else {
        return ""
    }
}

const getClientAdressById = (clients, id) => {
    let find = clients.find(x => x.id === id || x.ID === id)
    if (find) {
        return find.adress || ""
    } else {
        return ""
    }
}

const getClientTypeById = (clients, id) => {
    let find = clients.find(x => x.id === id || x.ID === id)
    if (find) {
        return find.Type
    } else {
        return ""
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

const getClientID_ByName = (name, clients) => {
    let id;
    clients.map((client, key) => {
        let fname = client.Nom + ' ' + (client.Prenom || '')
        if (fname === name) id = client.ID;
    });
    return id;
};

const getTaxNameById = (taxs, id) => {
    let find = taxs.find(x => x.id === id);
    if (find) return find.display_name
    else return ""
}

const getOAContactByEmail2 = (contacts, email) => {
    let OAcontact = '';
    contacts.map((contact, key) => {
        if (contact && contact.email && contact.email === email) OAcontact = contact;
    });
    return OAcontact;
}

const getOAContactByUid = (contacts, uid) => {
    let OAcontact = '';
    contacts.map((contact, key) => {
        if (contact && contact.uid && contact.uid === uid) OAcontact = contact;
    });
    return OAcontact;
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

const getContactFnameById = (contacts, id) => {
    let find = contacts.find(x => x.id === id);
    if (find) return find.nom + " " + find.prenom
    else return ""
}

const getContactFnameByEmail = (contacts, email) => {
    let find = contacts.find(x => x.email === email);
    if (find) return find.nom + " " + find.prenom
    else return ""
}

const getContactReverseFnameByEmail = (contacts, email) => {
    let find = contacts.find(x => x.email === email);
    if (find) return find.prenom + " " + find.nom
    else return ""
}

const getContactImageById = (contacts, id) => {
    let find = contacts.find(x => x.id === id);
    return find ? find.imageUrl : "";
}

const getContactIdByEmail = (contacts, email) => {
    let find = contacts.find(x => x.email === email);
    return find ? find.id : "";
}

const getClientNameByFolderCaseId = (cases, folder_id, clients) => {
    (cases || []).map((c, key) => {
        let find = (c.folders || []).find(x => x.folder_id === folder_id)
        if (find) return getClientNameById(clients, c.ID_client)
    })
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.replace("data:application/pdf;base64,",""));
    reader.onerror = error => reject(error);
});

const isTimeSheetFactured = (factures,id) => {
    let factures_ts = []
    factures.map((fact,key) => {
        (fact.lignes_facture || []).map((lf,k) => {
            fact.statut === "accepted" && lf.id && factures_ts.push(lf.id)
        })
    })
    let find = factures_ts.find(x => x === id)
    if(find){
        return true
    }else return false
}

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

function insertNodeIntoSharedTree(drive, nodeId, newNode) {
    for (let j = 0; j < drive.length; j++) {
        if (drive[j].id === nodeId) {
            if (newNode.type) {
                drive[j].Content.files.push(newNode);
            }else{
                drive[j].Content.folders.push(newNode)
            }
        } else if (drive[j].Content.folders != null) {
            insertNodeIntoSharedTree(drive[j].Content.folders, nodeId, newNode);
        }
    }
}

export default {
    renderSearchOption,
    getTimeSuggestions,
    icon,
    getLabel,
    checkedIcon,
    getPath,
    generateGed,
    buildIndex,
    getClientNameByFolderCaseId,
    getClientAdressById,
    getContactImageById,
    getContactFnameById,
    changeStructure,
    changeStructureWithFiles,
    getContactIdByEmail,
    getFolderById,
    getFolderFilesById,
    getFolderFoldersById,
    getClientID_ByName,
    getTaxNameById,
    getContactById,
    getClientNameById,
    getBreadcumpsPath,
    getFolderNameById,
    getFolderTypeById,
    findClientMondatById,
    findContactByEmail,
    findContactByUid,
    getOAContactByEmail2,
    getOAContactByUid,
    getContactFnameByEmail,
    getContactReverseFnameByEmail,
    getClientTypeById,
    toBase64,
    deleteFileFromTree,
    deleteFolderFromTree,
    searchFolderParentNodeById,
    searchFileParentNodeById,
    insertNodeIntoTree
};
