import React, { useState, useEffect } from 'react';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'
import {Button} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import InventoryTable from './components/Inventory/InventoryTable'
import ProductForm from './components/Inventory/ProductForm'


function Inventory (props){
  console.log(props);
  const [data, setData] = useState(() => props.productList)
  const [originalData] = useState(data)
  const [skipPageReset, setSkipPageReset] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [action, setAction] = useState('')
  const [target, setTarget] = useState({category:'',name:'',description:'',memo:'',spec:[],image:[]})

  useEffect(() => {
    // console.log(props,target);
    setSkipPageReset(false)

    // check()
  },[props.isLoggedIn, data]);

  const handleLogOut = () => {
    console.log('logging out...');
    axios.delete('/api/users/logout')
    .then(res=>{
      // console.log(res)
      if(res.status === 200) {
        document.location.href = '/login'
      }
    })
    .catch(err=>console.log(err))

  };

  const handleAction = (product, action)=>{
    setAction(action)
    setTarget(product)
    setShowProductModal(true)
  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Product Info',
        columns: [
          {
            Header: '#',
            accessor: '_id',
            Cell: ({ row }) => {
              return (
                // <button onClick={()=>console.log(row)}>check</button>
                <span>{row.index+1}</span>
              )
            }
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
          {
            Header: 'Category',
            accessor: 'category',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
        ],
      },
      {
        Header: 'Spec',
        columns: [
          {
            Header: 'Color',
            // accessor: 'color',
            // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
            // to build the toggle for expanding a row
            id:'color',
            // accessor: data =>
            // data.spec.map(item => {
            //   var sizeList = []
            //   item.size.map(size=>{
            //     sizeList.push(size)
            //   })
            //   return `${item.color}+(${sizeList})`
            // }),
            Cell: ({ row }) => {
              const colorList = row.original.spec.map(item=>
                <div>{item.color}</div>
              )
              return (
                // <button onClick={()=>console.log(row)}>check</button>
                colorList
              )
            }
          },
          {
            Header: 'Price',
            // accessor: data =>
            // data.spec.map(item => {
            //   return item.price
            // })
            Cell: ({ row }) => {
              const colorList = row.original.spec.map(item=>
                <div>{item.price}</div>
              )
              return (
                // <button onClick={()=>console.log(row)}>check</button>
                colorList
              )
            }
          },
          {
            Header: 'Size',
            // accessor: data =>
            // data.spec.map(item => {
            //   return item.price
            // })
            Cell: ({ row }) => {
              const sizes = row.original.spec.map(item=> {
                // let sizeList = []
                const sizeList = item.size.map(size=>{
                  return (
                    <span style={{marginLeft:'5px'}}>{size}</span>
                  )
                })

                return (
                  <div>{sizeList}</div>
                  // <button onClick={()=>console.log(row)}>check</button>
                  // colorList
                )
              })
              return(
                sizes
              )

            }
          },
          {
            Header: 'Image',
            // accessor: data =>
            // data.spec.map(item => {
            //   return item.price
            // })
            Cell: ({ row }) => {

              return(
                <span>{row.original.image.length}</span>
              )

            }
          },
          {
            Header: 'Action',
            // accessor: data =>
            // data.spec.map(item => {
            //   return item.price
            // })
            Cell: ({ row }) => {

              return(
                <div>
                  <Button onClick={()=>handleAction(row.original, "update")}>
                    <FontAwesome
                      className="super-crazy-colors"
                      name="pencil"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </Button>
                  <Button variant="danger" onClick={()=>console.log(row)}>
                    <FontAwesome
                      className="super-crazy-colors"
                      name="trash"
                      style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    />
                  </Button>
                </div>
              )

            }
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
        <Button onClick={()=>handleAction(target,"create")} style={{marginRight:'30px'}}>
          <FontAwesome
            className="super-crazy-colors"
            name="plus"
            style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
          />
        </Button>
        <InventoryTable
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
        <ProductForm
          action={action}
          target={target}
          setTarget={setTarget}
          showProductModal={showProductModal}
          setShowProductModal={setShowProductModal}
        />
      </div>
    </div>

  )
}

export default Inventory
