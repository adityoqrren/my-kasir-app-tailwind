import React from 'react';
import { numberWithCommas } from '../utils/utils';

function ItemListCart({cartItem, showModalHandler}) {
  // {showModalHandler? console.log('yes') : console.log('no')}
  return (
    <li key={cartItem.id} className={"p-2 text-white flex " + (showModalHandler?"cursor-pointer":"")}  onClick={()=>showModalHandler(cartItem) }>
        <div className="basis-1/6">
            <div className="bg-emerald-500 flex justify-center w-2/3 rounded-full items-center text-sm font-bold">
            <span>{cartItem.count}</span>
            </div>
        </div>
        <div className="basis-3/6 text-slate-900">
            <p className="text-lg">{cartItem.product.name}</p>
            <p>Rp. {numberWithCommas(cartItem.product.price)}</p>
        </div>
        <div className="basis-2/6 text-end font-semibold text-lg text-slate-900">Rp. {numberWithCommas(cartItem.total_price)}</div>
    </li>   
  );
}

export default ItemListCart;