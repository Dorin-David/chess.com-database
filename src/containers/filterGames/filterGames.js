import { useState } from 'react';
import PickDate from '../../components/DatePicker/DatePicker';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from '../../components/UI/Button/Button';
import style from './filter-games.module.css'

function FilterGames(props) {

    return (<div className={style['filtering-wrapper']}>
        <h2>Filter</h2>
        <div className={style['pickers-wrapper']}>
            <div className={style.wrapper}>
                <PickDate picker='From' />
                <FaCalendarAlt />
            </div>
            <div className={style.wrapper}>
                <PickDate picker='To' />
                <FaCalendarAlt />
            </div>
        </div>
        <select name="result" className={style.select}>
            <option value="">Result</option>
            <option value="won">Won</option>
            <option value="lost">Lost</option>
            <option value="draw">Draw</option>
        </select>
        <select name="color" className={style.select}>
            <option value="">Color</option>
            <option value="white">White</option>
            <option value="black">Black</option>
        </select>
        <select name="order" className={style.select}>
            <option value="newest" selected>Newest</option>
            <option value="oldest">Oldest</option>
        </select>

        <Button>Filter</Button>
    </div>)

}

export default FilterGames