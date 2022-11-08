import React from 'react';
import ItemListCart from './ItemListCart';
import ModalCart from './ModalCart';
import TotalCart from './TotalCart';
import {useState} from 'react';

function Cart({listCart, deleteCartHandler, editCartHandler}) {

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
            <ul className={`${listCart.length>0? "my-2 border border-gray-20" : ""} max-h-64 md:max-h-96 flex flex-col rounded-lg divide-y overflow-x-hidden overflow-y-auto`}>
            {(
                    listCart && listCart.map((item)=>(
                    <ItemListCart key={item.id} cartItem={item} showModalHandler={showModal}/>
                    ))
                )
            }
            </ul>
            <TotalCart listCart={listCart}/>
            {modalOpen? 
                (<ModalCart deleteCartHandler={deleteCartHandler} editCartHandler={editCartHandler} closeModalHandler={closeModal} itemToModal={itemToModal}/>)
            : ""}
        </div>
    );
}

export default Cart;