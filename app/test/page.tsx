'use client';

import { ProductType } from "@/lib/definition";
import { Button, Modal } from "flowbite-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";


export default function MyPage() {

    const [products , setProducts] = useState<ProductType[]>([]);

    const BaseUrl = 'https://fakestoreapi.com/products';

    const [loading, setLoading] = useState<boolean>(false);

    const [openModal, setOpenModal] = useState(false);

    const [productDetail, setProductDetail] = useState<ProductType | null> ( null )

    useEffect(() => {

        setLoading(true);

        fetch(BaseUrl, {method: 'GET', headers: { 'Content-Type': 'application/json' }}).
        then(response => response.json()).
        then(data =>{ 
        setProducts(data);
        setLoading(false);}).catch(
        error => {
        console.log("error", error);
        setLoading(false);
                }
            )
    }, [])

    const handleView = (product:ProductType) => {
        setProductDetail(product);
        setOpenModal(!openModal)
    }

    const imagePlaceholder = 'https://via.placeholder.com/150';

    const columns : TableColumn<ProductType>[] = [

        {
            name: 'Product Title',
            selector: row => row.title
        },

        {
            name: 'price (USD)',
            selector: row => row.price,
            sortable: true,
        },

        {
            name: 'Image',
            selector: (row): JSX.Element | any => <img className="w-16 h-16" src={row.image} alt = {row.description} />,
        },

        {
            name: "Action",
            selector: (row): any => (
            <div>
                <button onClick={()=>handleView(row)} className="bg-blue-500 text-black rounded-sm p-1">
                    view
                </button>
                <button className="bg-green-500 text-black rounded-sm p-1 mx-2">
                    edit 
                </button>
                <button className="bg-red-600 text-black rounded-sm p-1">
                    delete
                </button>
            </div> 
        
        )
            
        },

    ]


    


  return (
    <div >
        
        <DataTable className="w-[700px] h-auto none-scroll-bar"
        
            columns={columns}

            data={products}

            progressPending={loading}

            pagination

            fixedHeader

            customStyles={customStyles}

            striped

            highlightOnHover

            pointerOnHover
        
        />

<Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
        <Modal.Header>Product Details</Modal.Header>
        <Modal.Body className="m-0 p-0">

        <div className="grid place-content-center bg-gray-50 w-auto h-auto">
                        {/* title */}
            <h1 className="text-center">{productDetail?.title}</h1>

            {/* image */}
            <Image className="m-auto" src={`${productDetail?.image || imagePlaceholder}`} width={106} height={106} alt={`${productDetail?.description}`}/>

            {/* description */}
            <p className="line-clamp-1 w-56">{productDetail?.description}</p>

            {/* price */}
            <p className="line-clamp-1 text-2xl text-yellow-400">{`${productDetail?.price} $`}</p>

            {/* category */}
        </div>

        </Modal.Body>
        <Modal.Footer>   
          <Button color="red" onClick={() => setOpenModal(false)}>
            Exit
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

const customStyles = {
	rows: {
		style: {
			minHeight: '72px', // override the row height
		},
	},
	headCells: {
		style: {
			paddingLeft: '38px', // override the cell padding for head cells
			paddingRight: '8px',
            fontSize: '18px',
            backgroundColor: '#f1f1f1',
		},
	},
	cells: {
		style: {
			paddingLeft: '38px', // override the cell padding for data cells
			paddingRight: '8px',
		},
	},
};
