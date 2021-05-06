import React from 'react';
import 'rc-collapse/assets/index.css'
import Collapse, { Panel } from 'rc-collapse';
import moment from 'moment';
import main_functions from '../../controller/main_functions';
import defaultAvatar from "../../assets/images/users/default_avatar.jpg"
import FolderIcon from '@material-ui/icons/Folder';
import { Avatar, Button as MuiButton, IconButton, Input, MenuItem, Select as MuiSelect } from '@material-ui/core';
import Data from '../../data/Data';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { TabPanel } from 'react-tabs';
import SaveIcon from '@material-ui/icons/Save';
import AtlButton from '@atlaskit/button';
import CB from '@material-ui/core/Checkbox';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import { Checkbox } from '@atlaskit/checkbox';
import SmartService from '../../provider/SmartService';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CloseIcon from "@material-ui/icons/Close";
import Popover from "@material-ui/core/Popover";
import {Tree} from "antd";
import rethink from "../../controller/rethink";

const {DirectoryTree} = Tree;

const db_name = "OA_LEGAL"


export default class Mandats extends React.Component{


  state={
    client_mandat:"",
    openDeleteModal:false,
    toRemoveFolderKey:"",
    toRemoveFolder_id:"",
    delete_folder_ged:false,
      mandatFolderNameChanged:false,
      anchorElDrive:null,
      expandedDrivePopUpKeys:[],
      selectedDrivePopUpKeys:[],
      autoExpandDrivePopUpParent:true,
      destinationFolder:"",
      reportDoss:""
  }


  componentDidMount() {
    let s_client = this.props.selectedClient;
    let client_mandat = this.props.clients_tempo.find(x => x.ID_client === s_client.ID);
    this.setState({client_mandat:client_mandat})
  }


    onExpandDrivePopUp = (expandedKeys) => {
        this.setState({expandedDrivePopUpKeys:expandedKeys,autoExpandDrivePopUpParent:false})
    }

    onSelectDrivePopUp = (selectedKeys, info) => {
        this.setState({selectedDrivePopUpKeys:selectedKeys,destinationFolder:info.node})
    }

