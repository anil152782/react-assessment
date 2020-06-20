import React from "react";
import styles from "./Header.module.css";
import { feedHeaderData } from  '../../constants/constant';
export default function FeedHeader() {
  return  <thead className={styles.feedHeader}>
    <tr data-testid="headerItems">
      {feedHeaderData.map((category) =><th key={category.id}>{category.key}</th>
      )}
      </tr>
    </thead>

}
