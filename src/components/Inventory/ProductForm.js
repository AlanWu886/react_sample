import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Table, Button, Modal, Form } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome'
import {Formik, Field} from 'formik'
import * as yup from 'yup'

const schema = yup.object({
  category: yup.string().required(),
  name: yup.string().required(),
  description:yup.string(),
  memo:yup.string()


});

const specSchema = yup.object({
  color: yup.string().required(),
  price: yup.string().required()
});

function ProductForm({...props}){
  console.log(props.target);
  const [product, setProduct] = useState({category:'',name:'',description:'',memo:'',spec:[],image:[]})
  const [spec, setSpec] = useState({color:"",price:"",size:[]})
  const [specIndex, setSpecIndex] = useState(null)
  const [showSpec, setShowSpec] = useState(false)

  const submitProduct = ()=>{

  }

  const handleSpec = (data,index)=>{
    setShowSpec(true)
    props.setShowProductModal(false)
    console.log(data,index);
    setSpec(data)
    setSpecIndex(index)
  }

  const specUpdate = (values)=>{
    const newSize = values.size.split(",")
    let newSpec = {...spec}
    newSpec.size = newSize

    let newSpecList = props.target.spec.map(i=>({...i}))
    newSpecList[specIndex] = newSpec
    console.log(newSpec,specIndex,newSpecList);
    let changedProduct = {
      ...props.target,
      spec:newSpecList
    }
    console.log(changedProduct);
    props.setTarget(changedProduct);
    props.setShowProductModal(true)
    setShowSpec(false)
  }

  useEffect((product) => {
    console.log(props);
    // setProduct(props.target)

    // check()
  },[props,product]);

  const removeIcon = <FontAwesome
    className="super-crazy-colors"
    name="remove"
    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
  />

  const removeIconStyle = {float:'right',
                          marginRight:'5px',
                          height:'75%',
                          alignSelf:'center'
                         }

  const dropdownItemStyle = {padding:'5px',

                            }
  const modalStyle = {
    backgroundColor:"#3f3e4f",
    borderColor:"#3f3e4f"
  }

  const specInfo = props.target.spec.map((spec,index)=>{
    const sizeList = spec.size.map(size=><span style={{marginLeft:"5px"}}>{size}</span>)
    return(
      <tr>
        <td>{spec.color}</td>
        <td>{spec.price}</td>
        <td>{sizeList}</td>
        <td>
          <Button onClick={()=>handleSpec(spec,index)}>
            <FontAwesome
              className="super-crazy-colors"
              name="pencil"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
          <Button variant="danger" onClick={()=>console.log(spec)}>
            <FontAwesome
              className="super-crazy-colors"
              name="trash"
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />
          </Button>
        </td>
      </tr>

    )
  })




  return(
    <div>
      <Modal centered show={props.showProductModal} onHide={()=>props.setShowProductModal(false)} >
        <Modal.Header closeButton style={modalStyle}>
          <Modal.Title>{props.action} your product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyle}>
        Only product category and name are required.
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={schema}
          onSubmit={(values, { validate }) => {
              console.log(values);
              props.setShowProductModal(false)
              setShowSpec(true)


          }}
          initialValues={props.target}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            handleReset,
            values,
            touched,
            isValid,
            errors,
          }) => (

            <Form noValidate onSubmit={handleSubmit} style={{marginTop:"10px"}}>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                type="category"
                placeholder="Enter category"
                name="category"
                value={values.category}
                onChange={handleChange}
                isInvalid={!!errors.category}

                />
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="name"
                placeholder="Enter name"
                name="name"
                value={values.name}
                onChange={handleChange}
                isInvalid={!!errors.name}

                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="string"
                placeholder="Enter description"
                name="description"
                value={values.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formMemo">
                <Form.Label>Memo</Form.Label>
                <Form.Control
                type="string"
                placeholder="Enter memo"
                name=""
                value={values.memo}
                onChange={handleChange}
                isInvalid={!!errors.memo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.memo}
                </Form.Control.Feedback>
              </Form.Group>

              <h5>Spec Info</h5>
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Color</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {specInfo}

                </tbody>
              </Table>

              <div style={{float:"right"}}>
                <Button variant="warning" onClick={handleReset}>Reset</Button>
                <Button variant="primary" type="submit" style={{marginLeft:"5px"}}>Next</Button>
              </div>
            </Form>
          )}
        </Formik>
        </Modal.Body>
      </Modal>

      <Modal centered show={showSpec} onHide={()=>setShowSpec(false)} >
        <Modal.Header closeButton style={modalStyle}>
          <Modal.Title>{props.action} your product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalStyle}>
        Please use "," as seperation between each size option.
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={specSchema}
          onSubmit={(values, { validate }) => {
              console.log(values);
              specUpdate(values)

          }}
          initialValues={spec}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            handleReset,
            values,
            touched,
            isValid,
            errors,
          }) => (

            <Form noValidate onSubmit={handleSubmit} style={{marginTop:"10px"}}>
              <Form.Group controlId="formColor">
                <Form.Label>Color</Form.Label>
                <Form.Control
                type="string"
                placeholder="Enter color"
                name="color"
                value={values.color}
                onChange={handleChange}
                isInvalid={!!errors.color}

                />
                <Form.Control.Feedback type="invalid">
                  {errors.color}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="string"
                placeholder="Enter Price"
                name="price"
                value={values.price}
                onChange={handleChange}
                isInvalid={!!errors.price}

                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formSize">
                <Form.Label>Size</Form.Label>
                <Form.Control
                type="array"
                placeholder="Enter size"
                name="size"
                value={values.size}
                onChange={handleChange}
                isInvalid={!!errors.size}

                />
                <Form.Control.Feedback type="invalid">
                  {errors.size}
                </Form.Control.Feedback>
              </Form.Group>

              <span>{JSON.stringify(spec)}</span>


              <div style={{float:"right"}}>
                <Button variant="warning" onClick={handleReset}>Reset</Button>
                <Button variant="primary" type="submit" style={{marginLeft:"5px"}}>{props.action}</Button>
              </div>
            </Form>
          )}
        </Formik>
        </Modal.Body>
      </Modal>
    </div>

  )
}

export default ProductForm