    reportClient(dossier){
        this.setState({loading:true,anchorElDrive:null})
        /*let toSend = {
            data:{
                folder:this.state.destinationFolder.key,
                client:{
                    id:this.props.selectedClient.id,
                    type:this.props.selectedClient.Type,
                    nom:this.props.selectedClient.Nom,
                    prenom:this.props.selectedClient.Prenom,
                    email:this.props.selectedClient.email,
                    adress:this.props.selectedClient.adress,
                    phone:this.props.selectedClient.phone,
                    isActif:this.props.selectedClient.isActif,
                    created_at:this.props.selectedClient.created_at,
                    remarques:this.props.selectedClient.remarque,
                },
                dossier_client:dossier
            }
        }
        SmartService.reportClient(toSend,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( reportRes => {
            if(reportRes.succes === true && reportRes.status === 200){
                this.setState({loading:false,reportDoss:"",destinationFolder:""})
                this.props.openSnackbar("success","Opération effectué avec succès")
            }else{
                this.setState({loading:false,reportDoss:"",destinationFolder:""})
                this.props.openSnackbar("error",reportRes.error)
            }
        }).catch(err => {
            this.setState({loading:false,reportDoss:"",destinationFolder:""})
            console.log(err)
            this.props.openSnackbar("error","Une erreur est survenue !")
        })
        console.log(JSON.stringify(toSend))*/
        let b64 = "JVBERi0xLjQKJSBSZXBvcnRMYWIgR2VuZXJhdGVkIFBERiBkb2N1bWVudCBodHRwOi8vd3d3LnJlcG9ydGxhYi5jb20KMSAwIG9iago8PAovRjEgMiAwIFIgL0YyIDQgMCBSIC9GMyA1IDAgUgo+PgplbmRvYmoKMiAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjEgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iagozIDAgb2JqCjw8Ci9CaXRzUGVyQ29tcG9uZW50IDggL0NvbG9yU3BhY2UgL0RldmljZVJHQiAvRmlsdGVyIFsgL0FTQ0lJODVEZWNvZGUgL0ZsYXRlRGVjb2RlIF0gL0hlaWdodCAxMDU0IC9MZW5ndGggMTY0MDQgL1N1YnR5cGUgL0ltYWdlIAogIC9UeXBlIC9YT2JqZWN0IC9XaWR0aCA3NDYKPj4Kc3RyZWFtCkdiIjBXSCdpLGJIMEZjazBTKFRJOD1ubmFpY1NUYFJNYV1pJlloYThEa14rNCQ0KnFwKV8qMWJNUT9sOjE0bSVGVFJbKEY2J19PXzskN1JOLDxJWT9VSCFlKlpTNDJrZSdnSW5iWis3OWg8ZEFaOGAtZGNdIj5RTTw7aypIcCVeYD0qc20mQFMxODxTXjxgTTA7ZERQNz8sKXJVbWJXZSdeUy9bYkB1Ti4+MzQhbi9DdS1gVzVMQGcuRDJeM2goZlFzWDExTjNDbkQ/ajdkYEJNTllDV0RkNU5TKClWI207PFo/LXMpKkRRTGQkcXQ9MyxZW0spJFwxUGxRY2lsS0EjV2gmSkpqRHJhc0hdZyMhZE01clZiLko2SElTZD8wP3NsWThJPXMlMVdsRklRW244Vi1cWmY9IjlKaUxQSmdDKF4lKytWK15eXlkxLCpHISw1T2dKciVuYWQnQl9oNXU6XnFadXBKZklMLSRnMiFbUkFRWy9bOU9TJ2UnOXReUC9gZC80YlFkczo1Rm1EdUBRMmlhdG9jZSZOWFxeWWlJazExaCE5bVc+SycoRzJkMkJFImcva0RmcklWNXRwZ18ibmgsZzRuX1RzJVM9b1RdSiRIZFosMW09VSpkXkVXKF9VImVEb2FjT2NoPE5QQHI7PVJLXkFtdVhWXzB0LG42Yy5kVnRFNTNUUDFEQzYnRFVWMCxsaWY+ZVklLVFpSDE3LWgkbEJrRlIoLHFIbiZHXE1GJklqKiNoO0lwVnBtcl4uPSolZFFSMUkpPUZXY2dTTWY0QDFbcmZURU49aDUsPk5Pbz04R11Cc3BgWixjTTBwPUE5bkozaytsKUc5clgkZmlzQV1rJHFZciU6J0Qibkw/O0dOcyFfVEMmaCM9TU9qQjJ1UzB1bGUxKGNqWSw2RyNfRCE2PCU9a1NAWSkpcjwlbVE8WFZzRmlQMEgjYW1wRmgvPmtGXiNObyovXXBGS1I6bWgjVz9ARClyOD1Ibi1yQ2hsLShURHMwXDREbjwrVFhOVWNwNjhLJkRXTEZLXlN0X2ZSWEMvMDg/UTJNPjsoVGooOFk+ZHEiOU9sV1shdVQ+XWBoW1wkUC5ONU1aMFswKU4sLW1IYSldcEo/RW9YOz0vUSNaMzZcbGRmcEUqOCpIJWdUPD9qZzgoM2FtKFdAOzRCKkdzcnIyb0hZR2pjM0tXKDcrSS48LmVhZydqUTdyLGlIbl4lLy85UW9HVipcKjgvb2NlJmkrbU5YVHF0P1hdMD42MnQyO2QrWllNM1JZUmxeNSVIaFs3K2pFUyRzaiZuJGVRO1tYLGwwQEsiUFYxI0ZaTF89PUUpT0FbWmZeTU1vL14nSm5aM05tWCFyTTJyOUQqJ288IkEqbUlnPEkyZ0ZNXlFmYEZ0NVUwRGJLJTxwIUhGYG1qJy4xXTwkK29SY1FRK19jP0c/Nj1UP1FWN0pWTEY5Ij4tXExvbEJkK0d1cV1GamY9LlhsQzNoV1FHTERSZTFbRloxPCRHYDhZbzpWSDkiQyw1VG5YOVRaJVlcP0c/PWpEbStBdT5rITxeby9eJ0poUS5Mb2BOUFZEOkg+dUJvbEFtUVZyYCcuNWxIcD4tMG4iOFk5VlE/UDdLbUpuJzk+IT0kOT0mMENTYS8/OlBDUU09aScjNkxqQVFfdHMldWgwR3BwPzEwKU9uXXBrJV1UKmMrI089Z29rKSpNIVJJXnFRQltZUnNZKVxPMkRzYDNgR00ybmsvakFqSSoiTmUqU2I0MTdPcUA8V11sWDJBVWpAPDRhY2JAcVdqZW09ZFM4UShFKy1JTiRmbi1gLkxjbiFWZ2IkOiQ3QTZUb1FHR05ZaFE9TS1jYiZwPztvVFE6JjVQdUctYT1OMldUNGw1VkBGUihSUmdOSEhAX0xyM0ZTSmo3V2twPG5tIlhJTiVDVTQ3MmgsNG5uI2BRcDxqQEZSXjVTP24sJT1WL3RKKFlJc2JnJ0IqcltyJWktI1NQKTBHblZKNFxlb0FgSW0tRGpoMy5cV0g/M0VxVDkiZWQzSEAlJCpTXE9bRlwoI1IvcyoqQXBOby5ca0RnYjhjOkpeQmAkLVo3ckoldFkjQCFbQ2gtMWY8bElXRz89NDkkV2xHMXByXDFYRjs9Zj1UVjk0KXQjTmBjblNYSUg2TjoqJEkhUGVyLCZuYDJdMEpaRmZRaG9vNDwyImBqJF4jTCluYk0mKVwrQ0EqU1dodTonbWpqMk5Cbjo5NHAwKjgtaVkkTmxTbTs7JVFeWV1AMG1dcTVuWktjcFRnImdqYGwjT25kNTtuakRgO29SPV1hMSFqTSJRcDZocHV1NjJvIzByX1teTmZaKGRcWj9oTEksQV9oRCRbRl1NRUZrLUJBSjZCLWAiTydvbkg1WT5gaDdgVVxoazBHWjJRVTg4Zi87MVBHJ0RSPExrKzFLJ2BeSy42SXVTVlJlN2t0MlgxSDpfS2xlajFcQ2YrVChPOjgwJTo5VThDaV1MXFBrLkhfY1NQbkVoUWZpYGlyYlBqQC1gXiU6SGpUYUg6Y0xsSE9WZU9LVS8iamlKbUI0RDJKajdqJT5AYSshPEBiOmdXM1g2TTRkNTRtMmgpYEROImdGTTAycTw6XClxU09FU1lrayFsZVpYRkVhc2o2WTRHRTNrL21lOkkrOG1WIl5cZEUtbXRYLXVUbk5qanBAZTJcbzdvTyZlNUowW28hakdzSWVgV2tEbS9fRCtZTihMNWppNmNRV25BJ2hFMFdmY0JsPCpBTThNU01eSVNpa0lwSFVfW2xYdGNbSWVOWCZkZSc0NzlXPSJXKEYqYkE2JCNyUjQiMHJwVGw5b2ZvKTFhNyZ1YG4sODpyWEJXL09XYUdcSD0zZltnJUJuW2VyYXRial5PKzVRYHVNZD1wJDFmQWQhKjglaCxkaiQ3NV1rMHM4TW4uTFR1JGlnP1MsPUtPX1wkVy8jKlBWNkAoQF83OXFbcVFjSSNEVTFJMHM3dCtbMDQpOzJqMlVIQXA9QHU5clFwPGBwYyFeImw7dFpGaEFwZ3ExIUwqWFUuKCFLaGdZSVlHMiJVOFFiaERAam5Sa3NZUHFUYTQkMzJrRHI2bm9vWXBrJE5qaUJjKyc1T0lbNDsnL0QvRit0KEc9S11zOEI2VjQ3OUdxOiVRP1QlbUJQXXAqXTo0X1teSjVYSThWKTtEMGw5RWstIyIjY05yJGxLLmBvRGgkSGA/aSRyKm88LmNQLWlaSSolZllLMXM3alBkSC1uLUtxPTRiNEh1USpQWU9PUjhENzgtWyM9JiIiZ2c6SS86Yk5wZGFHNylgRmtVUS1EWVtYaEhAKCFXXUMiMUBTdDlZRnI8Ii86XyJgYldNX0RlaGBdbSwwZCk8IiUhSGc4Il1mYzhjZHNxN2BeWSo3bDJhP3AjMUsxdFAvUiNPRllOTlVpWWVwdCxsRyRXMUE0Yj8ob0I0SFdEN0E+LXFxQlkmcS5ZcSllQFQmJHM4REQhbDE0KWJJKEhjNFVAZS1PNG9iPyg1Tm5ibT9NJ3MubUJiLCYxXUclNVRpa01PIXBYWCZITVBRPl5BY1FJXiNbSS1HPkBgSlErXlA+bXNZKUppZnUwKFxUNmV0czdTZiVxVHJVSWBGI11LWi9WamtjSiEwSm0xcT9dNE5FZixISXA9ZnM3TVNacTdGQ2lHM1c4I2hRYipCXURfSFg1UEVgPlFYNHVQcD8tJSUydVYoJyhSaWUhY3FzIi8yNSdiXls5YmIvaCJaXyVJLFwvMFQoaCNdY1Y9RjNQbmgvbz9oMHBFU2JdKlJzMUc4LS1WS2QuJVFHVENXVSoqX2ZrLWBKXV1WRyFIcls3bF4kTkRUOjlXUGpjWTVTbzE2IVpRR1RvNVg2UCcuP0JyTEE2azA5Q2kmLSksMGUiPU5UMC9UOm5WMzpbJCU7NiZIZV1ZXShdbSYpYUcrJW0mSSlVc1g9aFBlcWtlV0pecTwoIUJxPGJXRkRJUCdaYlZSU2hoVjkzJXB1L2NyMFwzakJyZCpFTzVQKDo9ZjV0XHFjOU1ALC80RkhlamQsSDpwUz0hSnFVN1wtZSZOTVZDbW5eLjAvT1I0NzZuYWE8QTNmZG1zRmJRaDxtKTU/RUpOazxFOmFYKlc1b11zNUQrYy5zS1dTTFpeaGhHcV0pNmNbWXJjWlprXEVPJC5ZPVlEb3M/YjktY1MrMkA7aD8kRytJPlErQUNZUFJSSzpIaUw5SixZMjloaUt1OCc2RGMyNUZNLUdddE0sTmswOyo7aSFXbFxLKDIoYmNpPHBoQj11IkVLci86bCNcXkhBbEstKkpJSXUnPm87V1pdRGZYMTtwXFxWcGtPZDRdcytjcUhHJDErP0osLEZccSotZyVvdXBlQWVSLVNfJ3NiOG9hbzopcXE3QENwPmUmPVZoZjVSR14/Tm1sXlpGXldeIyY4VGgwLls1UyI0YFowdFhjOWhEdEQ8NWorYmhyXGlNSVpmTktFWkQxXjZDdFZkQ1ZkPSRIZXIsJ3VTKkVxYShMMjQkYj9rMXJdQyo3R1JUSFcqXjprZ1VwamxNWm8mV1kwblxpQDFtLTNjZkQ3QT4tcjhKTWddIz0iaUlkcj41XCkkYmJkblxaV0F1XGwicylONTI7NGkrI05kbk5jcT06TTZpO1dXQmdUay5rcW4nbGlIZ0o8K1NzK1d1VG5hXWNfYSIoOlA+PUFmV2ByQ1Qxa0daKnJtXCxbNVYmOyc/NjRJW1opaDlnclwmMlpCJSZkO1I5LihKaEwjInFTV0RnZkcyJGxnQ3BWQkcycjsoK2NnU0w3XjQ1XSRJa284O0RQcFMpSEZgSj9sYykvPzRPcD9YW1RZPTc9MERJUjVQVGpfWCI2b1U/JEcrSWhSbi1lczA6Klk7X0xPT11hLi8/Ul1GdEVHTVJCcElHJTdXbjpBS2RcaVh1WjRubjxXYTZwLVVgUVJfXGtPLVVwcSlkSSdOcEpAMFphNF9yP2IsbWFDVTlPdXBoOHUwZVtvLm5ia1RcYzVGKG9gbCkxL2ZlSzovQ3MzKihcQVk0REVmalRYVltNZzw1aDAlPlhnTVZCM2ZrNTZyZiRrKSQ9WUJnaFJmOGNYOi0uWFhRYlZOa0hiWFJoRGRFJTw3aWxyT1hmWkhqV2A5UWxFPCJUdTNWdFtgcFVAPlBvdDUzbXF0ZVFlLTJZMCRvTEZCZmVZY0QvM11kOSxjaS5iND8kRURmLmxqWXNrPDg5WiYsYiJBLHRpXlc+RTp1RWtZc2MyPzgiZWlIL3BXZUF1aXQ2KlQ5OWgrN3RfX14zS1xWcFxYQiZEZEtrZ2clKzdKKytPNFlnTVhYciw5UWwnZW9HXi1hMSIyJmJnUjRpSik+XEtENnFKRkI6YUQyPDYpNXA/QDBCRCJZXE5ubCkqdXNhVVtsbWJ0UG1MIjlpNUkjWThhTkRlWmxDTClWSWY/ZkNlSHE+L11bPVVzK0hub2ljKTJwRjlYaGY/bWxmaiIvb15AUm02PzgvXjNnJSg/MzA3O15kVnUkNFheU1VKJVpkN0BqPnNBMlVfXjllMV5yW3NyXWAlUVk6XDJ1aG8/VFhOZ01PRjVxc00pKnIpX3FPMTxGbiNxcWU9byRWM2UhITZOSmYwOlJFOzdjTlNxczdvInEoLWYxbWQ6RjdUOU1VaGReOm5zX11tJVNdLS5DWEtEZj4rQ3BZWiMzUD5CZCFSZWIjTE81LkAkbHU4aXVxNWRCW11DM0hjSXFARDcrJUkzWEIkSGUyTl9KNmdMRUN0aXE9PFdPVCEkMWFrKCphWVItJUFycVhzMFw1TzdSM1RBSy1HQWFRdGc7LCkqXSQnTVY0JTI7MmZvYEFNVylDUSpnIW1HPXNFJXBzIyd1OWpJP0BfOm5OIT4vL11gP05jKSVAOkFIMyhJUzwlOyQoIWZCUl8hKmNhOCI7SThNIUBJKCJuJGNVKydVYTdKMko5XS8tcEk7KjlHZWZsOkFwVWEwSmlBJ046Um9tKzpAY0NQWSo2b2QwMFNLMEA4XisiVFQqb0hAXSsvXWEwRWJdZzBjSD8zQ0QtP0QnL1kwKjotMjBANTxQKEJMNS8oTUc4MyFXWm04bDMxQEhvY2claFcjJytaZXIsJ1VUakZCLCRrM1pCSV4mcHBOSSQvUT0vZi5zXlg8LEM4XElCMVpYKmJrKzgjXVtiJ0ZaSFhPSVY3LTBtdWInMnBSMkkvPGE7O25vWz5lPCwnLi09YV5wQlI4cUlSWWdcXVRHPUNBQkgjSFtKLzRoYlRGIl5SIWE6Si1KYHMwTyFOZWkpNVxQZSZLO2kzSCEjZVNGNVs7bHVKQ15OJis9UVBFNWcqJVkmNUszKFo8ZFtAMUEoXlI9PidfUDArYHM0LChPJSQoUG90VCZccEMhIWxcNGpRJWsnTDtubEs5J1NVamFpcSIkbkpCYiYwLW8xKlchKmA+UzpmdTssITRHTTU1VlpDcCFnbmprSkhFLGAiPkM7WCFlaypzI1tnLWUiY0MzMUY5L0Q4P0QmRkhGUl41U0o4MiMhLWomXichN2IiJE9CZDliXlwmZSRsRFlSamJCYWM5Q29KNEFgSGkrXUQ6QXE9QEQpcj5CJ0tPPGNbJDI9PmM4SFAwT0ZoXDBMdEMzKVRkOjtedGJuKkJHZyYoITRib1pjaURYVCEtNGxBVFxjYWQhVFpuZTVbQE1HIW0kcFlKYmxXWCJBZldvIm1YJFAmTztuYyhUN1QpNzAqIlU/NkZJQ01aRSQ3XWcuVVooQkhAQ0hAYF8yMCo1ZXFvYERcLj8zSlYvbDM2PXFINGBDZVc+Q3BIbFU6ZF9WSSFYX1g7Om1vU3BHc1Y9WUJoSTZHNVZuWDs6bV9VZ0BIO1g7Om81Vi1bUDFYOzptX1ZkPyRCNlVPNT9zMmtEOT9EKEplOGdYL2Y8cmRcOl1nK0hWKEJHNSpIQGI9R2JAVSEuIS83LlI/bElVUyEiKTkxXmY3Qk8hPkxgREpaWjRhIkFpNGMiaCVzVCNiXThnJFZZJEMjYl4sKiRWW2QyIjskMDJKVDk4ISEyPDpDWWomWF83Qi07PiFgMUtBIW5OODBAU25lYzM5cyE1aU1bUHI8aUsnKD8zQ2glSEQqMyEwKjZyJl4hTUE0KEJLMmQ/PikzS0s3ZzAnZyZXbFRsQGtPNV1hMTg7VyMmV21vY2VxS1RPKTo4ZXInTnNNMGJsWz1ZQmhpMT9zU1VCIlxKQ3E1Pip1Ui5WWVJWUElPMzh1NUYiR14pNEA/UztFRTZHOmExSHEicEZNNV87W046ZUJGVlBkYTYtSiIoVD4oTSFuQyVWL28+OyQlayJtVWcoQChjaT1GZjYrTlpYKmRdQz1FV2JxMj9wayRXOFhyUSkwRGJrUTgrNm9nMkwrTVo/cUhINkZLdTcwJ0dgXWIkNHMsKExILD8zbkpxJkhLUkgwPnE7NCNfNnBbS2IxPSUhQUhnUTpqaEFGZms1Qy1SJVJiNjM5cyE1OVZQaUExQCVAL0NlOzw6PU9yQjFmSUhQXCFFaCZXP2xKPGFVOVMjLV8iPythS2pxXyRKL1A9Jk1TamBQITdhbiEnU1EtJyEzMmkkLWomXichKXViLU9JWXRmIStuWzVPSEIsWiEsQTA1OEIjbGUhND5aVyxbbkBsSj08R1IpSzA7Ji4ubjVxSkFCWUIlOUJILTtFc0lKTGVZUzA4Q2lcIVFvanQtQSFHL0psVTpnNzZHOl9HZXInT0xPYTxfWFg7Om8hMEQuWTs9WUJoIUdOc25ZWiFJUHU0ZkIxXmAtTiFxRmVXM2BTYjQwLGw6U2FPMEMpJSxlPTFiLTgsYERiV0xxUTwxZENZIj9FPXFEY2t1JiU+WmBXXFRPSD1YRiZYV1NYOzpvYThFdG8+WVsuR3RqL0VpMEIiXEojLGgqNDApJnNWaXJUIi1UN0IlKTxAKGNocktbXkM5QVxBQSJbKyNLNlpYKmMiJlo/TUdBQSY4IUpsIisiX2cybXBgTSRWKk9uQm11JDpWV15ORGNgNDQ/VC8xOEk+STQ2YlAvX1RAIWg4SkNGczJBXEFBIl9HVyUnYWErTyE3QWFDWVVxYVwlSDReLUdWSSVvRm9jYUJuOlZBSS1INF4tU1cjJUFmTiVQKyhXIylhXW5KUFU0IWA6VSZjP14nJmlNYClEQiJcSiNMdCMpQFo8ZFohOyFPa1w9WUJoITIiZjozWDs6bUtTVSwhIWVyJ05BIXBaVilQZm1YMWQwNjBMVzBcOS5dYTAuY1RqQ29Sb2NhQylNMGBsXmVyJ05BMT90XW09WUJpTC5CL1lHQVxBQSJBdS9oJlA0XiIhUltBRDg1MVlWbEJRISszYV1MMXRUXXJHQkFuJkZaSjYmPUxSWUxKWiEqWSYlQmBja0QhLCpoSCxzKD9cITQzWzsmdDhKOyEqWUoxTTlDMlchM0ppKyJELDdQSjxtJDwsLWtNWDVWI2JkWic8RkNsVTpmXDM7IW8/b2NhRDJbPGRcSUg0Xi45O19LOiYlMVQuX1Y+cmtZVzBjTUU8JT1sPi0zLWpibEQ8Rj8oQk07c2xEOl9kKEJNPFBXTCUpIj8zQzcsOyhpKyZocXQoJkdsW29hVi1dJiFINF4tTjpWQEkib2NhQydPYThHZGxVOmVNJUo8VSVlcidPJEhLbGU6bFU6ZS0vKlxGX184M3Q7OkI6RyQ3X0wnWF1hK1VRVE8oTyQ/M0M4OTsobW8xLltAKE8hQzRvWjk3cEEjIWU8Oi8wOSdNVSNRWCFeXWVrXUArb29dPEg+Lm4tV0FIXyJTR0lfTSEsKiMxViNiczUoQkFLTz9MI1taJkhMbGVeIXIsOStvblBIb2htMGdNWkJERmU0VnIsMCo2XCM7KHFhTj8zQzkkVkkiPCgxVipTNSE5dGpgPWg9QmUvY1tfWUhIQ202K29sOW5vZUxhaXJWYjwqITIqY01iOGFZPCFlOkpSMDY6UjgjUVBjPV4hdCZKJkhKVyQ/PjxsXSNRUEs4MD0wYWohISIsbm9lSiZLTVo9a1tvaG1zPTcwJC1lbEQ3LChNWkJDbWU0VlsjKEJIZEBXMGNhTzAqNlp1OyhwRCY/M0M2M1VnQnAtXWErVXE4XEpyKm9jYUFhL0c2OnBsVTplTUFFbV89bFU6ZU1FOV8iZG9jYUFBNityNWA/M0M3KlcwXjYwTVo9azZvallUPyErS1s0SEVnY1ohOSg7Kl1pWm9oSjtAQzg/RT1xRDVbNW1DMEBsJF0rTEcxTShbRktpJjclclpiTCJVNGxHamhEUiZlZjtRVisqO3FTPEA5RW1RJCdAX0UkSVJSWWNYOT1cPDk/M0M4UVVxLGcxSDReLTZULWddV2xVOmcjUGFdIWRYOzpuJlpZSVgvWiFJUDU5cyIwVWBIaSpyMXEuKHMoW0ZLaWNqSDU9P0U9cUQ1YDk8OUhFZ2NaITNOIiZsR1wmXSE0OCFTb2pZVD8hKlcrXEhFZ2NaISVmVTRdaVpvaEo8Z3FUP0U9cUQ1ViE0RDBFKGtKVz8zbnIrSmkzNUBfRSRJI1pOSi5NWkE5N2EvS21ANzAoLTVpbicrXStvbCJsImc4YS43MCgrSzdCUkhtNzAoLGgkPG8xN01aQTowLlY/QHIwKjItTjtTW1VgPzNDNyVVSlVWbV1hK1YqOy90bT9INF4tUk5Jb1snaThBIy43ZmlbSFRhOj0jXWErVjo/TGlFST8zQzhQOSM+bSdQdEtWYyEuYGBwPEEycF0hLmBjS1c+RmtoISduZEk/U0J1ZyEuX1VuQUErNCJWO15DbGVGc2RbTG9rK1lpXFMuRzVWPHNSMDNQbV1OJVAqbE1bJVtoY2ZiRTEzTkA7Om9fOClRKEI+UkpGZmNKRzcwI1VAbDtvWGlNWkE5UlcoNE8nMCoyLj0taGhxbD8zQzhYPFBKLThdYStWOltpRl9RSDReLyghLiErUW9jYUMvMGxqNjBsVTplPV9wI2YjWDs6bTtOQVF1Si5AODYvTVpBODNYMTtRPChCRk0tZTVlNlJNWkE5LEM4ZEptVHFUdCslMDNjPGciJmZtO0Z1O1ghJ2oySDxQO0tmIVdcQ2FaPGpVSyE8PDojOXRhWF4hV1wqZmBkNy5pISEjOVg5T0JJKE1aQTolUkFPO2woQkZMPlsrMElPUHRLVmMhLlxQNFo8alVLITw+UEhXRXNyVSEhI2k3UyhFU2srb247MmBwOUkjLkxjbiFWYGtqcko9MkRLTXRKN28rSCNdODhVVjlRITdhdCMhJ2krIyJUWD9JXWA4JjtXIyNGVihBLl8vYDFnUTxKNjo7LyEiYic3ITw/UyswKiI2Z2wzLjBEN0QvWyRaKUFIPSs7WFZPITV0VTwhLlwyJCROTGBySDMiIlQ7KGhvNy9GIUI9TGRldVchM3JJPSEkRSdNIVdeMDU/MyNMWGUtYzZmTWc+QyhAU25jWTVWMjEoIS9PKFchISc6JihCPlFub2A+LTNVMFtoTT1PW11ZJjt0aTghK0plWSEnaSsjIlRYP0ldYDgmO1cjI0ZWKEEuXy9gMWdRPEo2OjsvISJiJzchPD9TKzAqIjZnbDMuMEQ3RC9bJFopQUg9KztYVk8hNXRVPCEuXDIkJE5MYHJIMyIiVDsoaG83L0YhQj1MZGV1VyEzckk9ISRFJ00hV14wNT8zI0xYZS1jNmZNZz5DKEBTbmNZNVYyMSghL08oVyEhJzomKEI+UW5vYD4tM1UwW2hNPU9bXVkmO3RpOCErSmVZISdpKyMiVFg/SV1gOCY7VyMjRlYoQS5fL2AxZ1E8SjY6Oy8hImInNyE8P1MrMCoiNmdsMy4wRDdEL1skWilBSD0rO1hWTyE1dFU8IS5cMiQkTkxgckgzIiJUOyhobzcvRiFCPUxkZXVXITNyST0hJEUnTSFXXjA1PzMjTFhlLWM2Zk1nPkMoQFNuY1k1VjIxKCEvTyhXISEnOiYoQj5Rbm9gPi0zVTBbaE09T1tdWSY7dGk4IStKZVkhJ2krIyJUWD9JXWA4JjtXIyNGVihBLl8vYDFnUTxKNjo7LyEiYic3ITw/UyswKiI2Z2wzLjBEN0QvWyRaKUFIPSs7WFZPITV0VTwhLlwyJCROTGBySDMiIlQ7KGhvNy9GIUI9TGRldVchM3JJPSEkRSdNIVdeMDU/MyNMWGUtYzZmTWc+QyhAU25jWTVWMjEoIS9PKFchISc6JihCPlFub2A+LTNVMFtoTT1PW11ZJjt0aTghK0plWSEnaSsjIlRYP0ldYDgmO1cjI0ZWKEEuXy9gMWdRPEo2OjsvISJiJzchPD9TKzAqIjZnbDMuMEQ3RC9bJFopQUg9KztYVk8hNXRVPCEuXDIkJE5MYHJIMyIiVDsoaG83L0YhQj1MZGV1VyEzckk9ISRFJ00hV14wNT8zI0xYZS1jNmZNZz5DKEBTbmNZNVYyMSghL08oVyEhJzomKEI+UW5vYD4tM1UwW2hNPU9bXVkmO3RpOCErSmVZISdpKyMiVFg/SV1gOCY7VyMjRlYoQS5fL2AxZ1E8SjY6Oy8hImInNyE8P1MrMCoiNmdsMy4wRDdEL1skWilBSD0rO1hWTyE1dFU8IS5cMiQkTkxgckgzIiJUOyhobzcvRiFCPUxkZXVXITNyST0hJEUnTSFXXjA1PzMjTFhlLWM2Zk1nPkMoQFNuY1k1VjIxKCEvTyhXISEnOiYoQj5Rbm9gPi0zVTBbaE09T1tdWSY7dGk4IStKZVkhJ2krIyJUWD9JXWA4JjtXIyNGVihBLl8vYDFnUTxKNjo7LyEiYic3ITw/UyswKiI2Z2wzLjBEN0QvWyRaKUFIPSs7WFZPITV0VTwhLlwyJCROTGBySDMiIlQ7KGhvNy9GIUI9TGRldVchM3JJPSEkRSdNIVdeMDU/MyNMWGUtYzZmTWc+QyhAU25jWTVWMjEoIS9PKFchISc6JihCPlFub2A+LTNVMFtoTT1PW11ZJjt0aTghK0plWSEnaSsjIlRYP0ldYDgmO1cjI0ZWKEEuXy9gMWdRPEo2OjsvISJiJzchPD9TKzAqIjZnbDMuMEQ3RC9bJFopQUg9KztYVk8hNXRVPCEuXDIkJE5MYHJIMyIiVDsoaG83L0YhQj1MZGV1VyEzckk9ISRFJ00hV14wNT8zI0xYZS1jNmZNZz5DKEBTbmNZNVYyMSghL08oVyEhJzomKEI+UW5vYD4tM1UwW2hNPU9bXVkmO3RpOCErSmVZISdpKyMiVFg/SV1gOCY7VyMjRlYoQS5fL2AxZ1E8SjY6Oy8hImInNyE8P1MrMCoiNmdsMy4wRDdEL1skWilBSD0rO1hWTyE1dFU8IS5cMiQkTkxgckgzIiJUOyhobzcvRiFCPUxkZXVXITNyST0hJEUnTSFXXjA1PzMjTFhlLWM2Zk1nPkMoQFNuY1k1VjIxKCEvTyhXISEnOiYoQj5Rbm9gPi0zVTBbaE09T1tdWSY7dGk4IStKZVkhJ2krIyJUWD9JXWA4JjtXIyNGVihBLl8vYDFnUTxKNjo7LyEiYic3ITw/UyswKiI2Z2wzLjBEN0QvWyRaKUFIPSs7WFZPITV0VTwhLlwyJCROTGBySDMiIlQ7KGhvNy9GIUI9TGRldVchM3JJPSEkRSdNIVdeMDU/MyNMWGUtYzZmTWc+QyhAU25jWTVWMjEoIS9PKFchISc6JihCPlFub2A+LTNVMFtoTT1PW11ZJjt0aTghK0plWSEnaSsjIlRYP0ldYDgmO1cjI0ZWKEEuXy9gMWdRPEo2OjsvISJiJzchPD9TKzAqIjZnbDMuMEQ3RC9bJFopQUg9KztYVk8hNXRVPCEuXDIkJE5MYHJIMyIiVDsoaG83L0YhQj1MZGV1VyEzckk9ISRFJ00hV14wNT8zI0xYZS1jNmZNZz5DKEBTbmNZNVYyMSghL08oVyEhJzomKEI+UW5vYD4tM1UwW2hNPU9bXVkmO3RpOCErSmVZISdpKyMiVFg/SV1gOCY7VyMjRlYoQS5fL2AxZ1E8SjY6Oy8hImInNyE8P1MrMCoiNmdsMy4wRDdEL1skWilBSD0rO1hWTyE1dFU8IS5cMiQkTkxgckgzIiJUOyhobzcvRiFCPUxkZXVXITNyST0hJEUnTSFXXjA1PzMjTFhlLWM2Zk1nPkMoQFNuY1k1VjIxKCEvTyhXISEnOiYoQj5Rbm9gPi0zVTBbaE09T1tdWSY7dGk4IStKZVkhJ2krIyJUWD9JXWA4JjtXIyNGVihBLl8vYDFnUTxKNjo7LyEiYic3ITw/UyswKiI2Z2wzLjBEN0QvWyRaKUFIPSs7WFZPITV0VTwhLlwyJCROTGBySDMiIlQ7KGhvNy9GIUI9TGRldVchM3JJPSEkRSdNIVdeMDU/MyNMWGUtYzZmTWc+QyhAU25jWTVWMjEoIS9PKFchISc6JihCPlFub2A+LTNVMFtoTT1PW11ZJjt0aTghK0plWSEnaSsjIlRYP0ldYDgmO1cjI0ZWKEEuXy9gMWdRPEo2OjsvISJiJzchPD9TKzAqIjZnbDMuMEQ3RC9bJFopQUg9KztYVk8hNXRVPCEuXDIkJE5MYHJIMyIiVDsoaG83L0YhQj1MZGV1VyEzckk9ISRFJ00hV14wNT8zI0xYZS1jNmZNZz5DKEBTbmNZNVYyMSghL08oVyEhJzomKEI+UW5vYD4tM1UwW2hNPU9bXVkmO3RpOCErSmVZISdpKyMiVFg/SV1gOCY7VyMjRlYoQS5fL2AxZ1E8SjY6Oy8hImInNyE8P1MrMCoiNmdsMy4wRDdEL1skWilBSD0rO1hWTyE1dFU8IS5cMiQkTkxgckgzIiJUOyhobzcvRiFCPUxkZXVXITNyST0hJEUnTSFXXjA1PzMjTFhlLWM2Zk1nPkMoQFNuY1k1VjIxKCEvTyhXISEnOiYoQj5Rbm9gPi0zVTBbaE09T1tdWSY7dGk4IStKZVkhJ2krIyJUWD9JXWA4JjtXIyNGVihBLl8vYDFnUTxKNjo7LyEiYic3ITw/UyswKiI2Z2wzLjBEN0QvWyRaKUFIPSs7WFZPITV0VTwhLlwyJCROUXRbND47bG4mOyFiNCEwR1FAVi9rKytUQHFgTVNiYlNxOyhocDJkIytZbShWRlxkLnV1aSpZWis1Qy83R0luIShjPVYua10wNS0oQVtGMzUuLi1SLzFjMjpiTWcxY2tYU0A0XktlcD5edVRhLEslRXVPIWsjJCFXXTM5PUwyVGA/LGwnaXE9QCpIN29MTDJkQVtvXjg3aD45MmJnPD1DaTNPXzVlcCZoXWA6O0kkVnJmdGJCYiQ6UistbWxCXixhJFAxXDo/XiIlM0JUMCdnWHAhYTRLPmo7SW1QJ0gmSjQvVCFERCFvIjVsSTxqVjshSjJhUC45VShCMjtrZmZkc2w1VlVVQig3LVhwVSlLMkVMXF91dHBBdXE+OElecyxobEBVWi5vYD4sUTJoJFY+Qz9GOlJoWTYoNXBTVTQzQFNuY1lkITFJJF46Oz0zYWxeODErMVFeX1AxNTdsK1IwKzEpWGlpTSpFZGcoQUZuPyglcEpUImovSipOLitBVikxZyZMMjpYMUZxYG9oLG0qbidURlpgMCMhJkNfJ2YxdFtIPHJjU2JEUDBIRWMqM2lxc1JhZCtiU3BDRWYjK09sal1ARy1FN3QuZ2BJQjEsJld0dGJMViEwUDs+S3BGSGFlTUhrNGZSbT85J1FRWylKUjJhbHJHb0QqZGMrPVdLZDdeLGJuWkdUVE8taWRNTShRMEEwVE9fWFdvLV86ODMrJUo5YyYlNVpNa0osXTxVYmJcWE9cYzI2TTdZWltzaGtwViwkTk4kLSdETD1MPTFYQDpjMUMsLUApL11XISwuYEE/P2VjTW9lSVJCVVNGVGBtb2AjVyhCQS05Zmo4LXNiLjJaMkslME9yVSFzR00xZSk+S2ZXQjJecjVSPmVoblIwLjAqJz85cEtpOGpyVFlcdW0uT0I4YDxLMG0hNzJRYSotNjQtbFFyJT4yckJrcj84ZENdIUl0QyxZXCRWQ2RxKm9VXFMraypxY1w0LyJUVEhLbl1hIU1WSSVQMmktZUJiRS5AL2I+QDZZISEjamVNVms7aDVISEc8XnBFLW5tbCZzUWpcO28mSCE3WTVlUWU4RVBeM105N0NFQHNmcCYyJDBvYD4tZFFNVnRPWC1wLjNIOlopX2NfZUdCRmVOK0FUXGFRbFliOk9aUDBIRWMqM2lxc1JhaCdxSipJMTtsPiErbVxfdXRwUDEzLF8oRWBKI15AZmJFN14kK3VUV1Y8SD8oKjZLYG9qWCcqYF9MaThjOkAoOFxHKmg+cU5ZX2lqQUJBYyc/PGoxS1otJ0lPJnMvPzMkWSReM1MzVVAxTj5iZjo2Zi1kZmJWVSFKKCNcZkhrXkElJSwycUAtV0xtI08ySG1sREonV2ZXQjFzNVEuc09pU2k6SWIkOm5eITJ1TkQtXzZMNz09Mjs7b0IyMHBOaSU4NWshWmxfNWIyYFZtUztVZz5GZXQ3LzRmYGxiX15XSEozJXU6Tl1XRFpiI0VIRjJua21baU1pQW8hSiE1QW5PbTRfPzdGQEldaVNSM3FAVGBpSDMmUEIob15JUXI2OjBYYmk1KzE5KVVhIjZHM0BhNFhAZVxETydoOjc+ayYuPDNvTmdrdHMpNjpfLSIpYCw3R1JtSylkJ25xJFs6NT9fJilXPTQhW1s8OFFRWSRNKyQqXFI5QE9pYmVCYXVTcWgjOzBBcCxrVjZ0SzV0PTtrSzkmbVx1NkRGVy8lZ1pTa1J1ZFpeUyc9SSplPiYrJkRqPkQ7QW0lZGFSJjpoQ1whciE6JlklWDA1OD4sZFgmRipJOjhzWmQ1THRqPGJodVw4aElzVDVtZF4hKVBtXSpWWXVfMixfPXNGTW5iMWV1VklBaTtLImlPY2VMQ2xSJGI0SDMmUEIuLXI3J1gtbm0scitQIWFvTzBGVS9wRkklW0ZLQHIwKiUqRywlImZnUl5xZEs4IVNDSDtFXT9AM1RcXTowaWJdXShCQ0NoSm1WdXJSXnIiQUEhLXU9OmstJUFcYF1oYyhcSWgwcSY4UGUwRSo4QFdza0IzO1E0KWNnWHRfJz9ZQVBcaDRlM1UrRXBXOkdAMHExYUQ3cT1pVjpSUj9pcUlXaUlRUiouU2RPUShCQ0NoPjhKaF0/NikmT29yIkU/MS1BZ1ZMTUxeQkN0Ii1Bb2RhJ0JULl1DNCE6azlLaUovXlROZFUkUHE9QCpIOCpmXEklMWBxbFhlKktcKFxJaDBcSTNWPGgoJVU9IlVqbUxUWjUhazkmOD0wNGxyREUhJEhJdDA8bVVgPl4+WmpHQ0pUPE84XCxlXiRZMkk1Il8qNlRhZSYoZkBEUD0iVFwrOWBBJ2sxOlFFITBxJDRUX2lRM0opSUg/YT8vOk04P2UjJUZSNyY/S0hSU1VKbShCRFAuTCxFYjBrPTV1Jl87VTEqcG5dWUNvUzJmc3BaU0BzNlVVTm5IcSNVJ2gudFdmWiE1XWMhOUBoYGJyNnFFT1hmUEJPKzcqJG8/UjZQJXQ7bTlFb2tzKz05QlY3RWFOYkooMTRNSz8ydStNS2RXRlU0QTJRPkRnaElcTV87UiQ9ODFSWEJnWXJIKy10O0hWN1dpXVlBUjJqITBFUEBycjF1LDEyNElLYU1IYXRyVWZ0Jj9Gc1wyZFJJUCNHQjNqKjJtMUtxUGAnaGdKL2Y8YiciX05OaSE3I0BwL3NXV2hZNWBxSHQmbUw4YmRncE5mPFY7XCopVSJsMy4xWVA0MCpyPHVoMFdHP2ZDT1pOJ2pLbV42aC41N0lSJ0ArMiF1PE5HREwwJ1dUP2smLXRtQyNnUmBjWzVcQ2Y6SHJ1PnV0OzFlOlM5dEhbQV1LcXFqK2gxPUVkUD8yXz8nXWA6O008XC5OW21wYytIVG5oRUJgWVRdb3A6IipkbyNVPTk1akVeL0ZiQWRyZjUvMDs7N3VycC5aNXBuXC9yVjBhaUJGU29wZyloaEtFLERaZDc0ZVJ0Z0poMkVLUkhkRiFKXjsoaHAyTV8kW1QuW0UsJFNBMjRdcVRHRT0zVFp1QSEkRSpEPTAuY15ZKzEhZ3FsZm5QLkpJLnNvczZtWz1lLjFqP1UmJTFAc3NvPU5VLkdSIVdbOkNfXjBJWnI0cThNY18oNmE5Zks1I3I6LHAuaVJJVXA3YCw8MT8pbm9qYiFpdUQ1VkIoTGA5dWIoaz4tTklGIz5qNltWOCtcZ3FSWiZdYDo9WEQ8Z1BcLlRhbllpLWVaSXBSMiZvbSRnZitJdCopKGM8allqSzdiK0RZPjNWImwzLjFNa2BJc3BmWHQ8RV5HdTZpSXQtYVliP3E2XDQ1aFYpb2A+LDdHTjUlKHBsLGY2cG0tRjBiKiN1RGh1PDhzQmVSYj09LV1KUW1eNmhvR0RnYkpKMnVuI1trQD1zMWRcMT5WWzAyKmUtYzcxVVFOXTxHP1w7Qj5aIS1TNVctXTRdcSRaVC0+c1hsIVdeR1hacjYuJkRialtnbDMuMGRga11UUmxPLyFcN0QvWyRQRGtOXG9XRERiNEFPQjYhKVNaa0VrLThBV29SYGM/MyNLbnJUOT47N248K3M7KGhvNzIyOnROPy1mQUNaOjRFZiE2aVU8a1wrPTlCQ1phNjAqIjZwTCdJb0RVUmNGJjAqJ0BmYGw/IlZEPE5KIVEyZkFCISYwXHNfODM7KTssPWEkKEJBK3RAcTAjRm1kQUgiPmdzLF1bI1c7VWQiXilPUD8zTmMhPEIsc2xLTiNDO19JPj0hMU1iOEFbbSpTZz5vTjQ/MyNMalBsI2JnTXVANEZsMy4vKTJkMzImXCRbTiMlLnNaJTwrQj1yYHE8JlBiIWl1RDVhKicrKTxralI6UyY/ZSJUWUxAXm5zaHNYJl5QOCRNPUgjYlwyKi9VaihZK2pALGJLIS5cZW1RSE5RQl5NSGNcISdqMHApXWU+NWtYWmEtbDMuMGRgX18vcVpoNykoVyMjR2lCUF9MZFlIcCQxNUgjQHVUR2tfI0szYk5ecFFVU14hSiFHVGBsOlgsaCtkVFNNczpIR1JUM3A0QlonLGNhZFx0YFVMIXFuYUBcVFk6Ols7PiEhbSMvMT5LUWREPVVYU2kyQEZsLiVrVGZEZUhEK2ZxTmNuSkVBT2hXSD5WVyxxam9xTypVaFdpWV49WEVQNTonbDMuLzMoYGFMWUJsP2NnInNISUwhJ2tRLFJsNURsPipaYC1VNVhDIUo6cEJeN1hFW2c5QVRjVTdfSmRlLllIaSc8c3NOMlUzWmlqNWZROGBIVE85T0IwYWdAMConQCw2aUgrQVZkLl5aISg4TSEyVi1MNVJKYmwqcVBZMjFCVDFvJEpaZE51XFlwO0UjW2hJYkN0IitrP2Fjbj4hJEhzUl84LVNdPSFyTDxEbC1BYiEpUG5WbVZccS1lLWM4MDpgMTI6P0ZyLGspZ3RZRkgzJlFPUSRSYkhFYCJJaSZBZ3RMXEBcanBxPjVNW2NXJ1NDa2BTVG1UNmRPLXMuXVpdPmlpXVZjQlRvRF5VWjwlOU48YGk+XjU0STQyMUVZSUo8XV5qZDBvUGx0bFM1ISEhJzxYXTBXI2dRVENTXCZfNkMwM0xIMFxCIiM/XmghJmlTVF9bQFVFQkhmcFYmVDlociI0bCFycyVqXnJEQiJTVDYvRV1rImooZXNGR0NBUlxFa282JlpWR2lGcV1oayhXcUs6YHRcOmRDZCMsSkVFby0lQGpsW0AqbXVIOTQwSmhkdHRCIUFjcDteXExTX2NfKDZtWj1PSm9Pb1JhZSUkbyktWCZeTnIuclc3bElja0QnLjQ5JkE/NytoJEdKLmU+YD5BOVVbbDxtMiFXWnM1ayovTS84K0pWL1FDWzorQWM3SyRlKDtkXT5dZG1yJilES2pAJl9Zcy1QJDI2aEdBXjRsVCY9XD1QUzVFPl1LRE48PmRMRFNASkg2PSswM2VPNTRzMWFSRi9kU2pgWSsoaDk+OUlAWnFOaG4uLWxvczQuTj9XOkFjJzZFRlhwVixVRjFLSCY0Zzk+MyghN11RZ15kK2VyMCNhMm1ZLWlXKCZQKD1eMF1WY2RcJWg8aiRTVTs+SD9FX2g9b2FZcmQ/LCRtRVtmTDs7X0xyJUhaLjElMSwzLHRqSCdWTF08OVo+aDNfZ24hOUBUc2RqQnVBN0BTJldBU2MyTF1FOFwzSGJhMDVyJTonPEcxOUFSXl0hbEtpKl4mZEZUPjVXZjVgPiw8O0EsKj1gPEEhMCwmRUw/RV8tQ2U1TXVna2IwUGUpWG4uPEo2Qi1aPDkxJGE/OkhFMFpla008SGltdS5eQF0yP2ZCcWFsW3NsO1JxRUdWbz90TDE0TUViK2w5Qkxma1lITEkwOVslYmUqZEgiMj04PjxWISJ1Uz4nT24pR1FnQjRLMVoldG9cZCRBdV4oRCEuNyltNmQyS2EvRT9hMWdOPkkwYDtXaXFjNU8yI3NTXiRCNj0tR0MoNENpbSVlOktJTjUqWlhOTW0/QzgyUjhwcWJxZykmb0hnY1ttYmtSXnVmIWpIKm4sTThEZTVMTDxoPykmbWBsPyJqaDsoaTpgMHNpWjlCTlsoKEdyWC4tS15oSHBcaTRxUWhzNkMhOmojKilWVkVBRm41OTkxWVw9N14lP0ppU0BIVy1XPC1bWkhtOW06RiclWWtFUVRUa2JkTGg1MmdqUWxDJFQ+WC1HQyg0WnIzbVAnLHVKITFmPjRaP0ZyLGs+SGspUEM4ZEsjPDAscEprTik6azByTWVeOWZMQ2pzNGpua0ZhQjJRY3FNVDFdcSRaVC1AYyVRRi4hczMtJC5VVmEhSGU0L11UZTohXGZWXTh1OS8lL2JxSzNSSllLNzBAKWZYQl8jMmxCI19SdFpHM1RIKmAlNGIrcl0rREVQNTonYnFjXVc5Qk1DdSpMWFE8Vk9uTkZoO3NOaE84ZTczR0UqKEJrUGhwakoxKmxXN1hFZUNQSj8oRioyaHFGSCJRVStqRidxZlNHTDc9RGBIZDknaGFuaTdTJiYxMVUoUmxrR2hQKGhlYyolO2ZmV19eM105N2FpZTNxaXU5LUI+MCNqSjhGTy00YWtwYCo0Xz8+Pm8oMVVTOkVDZGhjMWo0YVFGYV4ickwzalI1bicoJj8rdC1bSCJTYyZQNTRcJ2hqLUFuanRdMDhvVEMzb1oyZyFBZl1bIWU3bjwtWj0mW189QSViIURyVW44P1VwZGkjVzIjWTM9ZCVoJihCQlU7bDdbP0JqakYyZGEqSlVFKGNeUVhEYjZORWVeJWxQaFdeSUJOYzA6MGFXMT5kITBIIWdmTjtLbkJDXjdIZSFRUDVdanVUaWJ0RjZaOE10U0ttXnE8TWBBOmNCJVxXVislaDxjYkcwNlk4QigjPWltZCEjWW4lRnEqYVlgViIyc2JcQVxgW2tzbEg4RnIjbGssYDJFIlYkbWUxNE1YWXQ3KFFjcz0wL2tEUV4+RmorL1pkNF1JSDBOLGFOT2VzLSFNRTc9NlVNZW5ZPjUnbEMpVD1JZTRYXk1hLCwwMFQiSiZdVEQ8RiZrNkowJVh0aHUoYj9rZVxNUGVuUGotMzNbOitsNCZcYCFwJzg3IWstRjNfTXMwInByL2Q/MFIlaF5KTzRCVltFPV1sbjhgMmMsXVdudUEkLUo8L1Qha0hzJmNfO1UvNEllVlo+XkZvUiQ8azVFQ2UhRFlwcjheajJSQik/MC9sZkJqR1JIZGMpbSopTmdZLmgqRGpoa0ROcU10dVVRNzttPiRTXURUTEI5KmdwbDJpKFw/T0pBJWNEKnE6TGdoa25ZKFIhR0UoPyw5b0E9bUUrNjw5cWBva0g/aixtaWQsZyxNbWlcbk5lJ29vM2BpRlVyYSc7cjJZa29zayxTXy88MlhYMGlyQWtxXT4mS2JNbWlcbkskZl5DaEtBLkleSXQjKTpAQGVcbSlQJCluITo8O3AhLz4xXG5SczxhbWg9ay4nMTcqXF1ePGtSXS5cL0g1UllANDZySSthSyZPajQ3TCRtcm9jal5VU0JnaitUUjRdXiM4WC5GPGw/VzFeME4sbFFybjRdL1MnTD5KQldpJW1UYUYiOE51VCEoQWZxP2dgJFlgRGVTYlcwYFc9amMkW19WNygoNWxxVFlBYTBFW2RJZTskOCVnZGIxKV1LYV5sZy49RVNuT2lsNG1GPjdjYVVWR2dNVCQjZjNQUVpndW03bD1KI0UrISlSNEQhcztpMFNUNkhrUW9gYmpwL0Yuc24lR2RnUUJWJmpoPW8yWVgqN2lybVk6Zy5PYz4/W0Q8Z0VXQVcoMC87bD1yYGdpOzssMU5wclVKLGRPVGEzKSovb2YpcE9NSlJOVkU1VXRrYWttPXRgMlIrV1BsI2MmZ2dnKVhcbjFnIS9PVEw4cCVZOV8uKEUwIVtvNG9WayxEXyRBQTNFQVFYLjYtSkJhJ1FMOmMnPzomYWohNjtMblFWNzM1W3BnJiZkbkoyLEVRMj5raElHKD9fbzxiXmlXYUVHTSg3b1FQTW1pWz8+LGNWUVszXj1TMVguWklZKlRUNWYhb3I0NWA2VDZcOGYyXC9nZT9UbEQ6VlgxXEw+WEpFQVtMMT1GWS5UKT9qWTF0ZWZEIToiKiZlIyhEalgtMTZIUkg+SV0hXlEwQzduLmdWWFw4WDdCOjx0b0ZgLDglLU0+aC1KRUFSZy9wSSxzNzhxTjAwKignRUNpbSVuVUVmUz1ScV9gcElsbkJNcSN+PmVuZHN0cmVhbQplbmRvYmoKNCAwIG9iago8PAovQmFzZUZvbnQgL0hlbHZldGljYS1Cb2xkIC9FbmNvZGluZyAvV2luQW5zaUVuY29kaW5nIC9OYW1lIC9GMiAvU3VidHlwZSAvVHlwZTEgL1R5cGUgL0ZvbnQKPj4KZW5kb2JqCjUgMCBvYmoKPDwKL0Jhc2VGb250IC9UaW1lcy1Sb21hbiAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvTmFtZSAvRjMgL1N1YnR5cGUgL1R5cGUxIC9UeXBlIC9Gb250Cj4+CmVuZG9iago2IDAgb2JqCjw8Ci9Db250ZW50cyAxMCAwIFIgL01lZGlhQm94IFsgMCAwIDU5NS4yNzU2IDg0MS44ODk4IF0gL1BhcmVudCA5IDAgUiAvUmVzb3VyY2VzIDw8Ci9FeHRHU3RhdGUgPDwKL2dSTHMwIDw8Ci9jYSAuMgo+Pgo+PiAvRm9udCAxIDAgUiAvUHJvY1NldCBbIC9QREYgL1RleHQgL0ltYWdlQiAvSW1hZ2VDIC9JbWFnZUkgXSAvWE9iamVjdCA8PAovRm9ybVhvYi4xNDExNzk3YWY0OTVlOGY3ODgzYmQwNzFiMzIxOWZhYyAzIDAgUgo+Pgo+PiAvUm90YXRlIDAgL1RyYW5zIDw8Cgo+PiAKICAvVHlwZSAvUGFnZQo+PgplbmRvYmoKNyAwIG9iago8PAovUGFnZU1vZGUgL1VzZU5vbmUgL1BhZ2VzIDkgMCBSIC9UeXBlIC9DYXRhbG9nCj4+CmVuZG9iago4IDAgb2JqCjw8Ci9BdXRob3IgKGFub255bW91cykgL0NyZWF0aW9uRGF0ZSAoRDoyMDIxMDMwOTAxMjEyNyswMCcwMCcpIC9DcmVhdG9yIChSZXBvcnRMYWIgUERGIExpYnJhcnkgLSB3d3cucmVwb3J0bGFiLmNvbSkgL0tleXdvcmRzICgpIC9Nb2REYXRlIChEOjIwMjEwMzA5MDEyMTI3KzAwJzAwJykgL1Byb2R1Y2VyIChSZXBvcnRMYWIgUERGIExpYnJhcnkgLSB3d3cucmVwb3J0bGFiLmNvbSkgCiAgL1N1YmplY3QgKHVuc3BlY2lmaWVkKSAvVGl0bGUgKHJhcHBvcnQgT0FsZWdhbCkgL1RyYXBwZWQgL0ZhbHNlCj4+CmVuZG9iago5IDAgb2JqCjw8Ci9Db3VudCAxIC9LaWRzIFsgNiAwIFIgXSAvVHlwZSAvUGFnZXMKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9GaWx0ZXIgWyAvQVNDSUk4NURlY29kZSAvRmxhdGVEZWNvZGUgXSAvTGVuZ3RoIDIxMTQKPj4Kc3RyZWFtCkdiIi8qOTViYj4lKTIlL2JjcVc4blc8QTFYYS48JkkmV2wuSj4qOydPZHVWUFBmTzEtcFdKITBtViQ3YmtjQmxLbSJIKkdRRlBoLmpAOV4lZUdwOVQiNkshQC9TISxZbS8vXnA1ZG5DPFRYXElzJGhlPktxUlkqXUYwc1ljVS50YDVjRmBxYWViU09lSWYiOzRicztBNERtKyZEZixKcExTV2hbb0tTPTJ1aSw+ZjpmWlcrOWNdb29eZ1ldLVVqY0M2LVFTW0ZJYkwsV1BJa2pATzxoYSs3LGhHWFxbYmU8XjAhRSE6ZyRRUFpiP25XU3JwIypLXGJgXGRaODNqKlxXR3UmJjpTNldPKTRkXSEpKz5MNEYxQzlIWiM/K1ohUWtkbWx0WF5wVjFnUXE3Pml1K3RYVkpxRWooM0pdbHFBbDYjbF8mLFE8R3AiLypuZzpJSUssUWdtbkxUUDxKPTUzQ19NZ2VyTz9lRWRcbU9gMjhrcTBkNT4oQVFJJU5qLkFqYD8tVDMpZ1k9QyRESSpxW0lvT047UU5NMWJMY1tHZk9STUUlVDMoWFUsP0A/IzhyMzUtYHI8RHRnbTRxalMrZ21wX0ouckwsRkA8L3FuYlAhQCpqZWdYMjYqQmssLHE7KC9PXWpRJ1lGQi5pZUFsSm9YTTJdNnMvKypPJ2tvLXM4PS8raUs8ZDotXFZGJkkuYXBlPXM3cF0ic0lYXGFqTjM4VGpePTVGT0cmWV4rSiFLXmonLGo6XV8qTExTXmBxKEMiKis+MCx0WFxPU0ljREc+LTwiIU0zOGdyJmxMdEFSZTY2ZCgyPU84Lz9SInE2TC5fajFSRC1ROkopT1MnSjFtJydNIi5mWE5Yc1FmLXUoVVhWIiNmWTAkLjtZailLOW5FJD8jTDtKIklVZ2xrKjRbQFBSaWRGLTQtdCtDQSZLJ250LmpaWl8kLD1fQk1RP0wiNXM8dWQvbj9EYlA+MCtYa2JMRD1jIk1nZDhTKGp1Nj5ZQ0BKODpwZmA6Y2JtL2otZ01TYjpsKWxbdF5NL3VFRGZkOGhHP0hlKT1LK2NzS3IoLnIuKzwuYD5rJWNVL1grTCNyLTVpPlRDMl9ZaHA7PC8/bDtbUSQvRSoxSDNbU09eYVNUWUJsOk9wNkhbY1hsK2REa1pyNCJXVTJFam4vZyNMSE00X19vbSFGNHBaPUpbIUMpZ0psL1wzKl5DJk8vOlteXW1eWnVcKFNnTTUhTnJjRDdkWV9TLmtFISZTLDUpQk9SXyE8azU2LUVuVT1yO2hiX0hnIkgtc0U/Wm5OS3JoJl8wTUM4aURyLC9CYGxQRC0tNGxRZSpecjZZPCEhO2wlWTdKZyc9YiNSTFw6IUY9Q14kSS8tSi07IWYsPk9wKy4yV3BSJnRZKDhmOjVtKWdvZSpsRTpOSEIzY3IxTShPVz0yJUYoTW0pOi1YJlBdLjdxKGgxLWFbQllFO15daVxaRCVAU2FhIURyWVNuRGBmR2QjTi1NO0pRSV5CLFBjK0ZOckZLPChELjBPLzwvT2EoUGhEPGdnTzBKW2c2aWNzYjczUVdkX1RxZG0xUiRQTXFzRHNYSnRFdHBoSFw/OHA5bCknXkVlR3I+OGVTWCxqKCQmXEBnUVxaVVlOanVVbDxnXE8zKSc1ZFtcNTo3Iiw5ajhdIjJLcEBzRzBhWjtySmlGbGNDTiVhTlImR0heSGReUXJUIiNzJSdFWykiYlRmPD9baCItQFJOYltSJDYnS3JPZmNUOl86MFJWWiYnVydiLGxXWWFWLCI9KmNLUSxzTm0/LiRTI2NgbHVrI2EmZ0VMP08nXDwyLGRSJnFRVyFhLV1HYW03T2xQPE9QUHQ/UD4tTGMnKUprQTc4czA7X1ZqKiczN1JgLkI2Ll03VHVKMS5sZGJkOFpvZ2c7NTpNJWJSLGMrXFc6PldYOiJCIzNyNi5CU2w1RG0xbSJDNCNcRT5jUGcyKDJYO2YyZzxMKSFHPF0zPys3O1suR25BWTtkbU1tKTozLydrPS9EWGw3Xkk/Zzg6YCMzWD1mLDonSWchZEJhKCsoTUtWVmAoMDxdImVwSSVnJDk6cTJxUmBMYj9RNSU+R2VOUGJBTkdiTSNgVj0hbjhUIVkoTi5gblU1bllGUmYoYls3KzpSTC9PWC1vQDg4WjAqJ0UoZmlJMmdVcU87IV87LktdLGEkaTldRSFgKmVfUmkrPXIqWEN1JyZablFiKCRrQzFLZlgmLV9FPD05Mj5dMlM5OF4jbzxCT00kIiQ/dC5SYTI1QiJmPjt0cSQ1Xi5tRTcuXCsuYmJjZmxjby5INlJRY05Vc2MqIlZmY05KT2ctSmZlXmJdKFVTMHBmW0JaJFZEWC4pbTgqVDliLlNdMGRpJWFoTloxTyYkLjcrXyVeMiQ3UjpbOHJMK0I4JShWJV8iOidrVk5NM14hNSEtYEs3TDVqRyliIkouLio+XlslQl1uR2JUQUwjUFhAQGFOXV5PUS1iOTFLTj4vbTRkTSFucyohTCUsK0dcYkcpQ1BObU9ZWnU4SCk7OCQ9PUxQZWghaionOD03TGduI2FvbC5yX2YydSolMzJOZyVuIm1IWW9wbFBjJ0cyRT1WXldaOkhcc1ZTLjVlLjlUITY0Y1RdLEY9NTJmOEUxZj9vRjIuZk1GMjY8MiUzQDUvYVJII3RTZEdZSiZFYzN0NHBUTkZoP3MuKSxLc1pbSkNMdSRTZEdlJjp1bWYpa1dUPC1eLyRAJlppPztqYzErZDJZRFQkQSghdV5UXmtjMVlDLi8kYThBSjorIWZYI2Q9VH4+ZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgMTEKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDczIDAwMDAwIG4gCjAwMDAwMDAxMjQgMDAwMDAgbiAKMDAwMDAwMDIzMSAwMDAwMCBuIAowMDAwMDE2ODI4IDAwMDAwIG4gCjAwMDAwMTY5NDAgMDAwMDAgbiAKMDAwMDAxNzA0OSAwMDAwMCBuIAowMDAwMDE3MzUzIDAwMDAwIG4gCjAwMDAwMTc0MjEgMDAwMDAgbiAKMDAwMDAxNzcyNCAwMDAwMCBuIAowMDAwMDE3NzgzIDAwMDAwIG4gCnRyYWlsZXIKPDwKL0lEIApbPGVlZGY3MDg5NzMxYjVlYmFiZDUyZGRlMzJhMGU5OWE1PjxlZWRmNzA4OTczMWI1ZWJhYmQ1MmRkZTMyYTBlOTlhNT5dCiUgUmVwb3J0TGFiIGdlbmVyYXRlZCBQREYgZG9jdW1lbnQgLS0gZGlnZXN0IChodHRwOi8vd3d3LnJlcG9ydGxhYi5jb20pCgovSW5mbyA4IDAgUgovUm9vdCA3IDAgUgovU2l6ZSAxMQo+PgpzdGFydHhyZWYKMTk5ODkKJSVFT0YK"
        this.addRoomB64File(b64,"report_test")
    }

