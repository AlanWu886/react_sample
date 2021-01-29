import React, { useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
import {Button} from 'react-bootstrap';

import InventoryTable from './components/InventoryTable'



function Inventory (props){
  console.log(props);
  const [data, setData] = useState(() => props.prodcutlist)
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)

  useEffect(() => {
    console.log(props.isLoggedIn);
    setSkipPageReset(false)
    // check()
  },[props.isLoggedIn, data]);

  const handleLogOut = () => {
    console.log('logging out...');
    axios.delete('/api/users/logout')
    .then(res=>{
      console.log(res)
      if(res.status === 200) {
        document.location.href = '/login'
      }
    })
    .catch(err=>console.log(err))

  };

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )


  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }


  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData)

  return (
    <div>
      <Button onClick={()=>handleLogOut()} style={{float:'right'}}>Log Out</Button>
      <div style={{width:'500px', margin:'auto'}}>
        <h1 style={{textAlign:'center'}}>Inventory Management</h1>
      </div>

      <div>
        <InventoryTable
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </div>
    </div>

  )
}

export default Inventory
