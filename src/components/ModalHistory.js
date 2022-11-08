import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { capitalizedFirstLetter, numberWithCommas, showFormattedDate } from '../utils/utils';
import ItemListCart from './ItemListCart';

function ModalHistory({historyToModal, closeModalHandler}) {
    
    const [mainModalOpen, setMainModalOpen] = useState(true);

    const closeThisModal = () => {
        setMainModalOpen(false);
        closeModalHandler();
        // setTimeout(()=>{
        //     console.log("timeout");
        //     closeModalHandler();
        // },2000);
    }

    return (
        <div id="modal-detail-container" class="fixed top-0 left-0 right-0 bottom-0 pt-32 bg-neutral-200/40 h-screen z-40">
            <div id="modal-detail" class={`relative left-0 right-0 w-2/3 md:w-1/3 mx-auto bg-white animate-modalAnimation rounded-lg ${mainModalOpen? '' : "hidden"}`}>
                <div class="p-2 border-b-[1px] flex justify-between text-xl font-semibold"><h1>Detail Pesanan <span className='text-lg font-normal'>({historyToModal.dateOrder? showFormattedDate(historyToModal.dateOrder) :  "-"})</span></h1><button onClick={closeThisModal}><FontAwesomeIcon icon={faXmark}/></button></div>
                <div class="p-2 border-b-[1px]">
                    <div class="mb-2">
                        <ul className={`${historyToModal.menus.length>0? "my-2 border border-gray-20" : ""} max-h-64 md:max-h-96 flex flex-col rounded-lg divide-y overflow-x-hidden overflow-y-auto`}>
                            {  
                                (
                                    historyToModal.menus && historyToModal.menus.map((item)=>(
                                        <ItemListCart key={item.id} cartItem={item}/>
                                    ))
                                )
                            }
                        </ul>
                    </div>
                    <div class="mb-2 text-end">
                        <p>Total</p>
                        <p class="text-lg font-semibold">Rp. {numberWithCommas(historyToModal.totalPaid)}</p>
                        <p>Pembayaran {historyToModal.payment? capitalizedFirstLetter(historyToModal.payment.name) : "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalHistory