import React from 'react';
import {useState, useEffect} from 'react';
import ListItemKeranjang from '../components/ListItemKeranjang';
import { API_URL } from '../utils/constants';
import { numberWithCommas } from '../utils/utils';
import swal from 'sweetalert';
import {useNavigate} from 'react-router-dom';

function Pembayaran() {

  const [listKeranjang, setListKeranjang] = useState([]);
  const [totalBayar, setTotalBayar] = useState(0);
  const [jenisPembayaran, setJenisPembayaran] = useState("");
  const navigate = useNavigate();

   //pakai [] berarti 1 kali saja, sama dengan componentDidMount
  useEffect(()=>{
   getListKeranjang();
  },[])

  const getListKeranjang = async() => {
    const data = await fetch(API_URL+"keranjangs");
    //console.log(data);
    const results = await data.json();
    setListKeranjang(results);
    //console.log(results);
    setTotalBayar(results.reduce((result, item) => (result+item.total_harga),0));
  }
  
  // const onChangePembayaran = (event) => {
  //   const {name, value} = event.target;
  //   setJenisPembayaran(value);
  // }

  const onClickPembayaran = (pembayaran) => {
    console.log(pembayaran);
    setJenisPembayaran(pembayaran);
  }

  const showSweetAlert = (title, message, icon) => {
    swal({
        title: title,
        text: message,
        icon: icon,
        buttons: false,
        timer: 1500
    });
  }

  const onSubmitPesanan = async(event) => {
    console.log("on submit pesanan");
    event.preventDefault();
    if(jenisPembayaran){
      const pesanan = {
        totalBayar: totalBayar,
        menus: listKeranjang,
        jenisPembayaran: jenisPembayaran,
        dateOrder: new Date().toISOString()
      }
      console.log(pesanan);
      try{
        const response = await fetch(API_URL+"pesanans",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pesanan)
        });

        if(response.ok){
            navigate("/success")
        }else{
            console.log("GAGAL!");
            showSweetAlert("Pesanan gagal dibuat", 'Mohon maaf layanan sedang bermasalah',"error");
        }
      }catch(error){
        console.log(error);
        showSweetAlert("Pesanan gagal dibuat", 'Mohon maaf layanan sedang bermasalah',"error");
      }
    }else{
      showSweetAlert('','Mohon isi metode pembayaran dahulu','error');
    }
  }

  return (
    <div className="p-2 md:mx-28 my-2 md:flex md:gap-8">
      <div className="w-full md:w-1/2 my-2">
        <h1 className="text-slate-900 text-3xl font-semibold my-2">Daftar Pesanan</h1>
        <ul className="my-2 max-h-64 md:max-h-96 border flex flex-col rounded-lg divide-y border-gray-20 overflow-x-hidden overflow-y-auto">
          {listKeranjang && listKeranjang.map((item)=>(<ListItemKeranjang keranjangItem={item} />))}
        </ul>
        <div className="flex justify-end">
          <div>
            <p className="text-lg">Total</p>
            <p className="text-xl font-bold">Rp {numberWithCommas(totalBayar)}</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 my-2">
        <h1 className="text-slate-900 text-3xl font-semibold my-2">Pilih Metode Pembayaran</h1>
        <form id="myFormPembayaran" onSubmit={onSubmitPesanan}>
          <ul className="my-2 border flex flex-col rounded-lg divide-y border-gray-20 overflow-x-hidden overflow-y-auto">
            <li key={1} className="p-2 cursor-pointer flex" onClick={()=>onClickPembayaran("tunai")}>
              <div className="w-2/3">
                TUNAI
              </div>
              <div className="w-1/3 text-end">
                <input type="radio" name="jenis-pembayaran" id="tunai" value="tunai" checked={jenisPembayaran==="tunai"} />
              </div>
            </li>
            <li key={2} className="p-2 cursor-pointer flex" onClick={()=>onClickPembayaran("gopay")}>
              <div className="w-2/3">
                GOPAY
              </div>
              <div className="w-1/3 text-end">
                <input type="radio" name="jenis-pembayaran" id="gopay" value="gopay" checked={jenisPembayaran==="gopay"} />
              </div>
            </li>
            <li key={3} className="p-2 cursor-pointer flex" onClick={()=>onClickPembayaran("shopeepay")}>
              <div className="w-2/3">
                ShopeePay
              </div>
              <div className="w-1/3 text-end">
                <input type="radio" name="jenis-pembayaran" id="shopeepay" value="shopeepay" checked={jenisPembayaran==="shopeepay"} />
              </div>
            </li>
          </ul>
          <button className="rounded-lg bg-cyan-700 border-2 border-cyan-500 w-full p-2 my-1 text-white text-center font-bold" type="submit">BAYAR Rp.60.000</button>
        </form>
      </div>
    </div>
  );
}

export default Pembayaran;