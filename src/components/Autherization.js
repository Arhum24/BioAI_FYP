import {
    Typography
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControl from '@material-ui/core/FormControl';
import { withRouter, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import ListItemLink from "./ListItemLink";
import LockIcon from '@material-ui/icons/Lock';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import SchoolIcon from '@material-ui/icons/School';
import List from '@material-ui/core/List';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PhoneIcon from '@material-ui/icons/Phone';
import { Link } from 'react-router-dom';
import Header from './Header';
// import Select from '@material-ui/core/Select';
import countryList from 'react-select-country-list'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import PublicIcon from '@material-ui/icons/Public';
import AppBar from '@material-ui/core/AppBar';
import chroma from 'chroma-js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { Message } from 'shineout'
import { Carousel } from 'shineout'
import BackroundImageHome from "../static/images/corousel/background3.jpg";
const ITEM_HEIGHT = 150;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};
const useStyles = makeStyles(theme => ({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
    container: {

        marginTop: "2.9%",
        // backgroundColor: "#1A1A1C",
        // background: "linear-gradient(to left,gray,black)",
        backgroundImage: "url(" + BackroundImageHome + ")",
        width: "100%",
        height: 1500,
        postion: "absolute",
        display: "flex"

    },
    sideHeading: { fontSize: "50px", color: "white", fontWeight: "bold", position: "relative", paddingTop: "18%", paddingLeft: "18%", textShadow: "2px 2px #2F3136 " },
    sideContentLogin: {
        backgroundColor: "white", marginTop: "9%", marginLeft: "6%", height: 500, width: 500, borderRadius: "25px", justifyContent: "center", ddisplay: "flex",
        flexDirection: "column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "
    }, sideContentSignup: {
        backgroundColor: "white", marginTop: "9%", marginLeft: "6%", height: 1000, width: 600, borderRadius: "25px", justifyContent: "center", ddisplay: "flex",
        flexDirection: "column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) "
    }
    , inputs: { width: 320 }

}));

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

function Autherization(props) {
    const countries = [
        { label: 'Andorra', phone: '376' },
        { label: 'United Arab Emirates', phone: '971' },
        { label: 'Afghanistan', phone: '93' },
        { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
        { code: 'AI', label: 'Anguilla', phone: '1-264' },
        { code: 'AL', label: 'Albania', phone: '355' },
        { code: 'AM', label: 'Armenia', phone: '374' },
        { code: 'AO', label: 'Angola', phone: '244' },
        { code: 'AQ', label: 'Antarctica', phone: '672' },
        { code: 'AR', label: 'Argentina', phone: '54' },
        { code: 'AS', label: 'American Samoa', phone: '1-684' },
        { code: 'AT', label: 'Austria', phone: '43' },
        { code: 'AU', label: 'Australia', phone: '61', suggested: true },
        { code: 'AW', label: 'Aruba', phone: '297' },
        { code: 'AX', label: 'Alland Islands', phone: '358' },
        { code: 'AZ', label: 'Azerbaijan', phone: '994' },
        { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
        { code: 'BB', label: 'Barbados', phone: '1-246' },
        { code: 'BD', label: 'Bangladesh', phone: '880' },
        { code: 'BE', label: 'Belgium', phone: '32' },
        { code: 'BF', label: 'Burkina Faso', phone: '226' },
        { code: 'BG', label: 'Bulgaria', phone: '359' },
        { code: 'BH', label: 'Bahrain', phone: '973' },
        { code: 'BI', label: 'Burundi', phone: '257' },
        { code: 'BJ', label: 'Benin', phone: '229' },
        { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
        { code: 'BM', label: 'Bermuda', phone: '1-441' },
        { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
        { code: 'BO', label: 'Bolivia', phone: '591' },
        { code: 'BR', label: 'Brazil', phone: '55' },
        { code: 'BS', label: 'Bahamas', phone: '1-242' },
        { code: 'BT', label: 'Bhutan', phone: '975' },
        { code: 'BV', label: 'Bouvet Island', phone: '47' },
        { code: 'BW', label: 'Botswana', phone: '267' },
        { code: 'BY', label: 'Belarus', phone: '375' },
        { code: 'BZ', label: 'Belize', phone: '501' },
        { code: 'CA', label: 'Canada', phone: '1', suggested: true },
        { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
        { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
        { code: 'CF', label: 'Central African Republic', phone: '236' },
        { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
        { code: 'CH', label: 'Switzerland', phone: '41' },
        { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
        { code: 'CK', label: 'Cook Islands', phone: '682' },
        { code: 'CL', label: 'Chile', phone: '56' },
        { code: 'CM', label: 'Cameroon', phone: '237' },
        { code: 'CN', label: 'China', phone: '86' },
        { code: 'CO', label: 'Colombia', phone: '57' },
        { code: 'CR', label: 'Costa Rica', phone: '506' },
        { code: 'CU', label: 'Cuba', phone: '53' },
        { code: 'CV', label: 'Cape Verde', phone: '238' },
        { code: 'CW', label: 'Curacao', phone: '599' },
        { code: 'CX', label: 'Christmas Island', phone: '61' },
        { code: 'CY', label: 'Cyprus', phone: '357' },
        { code: 'CZ', label: 'Czech Republic', phone: '420' },
        { code: 'DE', label: 'Germany', phone: '49', suggested: true },
        { code: 'DJ', label: 'Djibouti', phone: '253' },
        { code: 'DK', label: 'Denmark', phone: '45' },
        { code: 'DM', label: 'Dominica', phone: '1-767' },
        { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
        { code: 'DZ', label: 'Algeria', phone: '213' },
        { code: 'EC', label: 'Ecuador', phone: '593' },
        { code: 'EE', label: 'Estonia', phone: '372' },
        { code: 'EG', label: 'Egypt', phone: '20' },
        { code: 'EH', label: 'Western Sahara', phone: '212' },
        { code: 'ER', label: 'Eritrea', phone: '291' },
        { code: 'ES', label: 'Spain', phone: '34' },
        { code: 'ET', label: 'Ethiopia', phone: '251' },
        { code: 'FI', label: 'Finland', phone: '358' },
        { code: 'FJ', label: 'Fiji', phone: '679' },
        { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
        { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
        { code: 'FO', label: 'Faroe Islands', phone: '298' },
        { code: 'FR', label: 'France', phone: '33', suggested: true },
        { code: 'GA', label: 'Gabon', phone: '241' },
        { code: 'GB', label: 'United Kingdom', phone: '44' },
        { code: 'GD', label: 'Grenada', phone: '1-473' },
        { code: 'GE', label: 'Georgia', phone: '995' },
        { code: 'GF', label: 'French Guiana', phone: '594' },
        { code: 'GG', label: 'Guernsey', phone: '44' },
        { code: 'GH', label: 'Ghana', phone: '233' },
        { code: 'GI', label: 'Gibraltar', phone: '350' },
        { code: 'GL', label: 'Greenland', phone: '299' },
        { code: 'GM', label: 'Gambia', phone: '220' },
        { code: 'GN', label: 'Guinea', phone: '224' },
        { code: 'GP', label: 'Guadeloupe', phone: '590' },
        { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
        { code: 'GR', label: 'Greece', phone: '30' },
        { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
        { code: 'GT', label: 'Guatemala', phone: '502' },
        { code: 'GU', label: 'Guam', phone: '1-671' },
        { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
        { code: 'GY', label: 'Guyana', phone: '592' },
        { code: 'HK', label: 'Hong Kong', phone: '852' },
        { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
        { code: 'HN', label: 'Honduras', phone: '504' },
        { code: 'HR', label: 'Croatia', phone: '385' },
        { code: 'HT', label: 'Haiti', phone: '509' },
        { code: 'HU', label: 'Hungary', phone: '36' },
        { code: 'ID', label: 'Indonesia', phone: '62' },
        { code: 'IE', label: 'Ireland', phone: '353' },
        { code: 'IL', label: 'Israel', phone: '972' },
        { code: 'IM', label: 'Isle of Man', phone: '44' },
        { code: 'IN', label: 'India', phone: '91' },
        { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
        { code: 'IQ', label: 'Iraq', phone: '964' },
        { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
        { code: 'IS', label: 'Iceland', phone: '354' },
        { code: 'IT', label: 'Italy', phone: '39' },
        { code: 'JE', label: 'Jersey', phone: '44' },
        { code: 'JM', label: 'Jamaica', phone: '1-876' },
        { code: 'JO', label: 'Jordan', phone: '962' },
        { code: 'JP', label: 'Japan', phone: '81', suggested: true },
        { code: 'KE', label: 'Kenya', phone: '254' },
        { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
        { code: 'KH', label: 'Cambodia', phone: '855' },
        { code: 'KI', label: 'Kiribati', phone: '686' },
        { code: 'KM', label: 'Comoros', phone: '269' },
        { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
        { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
        { code: 'KR', label: 'Korea, Republic of', phone: '82' },
        { code: 'KW', label: 'Kuwait', phone: '965' },
        { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
        { code: 'KZ', label: 'Kazakhstan', phone: '7' },
        { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
        { code: 'LB', label: 'Lebanon', phone: '961' },
        { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
        { code: 'LI', label: 'Liechtenstein', phone: '423' },
        { code: 'LK', label: 'Sri Lanka', phone: '94' },
        { code: 'LR', label: 'Liberia', phone: '231' },
        { code: 'LS', label: 'Lesotho', phone: '266' },
        { code: 'LT', label: 'Lithuania', phone: '370' },
        { code: 'LU', label: 'Luxembourg', phone: '352' },
        { code: 'LV', label: 'Latvia', phone: '371' },
        { code: 'LY', label: 'Libya', phone: '218' },
        { code: 'MA', label: 'Morocco', phone: '212' },
        { code: 'MC', label: 'Monaco', phone: '377' },
        { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
        { code: 'ME', label: 'Montenegro', phone: '382' },
        { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
        { code: 'MG', label: 'Madagascar', phone: '261' },
        { code: 'MH', label: 'Marshall Islands', phone: '692' },
        { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
        { code: 'ML', label: 'Mali', phone: '223' },
        { code: 'MM', label: 'Myanmar', phone: '95' },
        { code: 'MN', label: 'Mongolia', phone: '976' },
        { code: 'MO', label: 'Macao', phone: '853' },
        { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
        { code: 'MQ', label: 'Martinique', phone: '596' },
        { code: 'MR', label: 'Mauritania', phone: '222' },
        { code: 'MS', label: 'Montserrat', phone: '1-664' },
        { code: 'MT', label: 'Malta', phone: '356' },
        { code: 'MU', label: 'Mauritius', phone: '230' },
        { code: 'MV', label: 'Maldives', phone: '960' },
        { code: 'MW', label: 'Malawi', phone: '265' },
        { code: 'MX', label: 'Mexico', phone: '52' },
        { code: 'MY', label: 'Malaysia', phone: '60' },
        { code: 'MZ', label: 'Mozambique', phone: '258' },
        { code: 'NA', label: 'Namibia', phone: '264' },
        { code: 'NC', label: 'New Caledonia', phone: '687' },
        { code: 'NE', label: 'Niger', phone: '227' },
        { code: 'NF', label: 'Norfolk Island', phone: '672' },
        { code: 'NG', label: 'Nigeria', phone: '234' },
        { code: 'NI', label: 'Nicaragua', phone: '505' },
        { code: 'NL', label: 'Netherlands', phone: '31' },
        { code: 'NO', label: 'Norway', phone: '47' },
        { code: 'NP', label: 'Nepal', phone: '977' },
        { code: 'NR', label: 'Nauru', phone: '674' },
        { code: 'NU', label: 'Niue', phone: '683' },
        { code: 'NZ', label: 'New Zealand', phone: '64' },
        { code: 'OM', label: 'Oman', phone: '968' },
        { code: 'PA', label: 'Panama', phone: '507' },
        { code: 'PE', label: 'Peru', phone: '51' },
        { code: 'PF', label: 'French Polynesia', phone: '689' },
        { code: 'PG', label: 'Papua New Guinea', phone: '675' },
        { code: 'PH', label: 'Philippines', phone: '63' },
        { code: 'PK', label: 'Pakistan', phone: '92' },
        { code: 'PL', label: 'Poland', phone: '48' },
        { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
        { code: 'PN', label: 'Pitcairn', phone: '870' },
        { code: 'PR', label: 'Puerto Rico', phone: '1' },
        { code: 'PS', label: 'Palestine, State of', phone: '970' },
        { code: 'PT', label: 'Portugal', phone: '351' },
        { code: 'PW', label: 'Palau', phone: '680' },
        { code: 'PY', label: 'Paraguay', phone: '595' },
        { code: 'QA', label: 'Qatar', phone: '974' },
        { code: 'RE', label: 'Reunion', phone: '262' },
        { code: 'RO', label: 'Romania', phone: '40' },
        { code: 'RS', label: 'Serbia', phone: '381' },
        { code: 'RU', label: 'Russian Federation', phone: '7' },
        { code: 'RW', label: 'Rwanda', phone: '250' },
        { code: 'SA', label: 'Saudi Arabia', phone: '966' },
        { code: 'SB', label: 'Solomon Islands', phone: '677' },
        { code: 'SC', label: 'Seychelles', phone: '248' },
        { code: 'SD', label: 'Sudan', phone: '249' },
        { code: 'SE', label: 'Sweden', phone: '46' },
        { code: 'SG', label: 'Singapore', phone: '65' },
        { code: 'SH', label: 'Saint Helena', phone: '290' },
        { code: 'SI', label: 'Slovenia', phone: '386' },
        { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
        { code: 'SK', label: 'Slovakia', phone: '421' },
        { code: 'SL', label: 'Sierra Leone', phone: '232' },
        { code: 'SM', label: 'San Marino', phone: '378' },
        { code: 'SN', label: 'Senegal', phone: '221' },
        { code: 'SO', label: 'Somalia', phone: '252' },
        { code: 'SR', label: 'Suriname', phone: '597' },
        { code: 'SS', label: 'South Sudan', phone: '211' },
        { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
        { code: 'SV', label: 'El Salvador', phone: '503' },
        { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
        { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
        { code: 'SZ', label: 'Swaziland', phone: '268' },
        { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
        { code: 'TD', label: 'Chad', phone: '235' },
        { code: 'TF', label: 'French Southern Territories', phone: '262' },
        { code: 'TG', label: 'Togo', phone: '228' },
        { code: 'TH', label: 'Thailand', phone: '66' },
        { code: 'TJ', label: 'Tajikistan', phone: '992' },
        { code: 'TK', label: 'Tokelau', phone: '690' },
        { code: 'TL', label: 'Timor-Leste', phone: '670' },
        { code: 'TM', label: 'Turkmenistan', phone: '993' },
        { code: 'TN', label: 'Tunisia', phone: '216' },
        { code: 'TO', label: 'Tonga', phone: '676' },
        { code: 'TR', label: 'Turkey', phone: '90' },
        { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
        { code: 'TV', label: 'Tuvalu', phone: '688' },
        { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
        { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
        { code: 'UA', label: 'Ukraine', phone: '380' },
        { code: 'UG', label: 'Uganda', phone: '256' },
        { code: 'US', label: 'United States', phone: '1', suggested: true },
        { code: 'UY', label: 'Uruguay', phone: '598' },
        { code: 'UZ', label: 'Uzbekistan', phone: '998' },
        { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
        { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
        { code: 'VE', label: 'Venezuela', phone: '58' },
        { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
        { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
        { code: 'VN', label: 'Vietnam', phone: '84' },
        { code: 'VU', label: 'Vanuatu', phone: '678' },
        { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
        { code: 'WS', label: 'Samoa', phone: '685' },
        { code: 'XK', label: 'Kosovo', phone: '383' },
        { code: 'YE', label: 'Yemen', phone: '967' },
        { code: 'YT', label: 'Mayotte', phone: '262' },
        { code: 'ZA', label: 'South Africa', phone: '27' },
        { code: 'ZM', label: 'Zambia', phone: '260' },
        { code: 'ZW', label: 'Zimbabwe', phone: '263' },
    ];
    const classes = useStyles();
    const [email_login, setEmailLogin] = React.useState("");
    const [password_login, setPasswordLogin] = React.useState("");
    const [login, setLogin] = React.useState(true);
    const [passwordType, setPasswordType] = React.useState(false);
    const options = countryList().getData();

    const names = countries.map(function (item, i) {

        return { value: item.label, label: item.label };
    })

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone_number, setPhoneNumber] = React.useState("");
    const [licence, setLicence] = React.useState("");
    const [licence_country, setLicenceCountry] = React.useState([]);
    const [password, setPassword] = React.useState("");
    const [hospital, setHospital] = React.useState("");
    const [qualification, setQualification] = React.useState("");
    const [cnic, setCNIC] = React.useState("");

    const [error_login, setErrorLogin] = React.useState("");
    const [error_register, setErrorRegister] = React.useState("");



    const [error, setError] = React.useState({
        name: "",
        email: "",
        password: "",
        licence: "",
        licence_country: "",
        cnic: "",
        phone_number: "",
        hospital: "",
        qualification: "",
    })
    useEffect(() => { }, [error, error_login, error_register])
    async function Login() {
        // new URLSearchParams({
        //     'email': email_login,
        //     'password': password_login,

        // })
        // e.preventDefault();
        const data = { email: email_login, password: password_login }

        let result = "";
        try {
            await fetch("https://bioai-node.herokuapp.com/api/auth/login", {
                method: 'POST',

                body: new URLSearchParams({
                    'email': email_login,
                    'password': password_login,

                }),
            }).then((response) => response.json()).then(async (data) => {
                result = data
                console.log("Result Login ", data)
                if (data.blocked === true) {
                    setErrorLogin("You have been blocked for providing wrong information.")
                }

                else if (data.auth == false) {

                    setErrorLogin("Wrong Email or Password");
                }
                else if (data.Message == "No User Found") {
                    setErrorLogin("Please Enter Correct Email And Password");

                }
                else {
                    try {
                        await localStorage.setItem("token", data.token)
                        async function fetchData() {

                            const token = localStorage.getItem("token");
                            await fetch("https://bioai-node.herokuapp.com/api/auth/userdata", {
                                method: 'GET',
                                headers: {
                                    'x-access-token': token, "Access-Control-Allow-Origin": "*",
                                },

                            }).then((response) => response.json()).then(async (data) => {

                                await localStorage.setItem("profile", JSON.stringify(data))
                                props.history.push("/Dashboard")

                            })
                        }

                        fetchData();




                    }
                    catch (error) {

                        setErrorLogin("Wrong Email or Password");

                    }

                }


            })

        } catch (err) {

            return result = { auth: false }
        }


        return result
    }

    async function Register(e) {



        if (email === "") {
            var error_fields = error;
            error.email = "Please Enter Email Address"
            setError(error_fields)

        }
        if (name === "") {
            var error_fields = error;
            error.name = "Please Enter Name"
            setError(error_fields)

        }
        if (password === "") {
            var error_fields = error;
            error.password = "Please Enter Password"
            setError(error_fields)

        }
        if (cnic === "") {
            var error_fields = error;
            error.cnic = "Please Enter CNIC"
            setError(error_fields)

        }
        if (licence === "") {
            var error_fields = error;
            error.licence = "Please Enter Licence"
            setError(error_fields)

        }
        if (licence_country == []) {
            var error_fields = error;
            error.licence_country = "Please Select Licence Country"
            setError(error_fields)

        }
        if (qualification === "") {
            var error_fields = error;
            error.qualification = "Please Select Qualification/Degree"
            setError(error_fields)

        }
        if (phone_number === "") {
            var error_fields = error;
            error.phone_number = "Please Enter Phone Number"
            setError(error_fields)

        }
        if (hospital === "") {
            var error_fields = error;
            error.hospital = "Please Enter Hospital Name"
            setError(error_fields)

        }

        if (email != "" && password != "" && cnic != "" && licence != "" && licence_country != "" && name != "" && qualification != "" && phone_number != "" && hospital != "") {
            let result = { auth: true };
            try {
                await fetch("https://bioai-node.herokuapp.com/api/auth/register", {
                    method: 'POST',

                    body: new URLSearchParams({
                        'email': email,
                        'password': password,
                        'cnic': cnic,
                        'licence': licence,
                        'licence_country': licence_country,
                        'name': name,
                        'qualification': qualification,
                        'phone_number': phone_number,
                        'hospital': hospital,


                    }),
                }).then((response) => response.json()).then((data) => {
                    result = data;
                    console.log("Result = ", result.errmsg)
                    if (result.error) {
                        Message.error(<div style={{ width: 500 }}>User Already Exists. Make sure that CNIC/Licence/Email is not already registered</div>, 3, {
                            position: "bottom-right",
                            title: 'Failure',
                        })
                        setErrorRegister("User Already Exist")

                    }
                    else {
                        Message.success(<div style={{ width: 240 }}>Successfully Registered</div>, 3, {
                            position: "bottom-right",
                            title: 'Success',
                        })
                    }
                    return result


                })
            } catch (err) {

                return result = { auth: false, error: err }
            }



        }
        return { auth: false, }

    }

    function handleChange(event) {

        switch (event.target.name) {
            case "email_login":
                setEmailLogin(event.target.value); return;
            case "password_login":
                setPasswordLogin(event.target.value); return;
        }



    }
    const customStyles = {
        control: styles => ({ ...styles, color: "black", backgroundColor: 'white', marginLeft: -10 }),

        input: styles => ({ width: "280px", color: "blue" }),
        placeholder: styles => ({ ...styles }),
        option: styles => ({ color: "red", marginLeft: "30px" }),
        singleValue: (styles, { data }) => ({ ...styles }),
    };
    function toggleShow() {

        setPasswordType(!passwordType)
    }
    function handleChange2(event) {

        switch (event.target.name) {
            case "email":
                setEmail(event.target.value); return;
            case "password":
                setPassword(event.target.value); return;
            case "hospital":
                setHospital(event.target.value); return;
            case "qualification":
                setQualification(event.target.value); return;
            case "licence":
                setLicence(event.target.value); return;
            case "cnic":
                setCNIC(event.target.value); return;
            case "name":
                setName(event.target.value); return;
            case "phone_number":
                setPhoneNumber(event.target.value); return;
        }



    }
    var token = localStorage.getItem("token");
    // if (token) { return <Redirect to='/Dashboard' /> }
    // else
    return (
        <div className={classes.container}>
            {/* <Header token={localStorage.getItem("token")} /> */}
            <AppBar position="fixed" style={{ height: "4em", background: "linear-gradient(to right,  #37ACEB,#38D4D7)" }}>  <Typography variant="title" style={{ marginTop: "1.1em", marginLeft: "1em" }} color="inherit">
                BioAI- Doctor Assistant
          </Typography></AppBar>

            {/* <Typography className={classes.sideHeading}>Welcome to BioAI</Typography> */}
            <Carousel
                style={{ width: 900, height: 500, marginLeft: "7%", marginTop: "9%", borderWidth: 4, borderColor: "white" }}
                interval={5000}
                animation='slide'
                indicatorType='circle'
                indicatorPosition='center'
            >

                <a>
                    <img alt="" style={{ width: '100%', height: '100%' }} src={require('../static/images/corousel/main.png')} />
                </a>
                <a>
                    <img alt="" style={{ width: '100%', height: '100%' }} src={require('../static/images/corousel/xray.png')} />
                </a>
                <a>
                    <img alt="" style={{ width: '100%', height: '100%' }} src={require('../static/images/corousel/biopsy.png')} />
                </a>
                <a>
                    <img alt="" style={{ width: '100%', height: '100%' }} src={require('../static/images/corousel/features.png')} />
                </a>
            </Carousel>


            {
                login ?
                    <div className={classes.sideContentLogin}>

                        <div style={{
                            backgroudColor: "white", color: "white", display: "flex",
                            flexDirection: "column", justifyContent: "center", marginTop: "15%", marginleft: "12%"
                        }}>

                            <form style={{
                                justifyContent: "center", display: "flex",
                                flexDirection: "column", justifyContent: "center", textAlign: "center", marginLeft: "12%", paddingBottom: "15%"

                            }} noValidate autoComplete="off">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <LockIcon style={{ color: "#5A75D6", justifyContent: "center", marginLeft: "30%", marginBottom: "10%" }} >SignIn</LockIcon>
                                    <Typography style={{ color: "#5A75D6" }}>Sign in</Typography>
                                </div>
                                <Typography style={{ color: 'red', fontSize: "13px", marginLeft: "-17%", marginTop: "-7%" }}>{error_login}</Typography>
                                <List>
                                    <ListItem >
                                        <ListItemIcon><MailIcon style={{ color: "#5A75D6" }} /> </ListItemIcon>
                                        <TextField className={classes.inputs} name="email_login" onChange={handleChange} id="standard-basic" label="Email" />
                                    </ListItem>
                                    <ListItem  >
                                        <ListItemIcon><VpnKeyIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange} name="password_login" type="password" label="Password" />
                                    </ListItem>

                                </List>

                                <Button style={{ marginTop: "5%", borderRadius: "25px", color: "white", backgroundImage: "linear-gradient(to right, #52A0FD, #00e2fa)", marginLeft: "22%", width: 200 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        let result = Login();
                                        result.then(async (data) => {

                                        })



                                    }}>
                                    Confirm Login
                                 </Button>
                                <Typography style={{ fontSize: 14, marginTop: "5%", marginLeft: "-12%", color: "gray" }}>Dont Have An Account? <Link style={{ textDecoration: "none", color: "#5A75D6" }} onClick={() => { setLogin(false) }}>Sign up</Link></Typography>
                            </form>



                        </div> </div> : <div className={classes.sideContentSignup}>

                        <div style={{
                            backgroudColor: "white", color: "white", display: "flex",
                            flexDirection: "column", justifyContent: "center", marginTop: "8%", marginleft: "20%"
                        }}>

                            <form style={{
                                justifyContent: "center", display: "flex",
                                flexDirection: "column", justifyContent: "center", textAlign: "center", marginleft: "20%", marginLeft: "15%", paddingBottom: "15%"

                            }} noValidate autoComplete="off">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <LockIcon style={{ color: "#5A75D6", justifyContent: "center", marginLeft: "30%", marginBottom: "5%" }} >SignIn</LockIcon>
                                    <Typography style={{ color: "#5A75D6", marginLeft: "1%" }}>Sign Up</Typography>
                                </div>
                                <Typography style={{ color: 'red', fontSize: "13px", marginLeft: "-22%" }}>{error_register}</Typography>
                                <List>
                                    <ListItem >
                                        <ListItemIcon><PersonIcon style={{ color: "#5A75D6" }} /> </ListItemIcon>
                                        <TextField className={classes.inputs} id="standard-basic" onChange={handleChange2} name="name" label="Name" />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.name}</p>
                                    <ListItem  >
                                        <ListItemIcon><MailIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="email" type="email" label="Email" />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.email}</p>
                                    <ListItem  >
                                        <ListItemIcon><PhoneIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="phone_number" type="number" label="Phone Number" />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.phone_number}</p>
                                    <ListItem  >
                                        <ListItemIcon><VpnKeyIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="password" type="password" label="Password" />


                                    </ListItem>

                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.password}</p>
                                    <ListItem  >
                                        <ListItemIcon><FingerprintIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="cnic" type="number" label="CNIC" />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.cnic}</p>
                                    <ListItem  >
                                        <ListItemIcon><InboxIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="licence" helperText="Please Enter Your Medical Licence Number" label="Licence No." />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.licence}</p>
                                    <ListItem  >
                                        <ListItemIcon><SchoolIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="qualification" helperText="Please Enter Your latest Medical Degree" label="Qualification" />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.licence_country}</p>
                                    <ListItem  >
                                        <ListItemIcon><LocalHospitalIcon style={{ color: "#5A75D6" }} /></ListItemIcon>
                                        <TextField className={classes.inputs} id="filled-basic" onChange={handleChange2} name="hospital" label="Hospital/Clinic" />


                                    </ListItem>
                                    <p style={{ color: "red", marginTop: -10, textAlign: "left", marginLeft: 64 }}>{error.hospital}</p>
                                    <ListItem  >
                                        <ListItemIcon><PublicIcon style={{ color: "#5A75D6" }} /></ListItemIcon>

                                        <Select

                                            styles={customStyles}
                                            options={names}


                                            onChange={(value) => { console.log(value); setLicenceCountry(value.value); console.log(licence_country) }}



                                        />
                                    </ListItem >

                                </List>

                                <Button style={{ marginTop: "5%", borderRadius: "25px", color: "white", backgroundImage: "linear-gradient(to right, #52A0FD, #00e2fa)", marginLeft: "22%", width: 200 }} onClick={(e) => {
                                    e.preventDefault();
                                    let result = Register();
                                    result.then((data) => {
                                        try {

                                            if (data.auth != false) {
                                                localStorage.setItem("token", data.token)
                                                var token = localStorage.getItem("token")
                                                console.log(token);
                                                console.log(data);
                                                setErrorRegister("Registered Successfully");
                                                props.history.push("/Autherization")
                                                window.location.reload();


                                            }
                                            // else if (data.auth == false) { setErrorRegister("User Alraedy Exists"); }
                                        } catch (errr) {

                                            setErrorLogin("Error Registering");
                                        }
                                    })



                                }}>
                                    Confirm Signup
                                    </Button>
                                <Typography style={{ fontSize: 14, marginTop: "5%", marginLeft: "-12%", color: "gray" }}>Already Have Have An Account? <Link style={{ textDecoration: "none", color: "#5A75D6" }} onClick={() => { setLogin(true) }}>Sign in</Link></Typography>
                            </form>



                        </div> </div>
            }




        </div >


    );
}
export default withRouter(Autherization);