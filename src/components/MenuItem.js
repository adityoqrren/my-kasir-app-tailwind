import React from 'react';
import { numberWithCommas } from '../utils/utils';

//nama, kode, harga, gambar, kategori

function MenuItem({menu, addToCartHandler}) {
  return (
    <div className="border-none rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={()=>addToCartHandler(menu)}>
        <img src={"assets/images/"+menu.category.name.toLowerCase()+"/"+menu.image} alt="" className="h-2/3 w-full object-cover" />
        <div className="flex items-center h-1/3">
            <div className="m-2 text-xs sm:text-sm lg:text-base">
                <p>{menu.name} ({menu.code})</p>
                <p className="font-semibold">Rp {numberWithCommas(menu.price)}</p>
            </div>
        </div>
    </div>
  )
}

export default MenuItem