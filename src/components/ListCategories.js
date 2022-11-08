import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheese} from '@fortawesome/free-solid-svg-icons';
import {faMugSaucer} from '@fortawesome/free-solid-svg-icons';
import {faUtensils} from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../utils/constants';

function ListCategories({categoryChoosen, onCategoryChange}){

    const [dataCategories, setDataCategories] = useState([]);

    useEffect(()=>{
        fetchCategories();
    },[]); //pakai array [] maksudnya biar nggak kerender terus saat ada perubahan di element apapun (ini sama dengan ComponentDidMount)

    const fetchCategories = async() => {
        const data = await fetch(API_URL+"categories");
        const categoriesData = await data.json();
        setDataCategories(categoriesData);
        console.log(categoriesData);
    };

    const Icon = ({name}) => {
        switch(name){
            case "Makanan" : return <FontAwesomeIcon icon={faUtensils}/>
            case "Minuman" : return <FontAwesomeIcon icon={faMugSaucer}/>
            case "Cemilan" : return <FontAwesomeIcon icon={faCheese}/>
            default : return null
        }
    };

    return(
       <div className="basis-full md:basis-2/12 p-2">
            <h1 className="text-slate-900 text-3xl font-semibold my-2">Daftar Kategori</h1>
            <hr />
            <ul className="my-2 border flex flex-col rounded-lg divide-y border-gray-20 overflow-hidden">
                {
                    (
                        dataCategories && dataCategories.map((itemCategory)=>(
                            <li href key={itemCategory.id} className={`${categoryChoosen===itemCategory.id ? "bg-cyan-700 text-white" : "text-gray-500"} p-2  cursor-pointer`} onClick={()=>onCategoryChange(itemCategory.id)}><span className="w-5 inline-block"><Icon name={itemCategory.name}/></span> {itemCategory.name}</li>
                        ))
                    )
                }
            </ul>
        </div>
    );
}

export default ListCategories;