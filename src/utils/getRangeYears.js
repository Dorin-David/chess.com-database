import { getYear } from './getYear';

function getRangeYears(start, end) {
    const years = [];
    for (let i = start; i <= getYear(end); i++) {
        years.push(i)
    }
    return years

}

export { getRangeYears }