import React from 'react';
import { capitalizedFirstLetter, numberWithCommas, showFormattedDate } from '../utils/utils';

function ListHistory({itemHistory, showModalHistory}) {
  return (
    <div className="border p-2 rounded-lg mb-2">
        <p>{itemHistory.dateOrder? showFormattedDate(itemHistory.dateOrder) : "-"}</p>
        <div className="flex justify-between items-center mt-2">
            <div className>
                <p className="text-sm">Total Pesanan</p>
                <p className="text-lg font-semibold">Rp {numberWithCommas(itemHistory.totalBayar)}</p>
            </div>
            <div>
                <button className="bg-emerald-500 py-1 px-2 rounded-md font-semibold text-white" onClick={()=>showModalHistory(itemHistory)}>Detail</button>
            </div>
        </div>
        <div className="flex justify-end">
            <p>Pembayaran {itemHistory.jenisPembayaran? capitalizedFirstLetter(itemHistory.jenisPembayaran) : "-"}</p>
        </div>
    </div>
  );
}

export default ListHistory;