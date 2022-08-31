import React, { useState, useEffect} from 'react';
import ListHistory from '../components/ListHistory';
import ModalHistory from '../components/ModalHistory';
import { API_URL } from '../utils/constants';

function History() {
    
    const [listHistoryPesanan, setListHistoryPesanan] = useState([]);
    const [openModalHistory, setOpenModalHistory] = useState(false);
    const [historyToModal, setHistoryToModal] = useState({});

    useEffect(() => {
      getListHistory()
    }, [])

    const getListHistory = async() => {
        const data = await fetch(API_URL+"pesanans");
        //console.log(data);
        const results = await data.json();
        setListHistoryPesanan(results);
        console.log(results);
    }

    const showModal = (itemHistory) => {
        setHistoryToModal(itemHistory);
        if(itemHistory){
            setOpenModalHistory(true);
        }
    }

    const closeModal = () => {
        setOpenModalHistory(false);
    }

    return (
        <div>
            <div className="w-2/3 md:w-1/2 mx-auto my-2 p-2">
                <h1 className="text-slate-900 text-3xl font-semibold my-2">Daftar Histori Pemesanan</h1>
                <hr className="mb-2" />
                {
                    (listHistoryPesanan && listHistoryPesanan.map((history)=><ListHistory itemHistory={history} showModalHistory={showModal}/>))
                }
            </div>
            {openModalHistory? <ModalHistory historyToModal={historyToModal} closeModalHandler={closeModal}/> : ""}
        </div>
    );
}

export default History;