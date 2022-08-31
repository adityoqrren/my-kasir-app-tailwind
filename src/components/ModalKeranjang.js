import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark, faPlus, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { numberWithCommas } from '../utils/utils';


function ModalKeranjang({deleteKeranjangHandler, editKeranjangHandler, closeModalHandler, itemToModal}) {

    //state
    const [itemJumlah, setItemJumlah] = useState(itemToModal.jumlah);
    const [itemTotalHarga, setItemTotalHarga] = useState(itemToModal.total_harga);
    const [itemKeterangan, setItemKeterangan] = useState(itemToModal.keterangan);

    const deleteAndCloseModal = () =>{
        closeModalHandler();
        deleteKeranjangHandler(itemToModal);
    }

    const add = (event) => {
        event.preventDefault();
        setItemJumlah(itemJumlah+1);
        setItemTotalHarga(itemTotalHarga + itemToModal.product.harga);
        // console.log("max");
    }

    const min = (event) => {
        event.preventDefault();
        if(itemJumlah>1){
            setItemJumlah(itemJumlah-1);
            setItemTotalHarga(itemTotalHarga - itemToModal.product.harga);
        }
       // console.log("min");
    }

    //save changes
    const submitToSave = (event) => {
        event.preventDefault();
        console.log(itemKeterangan);
        const newDataItem = {
            jumlah: itemJumlah,
            total_harga: itemTotalHarga,
            product: itemToModal.product,
            keterangan: itemKeterangan
        };
        editKeranjangHandler(newDataItem, itemToModal.id);
        closeModalHandler();
       // const itemToModalNew = itemToModal();
    }

    //catatan: kalau ada parameter, passing function dengan ()=>namaFunction(params) kalau nggak passing aja langsung nama functionnya

  return (
    <div id="modal-edit-container" className={`fixed top-0 left-0 right-0 bottom-0 pt-32 bg-neutral-200/40 h-screen z-40`}>
        <div id="modal-edit" className="relative left-0 right-0 w-2/3 md:w-1/3 mx-auto bg-white animate-modalAnimation rounded-lg">
            <div className="p-2 border-b-[1px] flex justify-between text-xl font-semibold"><h1>{itemToModal.product.nama} {numberWithCommas(itemToModal.product.harga)}</h1><button onClick={closeModalHandler}>  <FontAwesomeIcon icon={faXmark}/> </button></div>
            <form className="p-2 border-b-[1px]" onSubmit={submitToSave}>
                <div className="mb-2">
                    <p>Harga</p>
                    <p className="text-lg font-semibold">Rp. {numberWithCommas(itemTotalHarga)}</p>
                </div>
                <div className="mb-2">
                    <p>Jumlah:</p>
                    <p className="font-bold"><button className="h-6 w-6 bg-cyan-700 text-white rounded-md" onClick={min}><FontAwesomeIcon icon={faMinus}/></button> {itemJumlah} <button className="h-6 w-6 bg-cyan-700 text-white rounded-md" onClick={add}><FontAwesomeIcon icon={faPlus}/></button></p>
                </div>
                <div className="mb-2">
                    <p className="mb-1">Keterangan</p>
                    <textarea className="w-full border p-2" placeholder="Contoh: Pedas, Nasi Setengah" value={itemKeterangan} onChange={(event)=>setItemKeterangan(event.target.value)} />
                </div>
                <button className="p-2 bg-cyan-700 text-white rounded-md" type='submit'>Simpan</button>
            </form>
            <div className="p-2 flex justify-end">
                <button className="p-2 bg-red-500 text-white rounded-md" onClick={deleteAndCloseModal}>Hapus Pesanan <FontAwesomeIcon icon={faTrash}/></button>
            </div>
        </div>
    </div>
  )
}

export default ModalKeranjang