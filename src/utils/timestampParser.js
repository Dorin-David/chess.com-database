export default function timestampParser(stamp){
    const date = new Date(stamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${date.getDate()} ${months[date.getMonth()].toUpperCase()} ${date.getFullYear()}`
}

