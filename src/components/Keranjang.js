import React from 'react';
import ListItemKeranjang from './ListItemKeranjang';
import ModalKeranjang from './ModalKeranjang';
import TotalKeranjang from './TotalKeranjang';
import {useState} from 'react';

function Keranjang({keranjang, deleteKeranjangHandler, editKeranjangHandler}) {

    const [itemToModal, setItemToModal] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = (itemChoosen) => {
        setItemToModal(itemChoosen);
        if(itemToModal){
            setModalOpen(true);
        }
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <div className="basis-full md:basis-3/12 px-2 pt-2 pb-24 md:pb-2 relative">
            <h1 className="text-slate-900 text-3xl font-semibold my-2">Keranjang</h1>
            <hr />
            <ul className={`${keranjang.length>0? "my-2 border border-gray-20" : ""} max-h-64 md:max-h-96 flex flex-col rounded-lg divide-y overflow-x-hidden overflow-y-auto`}>
            {(
                    keranjang && keranjang.map((item)=>(
                    <ListItemKeranjang key={item.id} keranjangItem={item} showModalHandler={showModal}/>
                    ))
                )
            }
            </ul>
            <TotalKeranjang keranjang={keranjang}/>
            {modalOpen? 
                (<ModalKeranjang deleteKeranjangHandler={deleteKeranjangHandler} editKeranjangHandler={editKeranjangHandler} closeModalHandler={closeModal} itemToModal={itemToModal}/>)
            : ""}
        </div>
    );
}

export default Keranjang;