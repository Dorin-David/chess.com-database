import { useState } from 'react';
import PickDate from '../../components/DatePicker/DatePicker';
import {FaCalendarAlt} from 'react-icons/fa';
import style from './filter-games.module.css'

function FilterGames(props) {

    return (<div className={style['pickers-wrapper']}>
        <div className={style.wrapper}>
        <PickDate picker='From' />
        <FaCalendarAlt/>
        </div>
       <div className={style.wrapper}>
        <PickDate picker='To' />
        <FaCalendarAlt/>
        </div>
    </div>)

}

export default FilterGames