import React, { useEffect } from 'react'
import ListCategories from '../components/ListCategories';
import { useState } from 'react';
import Menus from '../components/Menus';
import { API_URL } from '../utils/constants';
import Keranjang from '../components/Keranjang';
import swal from 'sweetalert';

function Home() {

    const [categoryChoosen, setCategoryChoosen] = useState(1);
    const [menusData, setMenusData] = useState([]); 
    const [listKeranjang, setListKeranjang] = useState([]);

    useEffect(()=>{
        getMenusByCategory();
    },[categoryChoosen]);

    //pakai [] berarti 1 kali saja, sama dengan componentDidMount
    useEffect(()=>{
        getListKeranjang();
    },[])

    const onCategoryChange = (idChoosen) => {
        setCategoryChoosen(idChoosen);
    };

    const getMenusByCategory = async() => {
        const data = await fetch(API_URL+"products?category.id="+categoryChoosen);
        const results = await data.json();
        setMenusData(results);
        console.log(results);
    }

    const getListKeranjang = async() => {
        const data = await fetch(API_URL+"keranjangs");
        //console.log(data);
        const results = await data.json();
        setListKeranjang(results);
        console.log(results);
    }

    const deleteDataKeranjang = async(item) => {
        try{
            const response = await fetch(API_URL+"keranjangs/" + item.id, {method: 'DELETE'});
            if(response.ok){
                getListKeranjang();
                showSweetAlert("Sukses Menghapus Item", `Sukses menghapus item ${item.product.nama} di keranjang`, "success");
            }else{
                showSweetAlert("Gagal Menghapus Item",`Gagal menghapus item ${item.product.nama} di keranjang`, "error");
            }
        }catch(error){
            console.log("error delete");
        }
    }

    const addToListKeranjang = async(item) => {
        const data = await fetch(API_URL+"keranjangs?product.id="+item.id);
        const results = await data.json();
        if(results.length === 0){
            //buat data baru di keranjang
            const itemToAdd = {
                jumlah: 1,
                total_harga: item.harga,
                product: item
            };

            fetch(API_URL+"keranjangs",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToAdd)
            })
            .then((response) => {
                if(response.ok){
                    getListKeranjang();
                    showSweetAlert("Sukses masuk keranjang!", `${item.nama} telah ditambahkan ke keranjang`,"success");
                }else{
                    // console.log("GAGAL!");
                    showSweetAlert("Gagal masuk keranjang!", `${item.nama} gagal ditambahkan ke keranjang`,"error");
                }
            })
            .catch((error)=>{
                console.log('Error:', error);
                showSweetAlert("Gagal masuk keranjang!", `${item.nama} gagal ditambahkan ke keranjang`,"error");
            })
        }else{
            //update item
            const itemToUpdate = {
                jumlah: results[0].jumlah + 1,
                total_harga: results[0].total_harga + item.harga,
                product: item
            };

            //console.log(itemToUpdate);

            try{
                const response = await fetch(API_URL+"keranjangs/"+results[0].id,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemToUpdate)
                });
    
                if(response.ok){
                    getListKeranjang();
                    showSweetAlert("Sukses update keranjang!", `${item.nama} telah ditambahkan ke keranjang`,"success");
                }else{
                    console.log("GAGAL!");
                    showSweetAlert("Gagal update keranjang!", `${item.nama} gagal ditambahkan ke keranjang`,"error");
                }

            }catch(error){
                console.log('Error:', error);
                showSweetAlert("Gagal masuk keranjang!", `${item.nama} gagal ditambahkan ke keranjang`,"error");
            }

        }
    }

    const editInListKeranjang = async(itemToUpdate, id) => {
        console.log(itemToUpdate);
        try{
            const response = await fetch(API_URL+"keranjangs/"+id,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToUpdate)
            });

            if(response.ok){
                getListKeranjang();
                // showSweetAlert("Sukses update keranjang!", `${item.nama} telah ditambahkan ke keranjang`,"success");
            }else{
                console.log("GAGAL!");
                // showSweetAlert("Gagal update keranjang!", `${item.nama} gagal ditambahkan ke keranjang`,"error");
            }

        }catch(error){
            console.log('Error:', error);
            // showSweetAlert("Gagal masuk keranjang!", `${item.nama} gagal ditambahkan ke keranjang`,"error");
        }
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


    return (
        <div className='flex flex-row flex-wrap'>
            <ListCategories categoryChoosen={categoryChoosen} onCategoryChange={onCategoryChange}/>
            <Menus menusData={menusData} addToKeranjangHandler={addToListKeranjang}/>
            <Keranjang keranjang={listKeranjang} deleteKeranjangHandler={deleteDataKeranjang} editKeranjangHandler={editInListKeranjang}/>
        </div>
    );
}

export default Home;