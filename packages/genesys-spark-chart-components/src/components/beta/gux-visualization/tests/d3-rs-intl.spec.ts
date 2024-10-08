import { time } from '@redsift/d3-rs-intl';

describe('@redsift/d3-rs-intl', () => {
  describe('time snapshot tests', () => {
    [
      {
        locale: 'ar',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'cs',
        expectedOutput: {
          dateTime: '%A,%e.%B %Y, %X',
          date: '%-d.%-m.%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'neděle',
            'pondělí',
            'úterý',
            'středa',
            'čvrtek',
            'pátek',
            'sobota'
          ],
          shortDays: ['ne.', 'po.', 'út.', 'st.', 'čt.', 'pá.', 'so.'],
          months: [
            'leden',
            'únor',
            'březen',
            'duben',
            'květen',
            'červen',
            'červenec',
            'srpen',
            'září',
            'říjen',
            'listopad',
            'prosinec'
          ],
          shortMonths: [
            'led',
            'úno',
            'břez',
            'dub',
            'kvě',
            'čer',
            'červ',
            'srp',
            'zář',
            'říj',
            'list',
            'pros'
          ],
          default: {
            dateTime: '%A,%e.%B %Y, %X',
            date: '%-d.%-m.%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'neděle',
              'pondělí',
              'úterý',
              'středa',
              'čvrtek',
              'pátek',
              'sobota'
            ],
            shortDays: ['ne.', 'po.', 'út.', 'st.', 'čt.', 'pá.', 'so.'],
            months: [
              'leden',
              'únor',
              'březen',
              'duben',
              'květen',
              'červen',
              'červenec',
              'srpen',
              'září',
              'říjen',
              'listopad',
              'prosinec'
            ],
            shortMonths: [
              'led',
              'úno',
              'břez',
              'dub',
              'kvě',
              'čer',
              'červ',
              'srp',
              'zář',
              'říj',
              'list',
              'pros'
            ]
          }
        }
      },
      {
        locale: 'da',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'de',
        expectedOutput: {
          dateTime: '%A, der %e. %B %Y, %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'Sonntag',
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag'
          ],
          shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          months: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mrz',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Dez'
          ],
          default: {
            dateTime: '%A, der %e. %B %Y, %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'Sonntag',
              'Montag',
              'Dienstag',
              'Mittwoch',
              'Donnerstag',
              'Freitag',
              'Samstag'
            ],
            shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            months: [
              'Januar',
              'Februar',
              'März',
              'April',
              'Mai',
              'Juni',
              'Juli',
              'August',
              'September',
              'Oktober',
              'November',
              'Dezember'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mrz',
              'Apr',
              'Mai',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Okt',
              'Nov',
              'Dez'
            ]
          }
        }
      },
      {
        locale: 'en',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'es',
        expectedOutput: {
          dateTime: '%A, %e de %B de %Y, %X',
          date: '%d/%m/%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado'
          ],
          shortDays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
          months: [
            'enero',
            'febrero',
            'marzo',
            'abril',
            'mayo',
            'junio',
            'julio',
            'agosto',
            'septiembre',
            'octubre',
            'noviembre',
            'diciembre'
          ],
          shortMonths: [
            'ene',
            'feb',
            'mar',
            'abr',
            'may',
            'jun',
            'jul',
            'ago',
            'sep',
            'oct',
            'nov',
            'dic'
          ],
          default: {
            dateTime: '%A, %e de %B de %Y, %X',
            date: '%d/%m/%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'domingo',
              'lunes',
              'martes',
              'miércoles',
              'jueves',
              'viernes',
              'sábado'
            ],
            shortDays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            months: [
              'enero',
              'febrero',
              'marzo',
              'abril',
              'mayo',
              'junio',
              'julio',
              'agosto',
              'septiembre',
              'octubre',
              'noviembre',
              'diciembre'
            ],
            shortMonths: [
              'ene',
              'feb',
              'mar',
              'abr',
              'may',
              'jun',
              'jul',
              'ago',
              'sep',
              'oct',
              'nov',
              'dic'
            ]
          }
        }
      },
      {
        locale: 'es-es',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'fi',
        expectedOutput: {
          dateTime: '%A, %-d. %Bta %Y klo %X',
          date: '%-d.%-m.%Y',
          time: '%H:%M:%S',
          periods: ['a.m.', 'p.m.'],
          days: [
            'sunnuntai',
            'maanantai',
            'tiistai',
            'keskiviikko',
            'torstai',
            'perjantai',
            'lauantai'
          ],
          shortDays: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
          months: [
            'tammikuu',
            'helmikuu',
            'maaliskuu',
            'huhtikuu',
            'toukokuu',
            'kesäkuu',
            'heinäkuu',
            'elokuu',
            'syyskuu',
            'lokakuu',
            'marraskuu',
            'joulukuu'
          ],
          shortMonths: [
            'Tammi',
            'Helmi',
            'Maalis',
            'Huhti',
            'Touko',
            'Kesä',
            'Heinä',
            'Elo',
            'Syys',
            'Loka',
            'Marras',
            'Joulu'
          ],
          default: {
            dateTime: '%A, %-d. %Bta %Y klo %X',
            date: '%-d.%-m.%Y',
            time: '%H:%M:%S',
            periods: ['a.m.', 'p.m.'],
            days: [
              'sunnuntai',
              'maanantai',
              'tiistai',
              'keskiviikko',
              'torstai',
              'perjantai',
              'lauantai'
            ],
            shortDays: ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'],
            months: [
              'tammikuu',
              'helmikuu',
              'maaliskuu',
              'huhtikuu',
              'toukokuu',
              'kesäkuu',
              'heinäkuu',
              'elokuu',
              'syyskuu',
              'lokakuu',
              'marraskuu',
              'joulukuu'
            ],
            shortMonths: [
              'Tammi',
              'Helmi',
              'Maalis',
              'Huhti',
              'Touko',
              'Kesä',
              'Heinä',
              'Elo',
              'Syys',
              'Loka',
              'Marras',
              'Joulu'
            ]
          }
        }
      },
      {
        locale: 'fr',
        expectedOutput: {
          dateTime: '%A %e %B %Y à %X',
          date: '%d/%m/%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'dimanche',
            'lundi',
            'mardi',
            'mercredi',
            'jeudi',
            'vendredi',
            'samedi'
          ],
          shortDays: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
          months: [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
          ],
          shortMonths: [
            'janv.',
            'févr.',
            'mars',
            'avr.',
            'mai',
            'juin',
            'juil.',
            'août',
            'sept.',
            'oct.',
            'nov.',
            'déc.'
          ],
          default: {
            dateTime: '%A %e %B %Y à %X',
            date: '%d/%m/%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'dimanche',
              'lundi',
              'mardi',
              'mercredi',
              'jeudi',
              'vendredi',
              'samedi'
            ],
            shortDays: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
            months: [
              'janvier',
              'février',
              'mars',
              'avril',
              'mai',
              'juin',
              'juillet',
              'août',
              'septembre',
              'octobre',
              'novembre',
              'décembre'
            ],
            shortMonths: [
              'janv.',
              'févr.',
              'mars',
              'avr.',
              'mai',
              'juin',
              'juil.',
              'août',
              'sept.',
              'oct.',
              'nov.',
              'déc.'
            ]
          }
        }
      },
      {
        locale: 'fr-ca',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'he',
        expectedOutput: {
          dateTime: '%A, %e ב%B %Y %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
          shortDays: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
          months: [
            'ינואר',
            'פברואר',
            'מרץ',
            'אפריל',
            'מאי',
            'יוני',
            'יולי',
            'אוגוסט',
            'ספטמבר',
            'אוקטובר',
            'נובמבר',
            'דצמבר'
          ],
          shortMonths: [
            'ינו׳',
            'פבר׳',
            'מרץ',
            'אפר׳',
            'מאי',
            'יוני',
            'יולי',
            'אוג׳',
            'ספט׳',
            'אוק׳',
            'נוב׳',
            'דצמ׳'
          ],
          default: {
            dateTime: '%A, %e ב%B %Y %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
            shortDays: ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'],
            months: [
              'ינואר',
              'פברואר',
              'מרץ',
              'אפריל',
              'מאי',
              'יוני',
              'יולי',
              'אוגוסט',
              'ספטמבר',
              'אוקטובר',
              'נובמבר',
              'דצמבר'
            ],
            shortMonths: [
              'ינו׳',
              'פבר׳',
              'מרץ',
              'אפר׳',
              'מאי',
              'יוני',
              'יולי',
              'אוג׳',
              'ספט׳',
              'אוק׳',
              'נוב׳',
              'דצמ׳'
            ]
          }
        }
      },
      {
        locale: 'it',
        expectedOutput: {
          dateTime: '%A %e %B %Y, %X',
          date: '%d/%m/%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'Domenica',
            'Lunedì',
            'Martedì',
            'Mercoledì',
            'Giovedì',
            'Venerdì',
            'Sabato'
          ],
          shortDays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
          months: [
            'Gennaio',
            'Febbraio',
            'Marzo',
            'Aprile',
            'Maggio',
            'Giugno',
            'Luglio',
            'Agosto',
            'Settembre',
            'Ottobre',
            'Novembre',
            'Dicembre'
          ],
          shortMonths: [
            'Gen',
            'Feb',
            'Mar',
            'Apr',
            'Mag',
            'Giu',
            'Lug',
            'Ago',
            'Set',
            'Ott',
            'Nov',
            'Dic'
          ],
          default: {
            dateTime: '%A %e %B %Y, %X',
            date: '%d/%m/%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'Domenica',
              'Lunedì',
              'Martedì',
              'Mercoledì',
              'Giovedì',
              'Venerdì',
              'Sabato'
            ],
            shortDays: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
            months: [
              'Gennaio',
              'Febbraio',
              'Marzo',
              'Aprile',
              'Maggio',
              'Giugno',
              'Luglio',
              'Agosto',
              'Settembre',
              'Ottobre',
              'Novembre',
              'Dicembre'
            ],
            shortMonths: [
              'Gen',
              'Feb',
              'Mar',
              'Apr',
              'Mag',
              'Giu',
              'Lug',
              'Ago',
              'Set',
              'Ott',
              'Nov',
              'Dic'
            ]
          }
        }
      },
      {
        locale: 'ja',
        expectedOutput: {
          dateTime: '%x %a %X',
          date: '%Y/%m/%d',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            '日曜日',
            '月曜日',
            '火曜日',
            '水曜日',
            '木曜日',
            '金曜日',
            '土曜日'
          ],
          shortDays: ['日', '月', '火', '水', '木', '金', '土'],
          months: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          shortMonths: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ],
          default: {
            dateTime: '%x %a %X',
            date: '%Y/%m/%d',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              '日曜日',
              '月曜日',
              '火曜日',
              '水曜日',
              '木曜日',
              '金曜日',
              '土曜日'
            ],
            shortDays: ['日', '月', '火', '水', '木', '金', '土'],
            months: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            shortMonths: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        }
      },
      {
        locale: 'ko',
        expectedOutput: {
          dateTime: '%Y/%m/%d %a %X',
          date: '%Y/%m/%d',
          time: '%H:%M:%S',
          periods: ['오전', '오후'],
          days: [
            '일요일',
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일'
          ],
          shortDays: ['일', '월', '화', '수', '목', '금', '토'],
          months: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
          ],
          shortMonths: [
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
          ],
          default: {
            dateTime: '%Y/%m/%d %a %X',
            date: '%Y/%m/%d',
            time: '%H:%M:%S',
            periods: ['오전', '오후'],
            days: [
              '일요일',
              '월요일',
              '화요일',
              '수요일',
              '목요일',
              '금요일',
              '토요일'
            ],
            shortDays: ['일', '월', '화', '수', '목', '금', '토'],
            months: [
              '1월',
              '2월',
              '3월',
              '4월',
              '5월',
              '6월',
              '7월',
              '8월',
              '9월',
              '10월',
              '11월',
              '12월'
            ],
            shortMonths: [
              '1월',
              '2월',
              '3월',
              '4월',
              '5월',
              '6월',
              '7월',
              '8월',
              '9월',
              '10월',
              '11월',
              '12월'
            ]
          }
        }
      },
      {
        locale: 'nl',
        expectedOutput: {
          dateTime: '%a %e %B %Y %X',
          date: '%d-%m-%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'zondag',
            'maandag',
            'dinsdag',
            'woensdag',
            'donderdag',
            'vrijdag',
            'zaterdag'
          ],
          shortDays: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
          months: [
            'januari',
            'februari',
            'maart',
            'april',
            'mei',
            'juni',
            'juli',
            'augustus',
            'september',
            'oktober',
            'november',
            'december'
          ],
          shortMonths: [
            'jan',
            'feb',
            'mrt',
            'apr',
            'mei',
            'jun',
            'jul',
            'aug',
            'sep',
            'okt',
            'nov',
            'dec'
          ],
          default: {
            dateTime: '%a %e %B %Y %X',
            date: '%d-%m-%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'zondag',
              'maandag',
              'dinsdag',
              'woensdag',
              'donderdag',
              'vrijdag',
              'zaterdag'
            ],
            shortDays: ['zo', 'ma', 'di', 'wo', 'do', 'vr', 'za'],
            months: [
              'januari',
              'februari',
              'maart',
              'april',
              'mei',
              'juni',
              'juli',
              'augustus',
              'september',
              'oktober',
              'november',
              'december'
            ],
            shortMonths: [
              'jan',
              'feb',
              'mrt',
              'apr',
              'mei',
              'jun',
              'jul',
              'aug',
              'sep',
              'okt',
              'nov',
              'dec'
            ]
          }
        }
      },
      {
        locale: 'no',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'pl',
        expectedOutput: {
          dateTime: '%A, %e %B %Y, %X',
          date: '%d/%m/%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'Niedziela',
            'Poniedziałek',
            'Wtorek',
            'Środa',
            'Czwartek',
            'Piątek',
            'Sobota'
          ],
          shortDays: ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
          months: [
            'Styczeń',
            'Luty',
            'Marzec',
            'Kwiecień',
            'Maj',
            'Czerwiec',
            'Lipiec',
            'Sierpień',
            'Wrzesień',
            'Październik',
            'Listopad',
            'Grudzień'
          ],
          shortMonths: [
            'Stycz.',
            'Luty',
            'Marz.',
            'Kwie.',
            'Maj',
            'Czerw.',
            'Lipc.',
            'Sierp.',
            'Wrz.',
            'Paźdz.',
            'Listop.',
            'Grudz.'
          ],
          default: {
            dateTime: '%A, %e %B %Y, %X',
            date: '%d/%m/%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'Niedziela',
              'Poniedziałek',
              'Wtorek',
              'Środa',
              'Czwartek',
              'Piątek',
              'Sobota'
            ],
            shortDays: ['Niedz.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
            months: [
              'Styczeń',
              'Luty',
              'Marzec',
              'Kwiecień',
              'Maj',
              'Czerwiec',
              'Lipiec',
              'Sierpień',
              'Wrzesień',
              'Październik',
              'Listopad',
              'Grudzień'
            ],
            shortMonths: [
              'Stycz.',
              'Luty',
              'Marz.',
              'Kwie.',
              'Maj',
              'Czerw.',
              'Lipc.',
              'Sierp.',
              'Wrz.',
              'Paźdz.',
              'Listop.',
              'Grudz.'
            ]
          }
        }
      },
      {
        locale: 'pt-br',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'pt-pt',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'ru',
        expectedOutput: {
          dateTime: '%A, %e %B %Y г. %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'воскресенье',
            'понедельник',
            'вторник',
            'среда',
            'четверг',
            'пятница',
            'суббота'
          ],
          shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
          months: [
            'января',
            'февраля',
            'марта',
            'апреля',
            'мая',
            'июня',
            'июля',
            'августа',
            'сентября',
            'октября',
            'ноября',
            'декабря'
          ],
          shortMonths: [
            'янв',
            'фев',
            'мар',
            'апр',
            'май',
            'июн',
            'июл',
            'авг',
            'сен',
            'окт',
            'ноя',
            'дек'
          ],
          default: {
            dateTime: '%A, %e %B %Y г. %X',
            date: '%d.%m.%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'воскресенье',
              'понедельник',
              'вторник',
              'среда',
              'четверг',
              'пятница',
              'суббота'
            ],
            shortDays: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
            months: [
              'января',
              'февраля',
              'марта',
              'апреля',
              'мая',
              'июня',
              'июля',
              'августа',
              'сентября',
              'октября',
              'ноября',
              'декабря'
            ],
            shortMonths: [
              'янв',
              'фев',
              'мар',
              'апр',
              'май',
              'июн',
              'июл',
              'авг',
              'сен',
              'окт',
              'ноя',
              'дек'
            ]
          }
        }
      },
      {
        locale: 'sv',
        expectedOutput: {
          dateTime: '%A den %d %B %Y %X',
          date: '%Y-%m-%d',
          time: '%H:%M:%S',
          periods: ['fm', 'em'],
          days: [
            'Söndag',
            'Måndag',
            'Tisdag',
            'Onsdag',
            'Torsdag',
            'Fredag',
            'Lördag'
          ],
          shortDays: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
          months: [
            'Januari',
            'Februari',
            'Mars',
            'April',
            'Maj',
            'Juni',
            'Juli',
            'Augusti',
            'September',
            'Oktober',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'Maj',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%A den %d %B %Y %X',
            date: '%Y-%m-%d',
            time: '%H:%M:%S',
            periods: ['fm', 'em'],
            days: [
              'Söndag',
              'Måndag',
              'Tisdag',
              'Onsdag',
              'Torsdag',
              'Fredag',
              'Lördag'
            ],
            shortDays: ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'],
            months: [
              'Januari',
              'Februari',
              'Mars',
              'April',
              'Maj',
              'Juni',
              'Juli',
              'Augusti',
              'September',
              'Oktober',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'Maj',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Okt',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'th',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'tr',
        expectedOutput: {
          dateTime: '%a %e %b %X %Y',
          date: '%d/%m/%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: [
            'Pazar',
            'Pazartesi',
            'Salı',
            'Çarşamba',
            'Perşembe',
            'Cuma',
            'Cumartesi'
          ],
          shortDays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
          months: [
            'Ocak',
            'Şubat',
            'Mart',
            'Nisan',
            'Mayıs',
            'Haziran',
            'Temmuz',
            'Ağustos',
            'Eylül',
            'Ekim',
            'Kasım',
            'Aralık'
          ],
          shortMonths: [
            'Oca',
            'Şub',
            'Mar',
            'Nis',
            'May',
            'Haz',
            'Tem',
            'Ağu',
            'Eyl',
            'Eki',
            'Kas',
            'Ara'
          ],
          default: {
            dateTime: '%a %e %b %X %Y',
            date: '%d/%m/%Y',
            time: '%H:%M:%S',
            periods: ['AM', 'PM'],
            days: [
              'Pazar',
              'Pazartesi',
              'Salı',
              'Çarşamba',
              'Perşembe',
              'Cuma',
              'Cumartesi'
            ],
            shortDays: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
            months: [
              'Ocak',
              'Şubat',
              'Mart',
              'Nisan',
              'Mayıs',
              'Haziran',
              'Temmuz',
              'Ağustos',
              'Eylül',
              'Ekim',
              'Kasım',
              'Aralık'
            ],
            shortMonths: [
              'Oca',
              'Şub',
              'Mar',
              'Nis',
              'May',
              'Haz',
              'Tem',
              'Ağu',
              'Eyl',
              'Eki',
              'Kas',
              'Ara'
            ]
          }
        }
      },
      {
        locale: 'uk',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'zh-cn',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      },
      {
        locale: 'zh-tw',
        expectedOutput: {
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: ['AM', 'PM'],
          days: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ],
          shortMonths: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          default: {
            dateTime: '%x, %X',
            date: '%-m/%-d/%Y',
            time: '%-I:%M:%S %p',
            periods: ['AM', 'PM'],
            days: [
              'Sunday',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday'
            ],
            shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            months: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            shortMonths: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          }
        }
      }
    ].forEach(({ locale, expectedOutput }) => {
      it(`should work as expected for ${locale}`, () => {
        const { d3: timeFormatLocale } = time([locale]);

        expect(timeFormatLocale).toEqual(expectedOutput);
      });
    });
  });
});
