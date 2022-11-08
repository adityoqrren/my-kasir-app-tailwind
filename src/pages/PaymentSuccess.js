import React from 'react';
import {useEffect} from 'react';
import { API_URL } from '../utils/constants';
import {Link} from 'react-router-dom';

function PaymentSuccess() {

  useEffect(()=>{
    deleteCart();
  });

  const deleteCart = async() => {
    const result = await fetch(API_URL+"cart");
    if(result.ok){
      const data = await result.json();
      data.forEach(item => {
          fetch(API_URL+"cart/" + item.id, {method: 'DELETE'})
            .then((response)=>{
              if(!response.ok){
                console.log("failed delete itemkeranjang id: "+item.id);
              }
            })
            .catch((error)=>{
              console.log("error deleting data: ", error);
            })
      });
    }else{
      console.log("Error getting data");
    }
  }

  return (
    <div className="text-center my-2 w-full">
        <div className="flex justify-center">
            <img src="./assets/images/sukses.png" alt="pesanan sukses" className="w-[500px]" />
        </div>
        <h1 className="text-slate-900 text-3xl font-semibold">Pemesanan Berhasil</h1>
        <p className="text-slate-900 text-lg">Terimakasih telah memesan. Silahkan tunggu pesanan diantarkan.</p>
        <Link to={'/'} className="inline-block rounded-lg bg-cyan-700 border-2 border-cyan-500 p-2 my-3 text-white text-center font-bold">Kembali ke Home</Link>
    </div>
  );
}

export default PaymentSuccess;