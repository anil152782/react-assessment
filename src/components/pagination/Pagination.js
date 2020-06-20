import React from 'react'
import {pagination} from '../../constants/constant';
import styles from "./Pagination.module.css";
 const Pagination = (props) => {
    return (
        <div className={styles.pagination}>
            <button onClick={()=>props.pagination(pagination.previous.key)}>{pagination.previous.value}</button>
            <button onClick={()=>props.pagination(pagination.next.key)}>{pagination.next.value}</button>
        </div>
    )
}

export default Pagination