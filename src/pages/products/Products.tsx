import { useState } from "react";
import "./products.scss"
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {products} from "../../data";
import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'img', headerName: 'Image', width: 100,
    renderCell:(params)=>{
      return <img src={params.row.img || "/noavatar.png"}/>
    },
   },

  {
    field: 'title',
    headerName: 'Title',
    width: 250,
    editable: false,
  },
  {
    field: 'color',
    headerName: 'Color',
    width: 150,
    editable: false,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 200,
    editable: false,
  },
  { field: 'producer', headerName: 'Producer', width: 200 , type:"string"},
  { field: 'createdAt', headerName: 'Created At', width: 200 , type:"string"},
  { field: 'inStock', headerName: 'In Stock', width: 150 , type:"boolean"},
];

const Products = () =>{
  const [open,setOpen] = useState(false);
    return(
        <div className="products">
            <div className="info">
                <h1>Products</h1>
                <button onClick={()=>setOpen(true)}>Add New Products</button>
            </div>
            <DataTable slug="products" columns={columns} rows={products}/>
            {open && <Add slug="product" columns={columns} setOpen={setOpen}/>}
        </div>
    )
}
export default Products