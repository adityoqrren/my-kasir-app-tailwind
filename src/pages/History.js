import React, { useState, useEffect} from 'react';
import ItemListHistory from '../components/ItemListHistory';
import ModalHistory from '../components/ModalHistory';
import { API_URL } from '../utils/constants';

function History() {
    
    const [historyOrderList, setHistoryOrderList] = useState([]);
    const [historyOpenModal, setHistoryOpenModal] = useState(false);
    const [historyToModal, setHistoryToModal] = useState({});

    useEffect(() => {
      getListHistory()
    }, [])

    const getListHistory = async() => {
        const data = await fetch(API_URL+"order");
        //console.log(data);
        const results = await data.json();
        setHistoryOrderList(results);
        console.log(results);
    }

    const showModal = (itemHistory) => {
        setHistoryToModal(itemHistory);
        if(itemHistory){
            setHistoryOpenModal(true);
        }
    }

    const closeModal = () => {
        setHistoryOpenModal(false);
    }

    return (
        <div>
            <div className="w-2/3 md:w-1/2 mx-auto my-2 p-2">
                <h1 className="text-slate-900 text-3xl font-semibold my-2">Daftar Histori Pemesanan</h1>
                <hr className="mb-2" />
                {
                    (historyOrderList && historyOrderList.map((history)=><ItemListHistory itemHistory={history} showModalHistory={showModal}/>))
                }
            </div>
            {historyOpenModal? <ModalHistory historyToModal={historyToModal} closeModalHandler={closeModal}/> : ""}
        </div>
    );
}

export default History;