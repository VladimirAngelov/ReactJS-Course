const actorYearsParser = (birthday) => {
    if (!birthday) {
        return null
    }

    const [currMonth, currDay, currYear] = new Date().toLocaleDateString().split('/').map(x => Number(x))
    const [birthYear, birthMonth, birthDay] = birthday.split('-').map(x => Number(x))
    let actorYears = currYear - birthYear

    if (currMonth <= birthMonth) {
        if (currDay < birthDay) {
            actorYears--;
        }
    }

    return actorYears
}

export default actorYearsParser