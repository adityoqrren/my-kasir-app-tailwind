import React from 'react';
import { numberWithCommas } from '../utils/utils';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping} from '@fortawesome/free-solid-svg-icons';

function TotalKeranjang({keranjang}) {
    const hitungTotal = keranjang.reduce((result, item) => (result+item.total_harga),0);

    return (
        <div className="fixed bottom-0 left-0 right-0 md:flex justify-end">
            <div className="md:w-3/12 p-2 bg-white">
                <div className="flex justify-between text-slate-900">
                    <span className="text-lg">Total Harga: </span>
                    <span className="text-xl font-bold">Rp.{numberWithCommas(hitungTotal)}</span>
                </div>
                <Link to={'/pembayaran'} className="block rounded-lg bg-cyan-700 border-2 border-cyan-500 w-full p-2 my-1 text-white text-center font-bold"> <FontAwesomeIcon icon={faCartShopping}/> BAYAR</Link>
            </div>
        </div>
        );
}

export default TotalKeranjang;