    addRoomB64File(b64,name){
        let room = this.state.selectedRoom;
        let files = room.files || [];

        files.push({
            b64:b64,
            name:name,
            added_at:moment().format("YYYY-MM-DD HH:mm:ss"),
            added_by:{
                email:localStorage.getItem("email"),
                id:main_functions.getContactIdByEmail(this.props.contacts,localStorage.getItem("email"))
            },
            type:"b64"
        })
        room.files = files
        rethink.update("test",'table("rooms").get('+JSON.stringify(room.id)+').update('+ JSON.stringify(room) + ')',db_name,false).then( updateRes => {
            if (updateRes && updateRes === true) {
                alert("Ajout effectué avec succès")
                this.setState({loading:false})
            } else {
                console.log("Error update room files")
            }
        }).catch(err => {console.log(err)})
    }


    render() {

      const openDrivePopup = Boolean(this.state.anchorElDrive);
      const id = openDrivePopup ? 'drive-popover' : undefined;

    return(
        <div style={{ marginTop: 30 }}>
          <Collapse>
            {
              this.state.client_mandat && this.state.client_mandat.folders && (this.state.client_mandat.folders || []).map((doss,key) =>
                  <Panel key={key} headerClass="mandat_collapse_header"
                         header={
                             <div style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                                 <h5>{doss.name}</h5>
                                 <div style={{position:"absolute",right:45}}>
                                     <AtlButton
                                         spacing="compact"
                                         appearance="default"
                                         iconBefore={<PictureAsPdfIcon size="small" />}
                                         onClick={(e) => {
                                             this.setState({anchorElDrive:e.currentTarget,reportDoss:doss})
                                         }}
                                     >
                                         Générer le document
                                     </AtlButton>
                                 </div>

                             </div>
                         }
                  >
                      <Popover
                          id={id}
                          open={openDrivePopup}
                          anchorEl={this.state.anchorElDrive}
                          onClose={() => {
                              this.setState({anchorElDrive: null})
                          }}
                          anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                          }}
                          transformOrigin={{
                              vertical: 'top',
                              horizontal: 'center',
                          }}
                      >
                          <div style={{padding:15,height:600,width:300,paddingBottom:50}}>
                              <div align="right">
                                  <IconButton size="small" onClick={() => {
                                      this.setState({anchorElDrive:null,expandedDrivePopUpKeys:[],selectedDrivePopUpKeys:[],destinationFolder:""})
                                  }}
                                  >
                                      <CloseIcon />
                                  </IconButton>
                              </div>

                              <h6 style={{color:"darkblue"}}>Dans quel Room voulez-vous ajouter le document ? </h6>
                              <div style={{marginTop:20,maxHeight:430,overflowY:"auto"}}>
                                  <ul style={{listStyle:"none",marginLeft:-30}}>
                                      {
                                          this.props.rooms.map((room,key) => (
                                              <li onClick={() => {this.setState({selectedRoom:room})}}
                                                  style={{padding:7,marginTop:5,cursor:"pointer",backgroundColor:"#f0f0f0",borderRadius:7.5,fontWeight:700}}>{room.title}</li>
                                          ))
                                      }
                                  </ul>
                              </div>
                              <div style={{position:"absolute",bottom:50}}>
                                  <span style={{color:"#000"}}>Room sélectionné:&nbsp;
                                      <span style={{fontWeight:"bold"}}>{(this.state.selectedRoom && this.state.selectedRoom !== "") ? this.state.selectedRoom.title : ""}
                                      </span>
                                  </span>
                              </div>
                              <div align="right" style={{position:"absolute",bottom:10,right:15}}>
                                  <AtlButton
                                      isDisabled={!this.state.selectedRoom || this.state.selectedRoom === ""}
                                      appearance="primary"
                                      onClick={() => {
                                          this.reportClient(this.state.reportDoss)
                                      }}
                                  >
                                      Valider
                                  </AtlButton>
                              </div>
                          </div>
                      </Popover>
                    <div className="row">
                      <div className="col-md-12">
                        <h5>Crée par: {localStorage.getItem("email") === doss.created_by ? "Vous" : doss.created_by }</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <div align="right">
                          <AtlButton
                              onClick={() => {

                                if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id")  ){
                                  this.setState({toRemoveFolderKey:key,toRemoveFolder_id:doss.folder_id, openDeleteModal:true})
                                }else{
                                  alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
                                }
                              }}
                              appearance="danger"
                          > Supprimer ce dossier </AtlButton>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12" style={{display:"flex"}}>
                        <FolderIcon/>
                        <h5 style={{textDecoration:"underline",textTransform:"uppercase",
                          cursor:"pointer",color:"cornflowerblue",marginTop:5,marginLeft:8}}
                            onClick={() => {
                              if(localStorage.getItem("client_folder_id") || localStorage.getItem("client_shared_folder_id")  ){
                                this.props.onFolderClick(doss.folder_id,this.state.client_mandat.folder_id)
                              }else{
                                alert("Vous n'avez pas les droits et l'accès au dossier CLIENTS pour effectuer cette opération !")
                              }
                            }}
                        >
                          Voir le contenu du dossier
                        </h5>
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col-md-6">
                        <div>
                          Nom du dossier
                        </div>
                        <div>
                          <input
                              style={{ color: '#000' }}
                              className="form-control"
                              value={doss.name}
                              onChange={(e) => {
                                  let obj = this.state.client_mandat;
                                  obj.folders[key].name = e.target.value;
                                  this.setState({client_mandat:obj,mandatFolderNameChanged:true})
                              }}

                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          Type de dossier
                        </div>
                        <div>
                          <select
                              className="form-control custom-select"
                              value={doss.type}
                              onChange={(e) => {
                                let obj = this.state.client_mandat;
                                obj.folders[key].type = e.target.value;
                                this.setState({client_mandat:obj})
                              }}
                          >
                            {
                              Data.secteurs2.map((secteur, key) =>
                                  <option
                                      key={key}
                                      value={secteur}>{secteur}</option>
                              )
                            }
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12" style={{marginTop:20}}>
                        <div>
                          Description du mandat
                        </div>
                        <div>
                      <textarea
                          style={{color: "#000",maxWidth:700}}
                          className="form-control"
                          value={doss.desc}
                          onChange={(e) => {
                            let obj = this.state.client_mandat;
                            obj.folders[key].desc = e.target.value;
                            this.setState({client_mandat:obj})
                          }}
                          rows={5}
                      />
                        </div>
                      </div>
                    </div>


                    <div className="row" style={{marginTop:20}}>
                      <div className="col-md-6">
                        <p style={{ marginBottom: 10 }}>Contrepartie</p>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={doss.contrepartie}
                            onChange={(e) => {
                              let obj = this.state.client_mandat;
                              obj.folders[key].contrepartie = e.target.value;
                              this.setState({client_mandat:obj})
                            }}
                        />
                      </div>
                      <div className="col-md-6">
                        <p style={{ marginBottom: 10 }}>Autres parties</p>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            name="email"
                            value={doss.autrepartie}
                            onChange={(e) => {
                              let obj = this.state.client_mandat;
                              obj.folders[key].autrepartie = e.target.value;
                              this.setState({client_mandat:obj})
                            }}
                        />
                      </div>
                    </div>

                    <hr style={{
                      width: '100%',
                      height: 1,
                      backgroundColor: '#c0c0c0',
                      marginTop: 35,
                      marginBottom: 30
                    }} />

                    <div>
                      <h4>Facturation</h4>
                      <div className="row mt-2">
                        <div style={{minWidth:500}} className="col-md-6">
                          <div style={{ display: 'flex' }}>
                            <div className="mt-2">Associés</div>
                            <IconButton size="small" style={{ marginTop: -5, marginLeft: 3 }}
                                        onClick={() => {
                                          let objCp = this.state.client_mandat;
                                          if(objCp.folders[key].team && objCp.folders[key].team.length > 0){
                                            objCp.folders[key].team.push({
                                              fname: '',
                                              email: '',
                                              id: '',
                                              tarif: '',
                                              type: 'lead'
                                            });
                                          }else{
                                            objCp.folders[key].team = [{
                                              fname: '',
                                              email: '',
                                              id: '',
                                              tarif: '',
                                              type: 'lead'
                                            }]
                                          }
                                          this.setState({ client_mandat: objCp });
                                        }}>
                              <AddCircleIcon color="primary" />
                            </IconButton>
                          </div>
                          {
                            (doss.team || []).map((item, i) =>
                                item.type === "lead" &&
                                <div key={i}  className="mb-1" style={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  marginTop: 15
                                }}>
                                  <div>
                                    <div>
                                      <MuiSelect
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          style={{ width: 230,marginTop:20 }}
                                          onChange={(e) => {
                                            let id = e.target.value;
                                            let contact = this.props.contacts.find(x => x.id === id || x.uid === id)
                                            if (contact) {
                                              let objCp = this.state.client_mandat;
                                              objCp.folders[key].team[i].fname = contact.nom + ' ' + contact.prenom;
                                              objCp.folders[key].team[i].email = contact.email;
                                              objCp.folders[key].team[i].id = id;
                                              objCp.folders[key].team[i].tarif = contact.rateFacturation || '';
                                              this.setState({ client_mandat: objCp });
                                            }
                                          }}
                                          value={doss.team[i].id ? doss.team[i].id : doss.team[i].uid }
                                      >
                                        {this.props.contacts.filter(x => x.type === "associe" ).map((contact, key) => (
                                            <MenuItem
                                                key={key}
                                                value={contact.uid || contact.id}>
                                              <div style={{display:"flex"}}>
                                                <Avatar style={{marginLeft:10}}
                                                        alt=""
                                                        src={contact.imageUrl} />
                                                <div className="text-ellipsis-230" style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                              </div>
                                            </MenuItem>
                                        ))}
                                      </MuiSelect>
                                    </div>
                                  </div>
                                  <div style={{ marginTop: doss.team[i].id !== '' ? 12 : -7 }}>
                                    <div style={{marginLeft:10}}>
                                      Taux horaire
                                    </div>
                                    <Input
                                        style={{ width: 210,marginLeft:10 }}
                                        className="form-control "
                                        id="duree35411"
                                        name="duree687811"
                                        type="text"
                                        endAdornment={
                                          <InputAdornment
                                              position="end">CHF/h</InputAdornment>}
                                        value={doss.team[i].tarif}
                                        onChange={(e) => {
                                          let objCp = this.state.client_mandat;
                                          objCp.folders[key].team[i].tarif = e.target.value;
                                          this.setState({ client_mandat: objCp });
                                        }}
                                    />
                                  </div>
                                  <div>
                                    <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: doss.team[i].id !== '' ? 28 : 8}}
                                                onClick={() => {
                                                  let objCp = this.state.client_mandat;
                                                  objCp.folders[key].team.splice(i,1)
                                                  this.setState({ client_mandat: objCp });
                                                }}
                                    >
                                      <DeleteOutlineIcon color="error"/>
                                    </IconButton>
                                  </div>
                                </div>
                            )
                          }
                        </div>

                        <div className="col-md-6" style={{minWidth:500}}>
                          <div style={{ display: 'flex' }}>
                            <div className="mt-2">Collaborateur/Stagiaire</div>
                            <IconButton size="small" style={{ marginTop: -5, marginLeft: 3 }}
                                        onClick={() => {
                                          let objCp = this.state.client_mandat;
                                          if(objCp.folders[key].team && objCp.folders[key].team.length > 0){
                                            objCp.folders[key].team.push({
                                              fname: '',
                                              email: '',
                                              id: '',
                                              tarif: '',
                                              type: 'team'
                                            });
                                          }else{
                                            objCp.folders[key].team = [
                                              {
                                                fname: '',
                                                email: '',
                                                id: '',
                                                tarif: '',
                                                type: 'team'
                                              }
                                            ]
                                          }
                                          this.setState({ client_mandat: objCp });
                                        }}>
                              <AddCircleIcon color="primary" />
                            </IconButton>
                          </div>
                          {
                            (doss.team || []).map((item, j) =>
                                item.type === "team" &&
                                <div key={j}  className="mb-1" style={{
                                  display: 'flex',
                                  justifyContent: 'flex-start',
                                  marginTop: 15
                                }}>
                                  <div>
                                    <div>
                                      <MuiSelect
                                          labelId="demo-simple-select-label"
                                          id="demo-simple-select"
                                          style={{ width: 230 ,marginTop:20}}
                                          onChange={(e) => {
                                            let id = e.target.value;
                                            let contact = this.props.contacts.find(x => x.id === id || x.uid === id)
                                            if (contact) {
                                              let objCp = this.state.client_mandat;
                                              objCp.folders[key].team[j].fname = contact.nom + ' ' + contact.prenom;
                                              objCp.folders[key].team[j].email = contact.email;
                                              objCp.folders[key].team[j].id = id;
                                              objCp.folders[key].team[j].tarif = contact.rateFacturation || '';
                                              this.setState({ client_mandat: objCp });
                                            }
                                          }}
                                          value={doss.team[j].id ? doss.team[j].id : doss.team[j].uid}
                                      >
                                        {this.props.contacts.filter(x => !x.type ).map((contact, key) => (
                                            <MenuItem
                                                key={key}
                                                value={contact.uid || contact.id}>
                                              <div style={{display:"flex"}}>
                                                <Avatar style={{marginLeft:10}}
                                                        alt=""
                                                        src={contact.imageUrl} />
                                                <div className="text-ellipsis-230" style={{marginTop:10,marginLeft:8}}>{contact.nom + ' ' + contact.prenom}</div>
                                              </div>
                                            </MenuItem>
                                        ))}
                                      </MuiSelect>
                                    </div>
                                  </div>
                                  <div style={{ marginTop: doss.team[j].id !== '' ? 12 : -7 }}>
                                    <div style={{marginLeft:10}}>
                                      Taux horaire
                                    </div>
                                    <Input
                                        className="form-control "
                                        id="duree35411"
                                        style={{ width: 210,marginLeft:10 }}
                                        name="duree687811"
                                        type="text"
                                        endAdornment={
                                          <InputAdornment
                                              position="end">CHF/h</InputAdornment>}
                                        value={doss.team[j].tarif}
                                        onChange={(e) => {
                                          let objCp = this.state.client_mandat;
                                          objCp.folders[key].team[j].tarif = e.target.value;
                                          this.setState({ client_mandat: objCp });
                                        }}
                                    />
                                  </div>
                                  <div>
                                    <IconButton title="Supprimer cette ligne" style={{marginLeft:10,marginTop: doss.team[j].id !== '' ? 28 : 8}}
                                                onClick={() => {
                                                  let objCp = this.state.client_mandat;
                                                  objCp.folders[key].team.splice(j,1)
                                                  this.setState({ client_mandat: objCp });
                                                }}
                                    >
                                      <DeleteOutlineIcon color="error"/>
                                    </IconButton>
                                  </div>
                                </div>
                            )
                          }
                        </div>

                      </div>
                    </div>


                    <div className="mt-4">
                      <h5>FACTURATION-CLIENT</h5>

                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div>Fréquence</div>
                                <select
                                    className="form-control custom-select"
                                    value={doss.facturation.frequence}
                                    onChange={(e) => {
                                        let obj = this.state.client_mandat;
                                        obj.folders[key].facturation.frequence = e.target.value
                                        this.setState({client_mandat:obj})
                                    }}
                                >
                                    <option value="Mensuelle">Mensuelle</option>
                                    <option value="Trimestrielle">Trimestrielle</option>
                                    <option value="Semestrielle">Semestrielle</option>
                                    <option value="Annuelle">Annuelle</option>

                                </select>
                            </div>
                            <div className="col-md-6">
                                <div>Langue de Facturation</div>
                                <select
                                    className="form-control custom-select"
                                    value={doss.facturation.language}
                                    onChange={(e) => {
                                        let obj = this.state.client_mandat;
                                        obj.folders[key].facturation.language = e.target.value
                                        this.setState({client_mandat:obj})
                                    }}
                                >
                                    <option value="Francais">Français</option>
                                    <option value="Anglais">Anglais</option>
                                </select>
                            </div>
                        </div>


                      {/*<div className="row align-items-center">
                        <div className="col-md-5">
                          <div
                              className="row justify-content-center align-items-center">
                            <div
                                className="col-md-4">
                              <div>Par Email</div>
                            </div>
                            <div
                                className="col-md-8">
                              <CB color="primary"
                                  checked={doss.facturation.byEmail === "true"}
                                  onChange={(e) => {
                                    let obj = this.state.client_mandat;
                                    obj.folders[key].facturation.byEmail = (e.target.checked).toString()
                                    this.setState({client_mandat:obj})
                                  }}
                              />
                            </div>
                          </div>
                          <div
                              className="row justify-content-center align-items-center">
                            <div
                                className="col-md-4">
                              <div>Fréquence</div>
                            </div>
                            <div
                                className="col-md-8">
                              <MuiSelect
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  style={{ width: '100%' }}
                                  value={doss.facturation.frequence}
                                  onChange={(e) => {
                                    let obj = this.state.client_mandat;
                                    obj.folders[key].facturation.frequence = e.target.value
                                    this.setState({client_mandat:obj})
                                  }}
                              >
                                <MenuItem
                                    value={'Mensuelle'}>Mensuelle</MenuItem>
                                <MenuItem
                                    value={'Trimestrielle'}>Trimestrielle</MenuItem>
                                <MenuItem
                                    value={'Semestrielle'}>Semestrielle</MenuItem>
                                <MenuItem
                                    value={'Annuelle'}>Annuelle</MenuItem>
                              </MuiSelect>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div
                              className="row justify-content-center align-items-center">
                            <div
                                className="col-md-6">
                              <div>Envoyé par le secrétariat
                              </div>
                            </div>
                            <div
                                className="col-md-6">
                              <CB color="primary"
                                  checked={doss.facturation.sentBySecr === "true"}
                                  onChange={(e) => {
                                    let obj = this.state.client_mandat;
                                    obj.folders[key].facturation.sentBySecr = (e.target.checked.toString())
                                    this.setState({client_mandat:obj})
                                  }} />
                            </div>
                          </div>
                          <div
                              className="row justify-content-center align-items-center">
                            <div
                                className="col-md-6">
                              <div>Envoyé par l’avocat
                              </div>
                            </div>
                            <div
                                className="col-md-6">
                              <CB color="primary"
                                  checked={doss.facturation.sentByAvocat === "true"}
                                  onChange={(e) => {
                                    let obj = this.state.client_mandat;
                                    obj.folders[key].facturation.sentByAvocat = (e.target.checked).toString()
                                    this.setState({client_mandat:obj})
                                  }} />
                            </div>
                          </div>
                          <div
                              className="row justify-content-center align-items-center">
                            <div
                                className="col-md-6">
                              <div>Langue de Facturation
                              </div>
                            </div>
                            <div
                                className="col-md-6">
                              <MuiSelect
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  style={{ width: '100%' }}
                                  value={doss.facturation.language}
                                  onChange={(e) => {
                                    let obj = this.state.client_mandat;
                                    obj.folders[key].facturation.language = e.target.value
                                    this.setState({client_mandat:obj})
                                  }}
                              >
                                <MenuItem
                                    value={'Francais'}>Français</MenuItem>
                                <MenuItem
                                    value={'Anglais'}>Anglais</MenuItem>
                              </MuiSelect>
                            </div>
                          </div>
                        </div>
                      </div>*/}

                    </div>

                    <div className="row mt-2">
                      <div className="col-md-12">
                        <div align="right">
                          <AtlButton
                              onClick={() => {
                                this.props.update_client_case(this.state.client_mandat.id, this.state.client_mandat, this.state.mandatFolderNameChanged, doss)
                              }}
                              appearance="primary"
                              style={{ margin: 20 }}> Enregistrer vos modifications </AtlButton>
                        </div>
                      </div>
                    </div>

                  </Panel>
              )
            }
          </Collapse>
          {
            (!this.state.client_mandat || !this.state.client_mandat.folders || this.state.client_mandat.folders.length === 0) &&
            <h6 style={{marginTop:15,marginleft:10,color:"red"}}>Aucun dossier encore ouvert pour ce client !</h6>
          }

          <ModalTransition>
            {this.state.openDeleteModal === true && (
                <Modal
                    actions={[
                      { text: 'Supprimer', onClick: () => {
                          if(this.state.delete_folder_ged === true){
                            SmartService.deleteFile(this.state.toRemoveFolder_id,localStorage.getItem("token"),localStorage.getItem("usrtoken")).then( ok => {
                              console.log(ok)
                              if (ok.succes === true && ok.status === 200) {
                                this.props.reloadGed()
                              }else{
                                if(ok.error === "Invalid rights"){
                                  this.props.openSnackbar("error","Vous n'avez pas le droit de supprimer le dossier du client dans la ged !")
                                }else{
                                  this.props.openSnackbar("error",ok.error)
                                }
                              }
                            }).catch(err => console.log(err))
                          }
                          let obj = this.state.client_mandat;
                          obj.folders.splice(this.state.toRemoveFolderKey,1);
                          this.setState({client_mandat:obj,toRemoveFolderKey:"",toRemoveFolder_id:"",openDeleteModal:false})
                          setTimeout(() => {
                            this.props.update_client_case(this.state.client_mandat.id,obj)
                          },300);

                        } },
                      { text: 'Annuler', onClick: () => {
                          this.setState({openDeleteModal:false,toRemoveFolderKey:"",toRemoveFolder_id:""})
                        }},
                    ]}
                    onClose={() => this.setState({openDeleteModal:false,toRemoveFolderKey:"",toRemoveFolder_id:""})}
                    heading="Vous êtes sur le point de supprimer ce dossier"
                    appearance="danger"
                >

                  <Checkbox
                      isChecked={this.state.delete_folder_ged}
                      label="Voulez-vous supprimer le dossier du client dans la ged aussi ?"
                      onChange={() => {
                        this.setState({delete_folder_ged:!this.state.delete_folder_ged})
                      }}
                      name="checkbox-default-1"
                      value="checkbox-default-1"
                  />

                </Modal>
            )}
          </ModalTransition>

        </div>
    )
  }

}