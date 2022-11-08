import React from 'react';
import MenuItem from './MenuItem';

function Menus({menusData, addToCartHandler}) {
    return (
        <div className="basis-full md:basis-7/12 p-2">
            <h1 className="text-slate-900 text-3xl font-semibold my-2">Daftar Produk</h1>
            <hr />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 my-2 md:px-2 pb-2 max-h-screen overflow-auto">
                {
                    (
                        menusData && menusData.map((menu)=>(
                            <MenuItem key={menu.id} menu={menu} addToCartHandler={addToCartHandler}/>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default Menus;