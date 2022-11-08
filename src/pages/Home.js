import React, { useEffect } from 'react'
import ListCategories from '../components/ListCategories';
import { useState } from 'react';
import Menus from '../components/Menus';
import { API_URL } from '../utils/constants';
import Cart from '../components/Cart';
import swal from 'sweetalert';

function Home() {

    const [categoryChoosen, setCategoryChoosen] = useState(1);
    const [menusData, setMenusData] = useState([]); 
    const [listCart, setListCart] = useState([]);

    useEffect(()=>{
        getMenusByCategory();
    },[categoryChoosen]);

    //pakai [] berarti 1 kali saja, sama dengan componentDidMount
    useEffect(()=>{
        getListCart();
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

    const getListCart = async() => {
        const data = await fetch(API_URL+"cart");
        //console.log(data);
        const results = await data.json();
        setListCart(results);
        console.log(results);
    }

    const deleteDataCart = async(item) => {
        try{
            const response = await fetch(API_URL+"cart/" + item.id, {method: 'DELETE'});
            if(response.ok){
                getListCart();
                showSweetAlert("Sukses Menghapus Item", `Sukses menghapus item ${item.product.name} di keranjang`, "success");
            }else{
                showSweetAlert("Gagal Menghapus Item",`Gagal menghapus item ${item.product.name} di keranjang`, "error");
            }
        }catch(error){
            console.log("error delete");
        }
    }

    const addToListCart = async(item) => {
        const data = await fetch(API_URL+"cart?product.id="+item.id);
        const results = await data.json();
        if(results.length === 0){
            //buat data baru di keranjang
            const itemToAdd = {
                count: 1,
                total_price: item.price,
                product: item
            };

            fetch(API_URL+"cart",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToAdd)
            })
            .then((response) => {
                console.log(response)
                if(response.ok){
                    getListCart();
                    showSweetAlert("Sukses masuk keranjang!", `${item.name} telah ditambahkan ke keranjang`,"success");
                }else{
                    // console.log("GAGAL!");
                    showSweetAlert("Gagal masuk keranjang!", `${item.name} gagal ditambahkan ke keranjang`,"error");
                }
            })
            .catch((error)=>{
                console.log('Error:', error);
                showSweetAlert("Gagal masuk keranjang!", `${item.name} gagal ditambahkan ke keranjang`,"error");
            })
        }else{
            //update item
            const itemToUpdate = {
                count: results[0].count + 1,
                total_price: results[0].total_price + item.price,
                product: item
            };

            //console.log(itemToUpdate);

            try{
                const response = await fetch(API_URL+"cart/"+results[0].id,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(itemToUpdate)
                });
    
                if(response.ok){
                    getListCart();
                    showSweetAlert("Sukses update keranjang!", `${item.name} telah ditambahkan ke keranjang`,"success");
                }else{
                    console.log("GAGAL!");
                    showSweetAlert("Gagal update keranjang!", `${item.name} gagal ditambahkan ke keranjang`,"error");
                }

            }catch(error){
                console.log('Error:', error);
                showSweetAlert("Gagal masuk keranjang!", `${item.name} gagal ditambahkan ke keranjang`,"error");
            }

        }
    }

    const editInListCart = async(itemToUpdate, id) => {
        console.log(itemToUpdate);
        try{
            const response = await fetch(API_URL+"cart/"+id,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToUpdate)
            });

            if(response.ok){
                getListCart();
                // showSweetAlert("Sukses update keranjang!", `${item.name} telah ditambahkan ke keranjang`,"success");
            }else{
                console.log("GAGAL!");
                // showSweetAlert("Gagal update keranjang!", `${item.name} gagal ditambahkan ke keranjang`,"error");
            }

        }catch(error){
            console.log('Error:', error);
            // showSweetAlert("Gagal masuk keranjang!", `${item.name} gagal ditambahkan ke keranjang`,"error");
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
            <Menus menusData={menusData} addToCartHandler={addToListCart}/>
            <Cart listCart={listCart} deleteCartHandler={deleteDataCart} editCartHandler={editInListCart}/>
        </div>
    );
}

export default Home;