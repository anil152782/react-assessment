import React from "react";
import { pagination } from "../../constants/constant";
import styles from "./Pagination.module.css";
const Pagination = ({ paginationEvent, prebtnHidden, nextbtnHidden }) => {
  return (
    <div className={styles.pagination} data-testid="paginationItems">
      {!prebtnHidden && (
        <button onClick={() => paginationEvent(pagination.previous.key)}>
          {pagination.previous.value}
        </button>
      )}
      {!nextbtnHidden && (
        <button onClick={() => paginationEvent(pagination.next.key)}>
          {pagination.next.value}
        </button>
      )}
    </div>
  );
};

export default Pagination;
