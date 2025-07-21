import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GridToolbar } from '@mui/x-data-grid/internals';
import "./dataTable.scss"
import { Link } from 'react-router-dom';

type Props = {
  columns: GridColDef[],
  rows: object[],
  slug:string,
}

const DataTable = (props : Props) => {

const handleDelete = (id:number)=>{
  console.log(id + "has benn deleted");
}

  const actionColumn : GridColDef = {
    field:"action",
    headerName:"Actions",
    width:200,
    renderCell:(params)=>{
      return(
        <div className='action'>
          <Link to={`/${props.slug}/${params.row.id}`}>
          <img src="/view.svg" alt="" />
          </Link>
          <div className='delete' onClick={()=>handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      )
    }
  }
  return (
    <div className='dataTable'>
      <DataGrid
       className='dataGrid'
        rows={props.rows}
        columns={[...props.columns,actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots = {{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
export default DataTable;