const movieBudgetParser = (budget) => {
    let budgetString = budget.toString().split('')

    if (budgetString.length === 8) {
        budgetString.splice(2, 0, ',')
        budgetString.splice(6, 0, ',')
    } else if (budgetString.length === 7) {
        budgetString.splice(1, 0, ',')
        budgetString.splice(5, 0, ',')
    } else if (budgetString.length === 6) {
        budgetString.splice(3, 0, ',')
    } else if (budgetString.length === 9) {
        budgetString.splice(3, 0, ',')
        budgetString.splice(7, 0, ',')
    }

    return budgetString.join('')
}

export default movieBudgetParser