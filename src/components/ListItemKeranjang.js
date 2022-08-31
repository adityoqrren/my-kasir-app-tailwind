import React from 'react';
import { numberWithCommas } from '../utils/utils';

function ListItemKeranjang({keranjangItem, showModalHandler}) {
  return (
    <li key={keranjangItem.id} className="p-2 text-white cursor-pointer flex" onClick={()=>showModalHandler(keranjangItem)}>
        <div className="basis-1/6">
            <div className="bg-emerald-500 flex justify-center w-2/3 rounded-full items-center text-sm font-bold">
            <span>{keranjangItem.jumlah}</span>
            </div>
        </div>
        <div className="basis-3/6 text-slate-900">
            <p className="text-lg">{keranjangItem.product.nama}</p>
            <p>Rp. {numberWithCommas(keranjangItem.product.harga)}</p>
        </div>
        <div className="basis-2/6 text-end font-semibold text-lg text-slate-900">Rp. {numberWithCommas(keranjangItem.total_harga)}</div>
    </li>   
  );
}

export default ListItemKeranjang;