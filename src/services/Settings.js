export const settings = {
  baseUrl: `${process.env.REACT_APP_API_BASEURL}`,
  auth: {
    login: '/v1/login',
    registerUser: '/v1/register',
  },
};

export const toTitleCase = (str) => {
  return str.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
}

export const toDataUrl = (url, callback) => {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export const fileToByteArray = (file) => {
  return new Promise((resolve, reject) => {
    try {
      let reader = new FileReader();
      let fileByteArray = [];
      reader.readAsArrayBuffer(file);
      reader.onloadend = (evt) => {
        if (evt.target.readyState == FileReader.DONE) {
          let arrayBuffer = evt.target.result,
            array = new Uint8Array(arrayBuffer);
          for (let byte of array) {
            fileByteArray.push(byte);
          }
        }
        resolve(fileByteArray);
      }
    }
    catch (e) {
      reject(e);
    }
  })
}

export const arrayBufferToBase64 = (buffer) => {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export const base64UrlToArrayBuffer = (base64Url) => {

  let base64 = base64Url.replaceAll('-', '+');
  base64 = base64.replaceAll('_', '/');
  const binaryString = window.atob(base64);
  const length = binaryString.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}

export const countries = [
  { label: 'AFGHANISTAN', value: 'AF' },
  { label: 'ÅLAND ISLANDS', value: 'AX' },
  { label: 'ALBANIA', value: 'AL' },
  { label: 'ALGERIA', value: 'DZ' },
  { label: 'AMERICAN SAMOA', value: 'AS' },
  { label: 'ANDORRA', value: 'AD' },
  { label: 'ANGOLA', value: 'AO' },
  { label: 'ANGUILLA', value: 'AI' },
  { label: 'ANTARCTICA', value: 'AQ' },
  { label: 'ANTIGUA AND BARBUDA', value: 'AG' },
  { label: 'ARGENTINA', value: 'AR' },
  { label: 'ARMENIA', value: 'AM' },
  { label: 'ARUBA', value: 'AW' },
  { label: 'AUSTRALIA', value: 'AU' },
  { label: 'AUSTRIA', value: 'AT' },
  { label: 'AZERBAIJAN', value: 'AZ' },
  { label: 'BAHAMAS', value: 'BS' },
  { label: 'BAHRAIN', value: 'BH' },
  { label: 'BANGLADESH', value: 'BD' },
  { label: 'BARBADOS', value: 'BB' },
  { label: 'BELARUS', value: 'BY' },
  { label: 'BELGIUM', value: 'BE' },
  { label: 'BELIZE', value: 'BZ' },
  { label: 'BENIN', value: 'BJ' },
  { label: 'BERMUDA', value: 'BM' },
  { label: 'BHUTAN', value: 'BT' },
  { label: 'BOLIVIA, PLURINATIONAL STATE OF', value: 'BO' },
  { label: 'BOSNIA AND HERZEGOVINA', value: 'BA' },
  { label: 'BOTSWANA', value: 'BW' },
  { label: 'BOUVET ISLAND', value: 'BV' },
  { label: 'BRAZIL', value: 'BR' },
  { label: 'BRITISH INDIAN OCEAN TERRITORY', value: 'IO' },
  { label: 'BRUNEI DARUSSALAM', value: 'BN' },
  { label: 'BULGARIA', value: 'BG' },
  { label: 'BURKINA FASO', value: 'BF' },
  { label: 'BURUNDI', value: 'BI' },
  { label: 'CAMBODIA', value: 'KH' },
  { label: 'CAMEROON', value: 'CM' },
  { label: 'CANADA', value: 'CA' },
  { label: 'CAPE VERDE', value: 'CV' },
  { label: 'CAYMAN ISLANDS', value: 'KY' },
  { label: 'CENTRAL AFRICAN REPUBLIC', value: 'CF' },
  { label: 'CHAD', value: 'TD' },
  { label: 'CHILE', value: 'CL' },
  { label: 'CHINA', value: 'CN' },
  { label: 'CHRISTMAS ISLAND', value: 'CX' },
  { label: 'COCOS (KEELING) ISLANDS', value: 'CC' },
  { label: 'COLOMBIA', value: 'CO' },
  { label: 'COMOROS', value: 'KM' },
  { label: 'CONGO', value: 'CG' },
  { label: 'CONGO, THE DEMOCRATIC REPUBLIC OF THE', value: 'CD' },
  { label: 'COOK ISLANDS', value: 'CK' },
  { label: 'COSTA RICA', value: 'CR' },
  { label: "CÔTE D'IVOIRE", value: 'CI' },
  { label: 'CROATIA', value: 'HR' },
  { label: 'CUBA', value: 'CU' },
  { label: 'CYPRUS', value: 'CY' },
  { label: 'CZECH REPUBLIC', value: 'CZ' },
  { label: 'DENMARK', value: 'DK' },
  { label: 'DJIBOUTI', value: 'DJ' },
  { label: 'DOMINICA', value: 'DM' },
  { label: 'DOMINICAN REPUBLIC', value: 'DO' },
  { label: 'ECUADOR', value: 'EC' },
  { label: 'EGYPT', value: 'EG' },
  { label: 'EL SALVADOR', value: 'SV' },
  { label: 'EQUATORIAL GUINEA', value: 'GQ' },
  { label: 'ERITREA', value: 'ER' },
  { label: 'ESTONIA', value: 'EE' },
  { label: 'ETHIOPIA', value: 'ET' },
  { label: 'FALKLAND ISLANDS (MALVINAS)', value: 'FK' },
  { label: 'FAROE ISLANDS', value: 'FO' },
  { label: 'FIJI', value: 'FJ' },
  { label: 'FINLAND', value: 'FI' },
  { label: 'FRANCE', value: 'FR' },
  { label: 'FRENCH GUIANA', value: 'GF' },
  { label: 'FRENCH POLYNESIA', value: 'PF' },
  { label: 'FRENCH SOUTHERN TERRITORIES', value: 'TF' },
  { label: 'GABON', value: 'GA' },
  { label: 'GAMBIA', value: 'GM' },
  { label: 'GEORGIA', value: 'GE' },
  { label: 'GERMANY', value: 'DE' },
  { label: 'GHANA', value: 'GH' },
  { label: 'GIBRALTAR', value: 'GI' },
  { label: 'GREECE', value: 'GR' },
  { label: 'GREENLAND', value: 'GL' },
  { label: 'GRENADA', value: 'GD' },
  { label: 'GUADELOUPE', value: 'GP' },
  { label: 'GUAM', value: 'GU' },
  { label: 'GUATEMALA', value: 'GT' },
  { label: 'GUERNSEY', value: 'GG' },
  { label: 'GUINEA', value: 'GN' },
  { label: 'GUINEA-BISSAU', value: 'GW' },
  { label: 'GUYANA', value: 'GY' },
  { label: 'HAITI', value: 'HT' },
  { label: 'HEARD ISLAND AND MCDONALD ISLANDS', value: 'HM' },
  { label: 'HOLY SEE (VATICAN CITY STATE)', value: 'VA' },
  { label: 'HONDURAS', value: 'HN' },
  { label: 'HONG KONG', value: 'HK' },
  { label: 'HUNGARY', value: 'HU' },
  { label: 'ICELAND', value: 'IS' },
  { label: 'INDIA', value: 'IN' },
  { label: 'INDONESIA', value: 'ID' },
  { label: 'IRAN, ISLAMIC REPUBLIC OF', value: 'IR' },
  { label: 'IRAQ', value: 'IQ' },
  { label: 'IRELAND', value: 'IE' },
  { label: 'ISLE OF MAN', value: 'IM' },
  { label: 'ISRAEL', value: 'IL' },
  { label: 'ITALY', value: 'IT' },
  { label: 'JAMAICA', value: 'JM' },
  { label: 'JAPAN', value: 'JP' },
  { label: 'JERSEY', value: 'JE' },
  { label: 'JORDAN', value: 'JO' },
  { label: 'KAZAKHSTAN', value: 'KZ' },
  { label: 'KENYA', value: 'KE' },
  { label: 'KIRIBATI', value: 'KI' },
  { label: "KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF", value: 'KP' },
  { label: 'KOREA, REPUBLIC OF', value: 'KR' },
  { label: 'KUWAIT', value: 'KW' },
  { label: 'KYRGYZSTAN', value: 'KG' },
  { label: "LAO PEOPLE'S DEMOCRATIC REPUBLIC", value: 'LA' },
  { label: 'LATVIA', value: 'LV' },
  { label: 'LEBANON', value: 'LB' },
  { label: 'LESOTHO', value: 'LS' },
  { label: 'LIBERIA', value: 'LR' },
  { label: 'LIBYAN ARAB JAMAHIRIYA', value: 'LY' },
  { label: 'LIECHTENSTEIN', value: 'LI' },
  { label: 'LITHUANIA', value: 'LT' },
  { label: 'LUXEMBOURG', value: 'LU' },
  { label: 'MACAO', value: 'MO' },
  { label: 'MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF', value: 'MK' },
  { label: 'MADAGASCAR', value: 'MG' },
  { label: 'MALAWI', value: 'MW' },
  { label: 'MALAYSIA', value: 'MY' },
  { label: 'MALDIVES', value: 'MV' },
  { label: 'MALI', value: 'ML' },
  { label: 'MALTA', value: 'MT' },
  { label: 'MARSHALL ISLANDS', value: 'MH' },
  { label: 'MARTINIQUE', value: 'MQ' },
  { label: 'MAURITANIA', value: 'MR' },
  { label: 'MAURITIUS', value: 'MU' },
  { label: 'MAYOTTE', value: 'YT' },
  { label: 'MEXICO', value: 'MX' },
  { label: 'MICRONESIA, FEDERATED STATES OF', value: 'FM' },
  { label: 'MOLDOVA, REPUBLIC OF', value: 'MD' },
  { label: 'MONACO', value: 'MC' },
  { label: 'MONGOLIA', value: 'MN' },
  { label: 'MONTENEGRO', value: 'ME' },
  { label: 'MONTSERRAT', value: 'MS' },
  { label: 'MOROCCO', value: 'MA' },
  { label: 'MOZAMBIQUE', value: 'MZ' },
  { label: 'MYANMAR', value: 'MM' },
  { label: 'NAMIBIA', value: 'NA' },
  { label: 'NAURU', value: 'NR' },
  { label: 'NEPAL', value: 'NP' },
  { label: 'NETHERLANDS', value: 'NL' },
  { label: 'NETHERLANDS ANTILLES', value: 'AN' },
  { label: 'NEW CALEDONIA', value: 'NC' },
  { label: 'NEW ZEALAND', value: 'NZ' },
  { label: 'NICARAGUA', value: 'NI' },
  { label: 'NIGER', value: 'NE' },
  { label: 'NIGERIA', value: 'NG' },
  { label: 'NIUE', value: 'NU' },
  { label: 'NORFOLK ISLAND', value: 'NF' },
  { label: 'NORTHERN MARIANA ISLANDS', value: 'MP' },
  { label: 'NORWAY', value: 'NO' },
  { label: 'OMAN', value: 'OM' },
  { label: 'PAKISTAN', value: 'PK' },
  { label: 'PALAU', value: 'PW' },
  { label: 'PALESTINIAN TERRITORY, OCCUPIED', value: 'PS' },
  { label: 'PANAMA', value: 'PA' },
  { label: 'PAPUA NEW GUINEA', value: 'PG' },
  { label: 'PARAGUAY', value: 'PY' },
  { label: 'PERU', value: 'PE' },
  { label: 'PHILIPPINES', value: 'PH' },
  { label: 'PITCAIRN', value: 'PN' },
  { label: 'POLAND', value: 'PL' },
  { label: 'PORTUGAL', value: 'PT' },
  { label: 'PUERTO RICO', value: 'PR' },
  { label: 'QATAR', value: 'QA' },
  { label: 'RÉUNION', value: 'RE' },
  { label: 'ROMANIA', value: 'RO' },
  { label: 'RUSSIAN FEDERATION', value: 'RU' },
  { label: 'RWANDA', value: 'RW' },
  { label: 'SAINT BARTHÉLEMY', value: 'BL' },
  { label: 'SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA', value: 'SH' },
  { label: 'SAINT KITTS AND NEVIS', value: 'KN' },
  { label: 'SAINT LUCIA', value: 'LC' },
  { label: 'SAINT MARTIN', value: 'MF' },
  { label: 'SAINT PIERRE AND MIQUELON', value: 'PM' },
  { label: 'SAINT VINCENT AND THE GRENADINES', value: 'VC' },
  { label: 'SAMOA', value: 'WS' },
  { label: 'SAN MARINO', value: 'SM' },
  { label: 'SAO TOME AND PRINCIPE', value: 'ST' },
  { label: 'SAUDI ARABIA', value: 'SA' },
  { label: 'SENEGAL', value: 'SN' },
  { label: 'SERBIA', value: 'RS' },
  { label: 'SEYCHELLES', value: 'SC' },
  { label: 'SIERRA LEONE', value: 'SL' },
  { label: 'SINGAPORE', value: 'SG' },
  { label: 'SLOVAKIA', value: 'SK' },
  { label: 'SLOVENIA', value: 'SI' },
  { label: 'SOLOMON ISLANDS', value: 'SB' },
  { label: 'SOMALIA', value: 'SO' },
  { label: 'SOUTH AFRICA', value: 'ZA' },
  { label: 'SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS', value: 'GS' },
  { label: 'SPAIN', value: 'ES' },
  { label: 'SRI LANKA', value: 'LK' },
  { label: 'SUDAN', value: 'SD' },
  { label: 'SURINAME', value: 'SR' },
  { label: 'SVALBARD AND JAN MAYEN', value: 'SJ' },
  { label: 'SWAZILAND', value: 'SZ' },
  { label: 'SWEDEN', value: 'SE' },
  { label: 'SWITZERLAND', value: 'CH' },
  { label: 'SYRIAN ARAB REPUBLIC', value: 'SY' },
  { label: 'TAIWAN, PROVINCE OF CHINA', value: 'TW' },
  { label: 'TAJIKISTAN', value: 'TJ' },
  { label: 'TANZANIA, UNITED REPUBLIC OF', value: 'TZ' },
  { label: 'THAILAND', value: 'TH' },
  { label: 'TIMOR-LESTE', value: 'TL' },
  { label: 'TOGO', value: 'TG' },
  { label: 'TOKELAU', value: 'TK' },
  { label: 'TONGA', value: 'TO' },
  { label: 'TRINIDAD AND TOBAGO', value: 'TT' },
  { label: 'TUNISIA', value: 'TN' },
  { label: 'TURKEY', value: 'TR' },
  { label: 'TURKMENISTAN', value: 'TM' },
  { label: 'TURKS AND CAICOS ISLANDS', value: 'TC' },
  { label: 'TUVALU', value: 'TV' },
  { label: 'UGANDA', value: 'UG' },
  { label: 'UKRAINE', value: 'UA' },
  { label: 'UNITED ARAB EMIRATES', value: 'AE' },
  { label: 'UNITED KINGDOM', value: 'GB' },
  { label: 'UNITED STATES', value: 'US' },
  { label: 'UNITED STATES MINOR OUTLYING ISLANDS', value: 'UM' },
  { label: 'URUGUAY', value: 'UY' },
  { label: 'UZBEKISTAN', value: 'UZ' },
  { label: 'VANUATU', value: 'VU' },
  { label: 'VENEZUELA, BOLIVARIAN REPUBLIC OF', value: 'VE' },
  { label: 'VIET NAM', value: 'VN' },
  { label: 'VIRGIN ISLANDS, BRITISH', value: 'VG' },
  { label: 'VIRGIN ISLANDS, U.S.', value: 'VI' },
  { label: 'WALLIS AND FUTUNA', value: 'WF' },
  { label: 'WESTERN SAHARA', value: 'EH' },
  { label: 'YEMEN', value: 'YE' },
  { label: 'ZAMBIA', value: 'ZM' },
  { label: 'ZIMBABWE', value: 'ZW' }
];
