import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePosts } from '../features/appSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [idPost, setIdPost] = useState(0);
    const [userId, setUserId] = useState(0);

    let { id } = useParams();

    const navigate = useNavigate();

    const posts = useSelector((state) => state.todo.posts);

    const dispatch = useDispatch();

    const getDataDetail = async (id) => {
        const dataPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const res = await dataPost.json();
        setTitle(res.title);
        setBody(res.body);
        setIdPost(res.id);
        setUserId(res.userId);
    }

    const editData = async (updatePost) => {
        try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePost)
    });
        const data = await response.json();
        console.log(data);
        return data;
        } catch (e) {
            console.log(e)
        }

    }

     useEffect(() => {
        getDataDetail(id);

     }, [id])

    const handleEdit = (e) => {
        e.preventDefault();

        const getPosts = [...posts];

        const updateValue = {
            id: idPost,
            userId : userId,
            title, 
            body
        }
        
        const updateValueApi = {
            userId : userId,
            title, 
            body
        }
       
        let getIndex = getPosts.findIndex((item) => item.id === idPost );


        getPosts[getIndex] = updateValue;
        
        dispatch(savePosts(getPosts));

        const isSucces = editData(updateValueApi);

        if(isSucces !== '') {
            navigate('/');
        } 
    }


    return (
        <div className='flex flex-col bg-slate-100 py-14 px-6 min-h-screen'>
            <form className='md:w-[60%] mx-auto md:items-center md:justify-center w-full flex flex-col bg-white px-4 py-6 gap-3'>
                <h3 className='text-xl font-semibold text-center'> Edit Form </h3>
                <div className='flex flex-col gap-2 w-full'>
                    <label className='font-medium text-lg'> Title </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='py-1 px-1 border border-solid border-gray-200' />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className='font-medium text-lg'> Body </label>
                    <input type="text" value={body} onChange={(e) => setBody(e.target.value)} className='py-1 px-1   border border-solid border-gray-200' />
                </div>
                <button onClick={handleEdit} className='md:w-[30%] text-center w-full mt-4 py-2 cursor-pointer bg-green-100 text-green-500 font-semibold  border border-solid border-green-200'> edit </button>
            </form>
        </div>
    )
}

export default EditPost
