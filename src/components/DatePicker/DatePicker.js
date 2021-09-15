import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getRangeYears } from '../../utils/getRangeYears';
import { getYear } from '../../utils/getYear';
import { getMonth } from '../../utils/getMonth';
import style from './date-picker.module.css';

const years = getRangeYears(2005, new Date())
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

function PickDate(props) {
    const [startDate, setStartDate] = useState(null);
    const customButton = <button className={style.button}>
        {!startDate ? props.picker : `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`}
        </button>
    return (
        <DatePicker
            customInput={customButton}
            popperPlacement="top"
            popperModifiers={[
                {
                    name: "offset",
                    options: {
                        offset: [5, 10],
                    },
                },
                {
                    name: "preventOverflow",
                    options: {
                        rootBoundary: "viewport",
                        tether: false,
                        altAxis: true,
                    },
                },
            ]}
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div
                    style={{
                        margin: 10,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                        {"<"}
                    </button>
                    <select
                        value={getYear(date)}
                        onChange={({ target: { value } }) => changeYear(value)}
                    >
                        {years.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <select
                        value={months[getMonth(date)]}
                        onChange={({ target: { value } }) =>
                            changeMonth(months.indexOf(value))
                        }
                    >
                        {months.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                        {">"}
                    </button>
                </div>
            )}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
        />
    )
}

export default PickDate