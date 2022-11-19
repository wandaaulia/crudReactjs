import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { savePosts } from '../features/appSlice';

const AddPost = () => {

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const posts = useSelector((state) => state.todo.posts);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const sendData = async (data) => {
    try {
         const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const dataRes = await res.json();
    return dataRes;
    } catch(e) {
        console.log(e);
    }
   
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === '' && body === '') {
      setError('harap diisi');
    }

    const newValueApi = {
      userId: 1,
      title,
      body
    }

    
    const newValue = {
      id: uid(),
      userId: 1,
      title,
      body
    }


    const getArr = [...posts];
    getArr.push(newValue);

    dispatch(savePosts(getArr));
    const isSuccess = sendData(newValueApi);

    if(isSuccess !== '') {
      navigate('/');
    }

    setError('');
    setTitle('');
    setBody('');
  }

  return (
    <div className='flex flex-col bg-slate-100 py-14 px-6 min-h-screen'>
      <form className='md:w-[60%] mx-auto md:items-center md:justify-center w-full flex flex-col bg-white px-4 py-6 gap-3'>
        <h3 className='text-xl font-semibold text-center'> Form </h3>
        <p className='text-red-500'> {error ? error : ''} </p>
        <div className='flex flex-col gap-2 w-full'>
          <label className='font-medium text-lg'> Title </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='py-1 px-1 border border-solid border-gray-200' />
        </div>
        <div className='flex flex-col gap-2 w-full'>
          <label className='font-medium text-lg'> Body </label>
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} className='py-1 px-1   border border-solid border-gray-200' />
        </div>
        <button onClick={handleSubmit} className='md:w-[30%] w-full text-center mt-4 py-2 cursor-pointer bg-green-100 text-green-500 font-semibold  border border-solid border-green-200'> submit </button>
      </form>
    </div>
  )
}

export default AddPost
