
import React from 'react';
import styles from './PriceTable.module.css';

interface PriceItem {
  service: string;
  price: string;
}

interface PriceTableProps {
  title?: string;
  items: PriceItem[];
}

const PriceTable: React.FC<PriceTableProps> = ({ title, items }) => {
  return (
    <div className={styles.priceTable}>
      {title && <h3 className={styles.tableTitle}>{title}</h3>}
      
      <table className={styles.table}>
        <tbody>
          {items.map((item, index) => (
            <tr 
              key={index} 
              className={index % 2 === 0 ? styles.evenRow : styles.oddRow}
            >
              <td className={styles.serviceCell}>{item.service}</td>
              <td className={styles.priceCell}>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;