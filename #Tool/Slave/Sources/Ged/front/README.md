#### Installation

- **Modifier le fichier .env avec les pramètres souhaités pour la création de l'ENT.**

**REACT_APP_GED_ID:** Id GED

**REACT_APP_CLIENTS_FOLDER_ID:** Id du dossier "CLIENTS" dans la Ged, qui va inclure la liste des clients pour le service TIMESHEET

**REACT_APP_ENT_NAME:**   C'est le nom de l'ENT

**REACT_APP_RETHINKDB_BEGIN_NAME:**  Le début du nom de la base de donnée sur rethinkDB(qui va etre concatener avec l'id de la GED)

**REACT_APP_MEET_URL:**  Exemple => https://meet.smartdom.ch/xxxxx

**REACT_APP_LOGIN_BTN_COLOR:** C'est le code couleur de bouton login/signup.

**REACT_APP_ACTIVE_MODULES:** Représente la liste des services à activer. Exemple => "ROOMS/MEET/TIMESHEET"

###### Liste des services possibles:
- ROOMS
- MEET
- TIMESHEET
- MARKETPLACE
- MARKETPLACE_EDITEUR_RECETTE
- MARKETPLACE_RH_SP
