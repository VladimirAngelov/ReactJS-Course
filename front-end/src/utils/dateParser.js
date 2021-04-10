const dateParser = (date) => {
    const dateArr = date.split('-')
    let parsedDate = ''

    switch (dateArr[1]) {
        case '01':
            parsedDate = `${dateArr[2]}.Jan.${dateArr[0]}`
            break;
        case '02':
            parsedDate = `${dateArr[2]}.Feb.${dateArr[0]}`
            break;
        case '03':
            parsedDate = `${dateArr[2]}.Mar.${dateArr[0]}`
            break;
        case '04':
            parsedDate = `${dateArr[2]}.Apr.${dateArr[0]}`
            break;
        case '05':
            parsedDate = `${dateArr[2]}.May.${dateArr[0]}`
            break;
        case '06':
            parsedDate = `${dateArr[2]}.Jun.${dateArr[0]}`
            break;
        case '07':
            parsedDate = `${dateArr[2]}.Jul.${dateArr[0]}`
            break;
        case '08':
            parsedDate = `${dateArr[2]}.Aug.${dateArr[0]}`
            break;
        case '09':
            parsedDate = `${dateArr[2]}.Sep.${dateArr[0]}`
            break;
        case '10':
            parsedDate = `${dateArr[2]}.Oct.${dateArr[0]}`
            break;
        case '11':
            parsedDate = `${dateArr[2]}.Nov.${dateArr[0]}`
            break;
        case '12':
            parsedDate = `${dateArr[2]}.Dec.${dateArr[0]}`
            break;
    }

    return parsedDate
}

export default dateParser