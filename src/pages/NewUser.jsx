import axios from 'axios';
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';



const NewUser = () => {

  const {register, handleSubmit}= useForm()

  const navigate = useNavigate()

  const submit = data => {
    axios.post(`https://e-commerce-api.academlo.tech/api/v1/users`, data)
    .then((res) => 
      navigate('/login')
      
    )}

  

  return (
    <div>
      <Form onSubmit={handleSubmit(submit)} style={{margin:'0',maxWidth:'500px'}}>
        <Form.Group className="mb-3" controlId="formBasicfirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter first name" {...register('firstName')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasiclastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" {...register('lastName')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E mail</Form.Label>
          <Form.Control type="email" placeholder="Enter E-mail" {...register('email')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" {...register('password')} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicphone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="Enter phone" {...register('phone')} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewUser;