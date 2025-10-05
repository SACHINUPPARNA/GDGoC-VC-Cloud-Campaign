// src/components/DynamicTableRow.js
import React from "react";
import Link from 'next/link';
import { getVisibleColumns } from '@/config/tableConfig';

function DynamicTableRow({ participant, rowIndex }) {
  const visibleColumns = getVisibleColumns();

  const renderCell = (col, value) => {
    // Handle index column (row number)
    if (col.isIndex) {
      return rowIndex;
    }

    // Handle action column (View Details button)
    if (col.isAction) {
      const email = encodeURIComponent(participant["User Email"] || '');
      return (
        <Link 
          href={`/participant?email=${email}`}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition inline-block text-sm"
        >
          View Details
        </Link>
      );
    }

    // If custom render function exists, use it
    if (col.render) {
      const rendered = col.render(value, participant);
      return <div dangerouslySetInnerHTML={{ __html: rendered }} />;
    }
    
    // Default rendering
    return value || '-';
  };

  return (
    <tr className="border border-b-slate-200 odd:bg-white even:bg-gray-50">
      {visibleColumns.map((col) => {
        const value = participant[col.key];
        const mobileHidden = !col.mobileVisible ? 'mob:hidden' : '';
        
        return (
          <td
            key={col.key}
            className={`${col.className} ${mobileHidden}`.trim()}
          >
            {renderCell(col, value)}
          </td>
        );
      })}
    </tr>
  );
}

export default DynamicTableRow;