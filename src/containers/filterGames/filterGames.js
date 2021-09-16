import { useState } from 'react';
import PickDate from '../../components/DatePicker/DatePicker';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../../components/UI/Button/Button';
import style from './filter-games.module.css'

function FilterGames(props) {
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [result, setResult] = useState('');
    const [color, setColor] = useState('');
    const [order, setOrder] = useState('');

    function forwardFilteringRules(){
        const rules = {
            startDate,
            endDate,
            result,
            color,
            order
        }
        props.forwardRules(rules)
    }

    return (<div className={style['filtering-wrapper']}>
        <h2>Filter</h2>
        <div className={style['pickers-wrapper']}>
            <div className={style.wrapper}>
                <PickDate date={startDate} picker='From' changeDate={(date) => setStartDate(date)} />
                <FaCalendarAlt />
            </div>
            <div className={style.wrapper}>
                <PickDate date={endDate} picker='To'  changeDate={(date) => setEndDate(date)}/>
                <FaCalendarAlt />
            </div>
        </div>
        <select name="result" className={style.select} onChange={(value) => setResult(value.currentTarget.value)}>
            <option value="">Result</option>
            <option value="win">Won</option>
            <option value="lose">Lost</option>
            <option value="draw">Draw</option>
        </select>
        <select name="color" className={style.select} onChange={(value) => setColor(value.currentTarget.value)}>
            <option value="">Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
        </select>
        <select name="order" className={style.select} onChange={(value) => setOrder(value.currentTarget.value)}>
            <option value="newest" defaultValue >Newest</option>
            <option value="oldest">Oldest</option>
        </select>

        <Button onButtonClick={forwardFilteringRules}>Filter</Button>
    </div>)

}

export default FilterGames