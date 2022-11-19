import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePosts } from '../features/appSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

const fetchData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
  dispatch(savePosts(posts));
  return posts;
}

const deleteData = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
     method: 'DELETE',
  });

}

const posts = useSelector((state) => state.todo.posts);

const handleTo = (page) => {
  navigate(page);
}

 useEffect(() => {
    if(posts.length < 1) {
        fetchData();
    } 
 }, []);


 const handleDelete = (e, id) => {
  e.preventDefault();

  const getAllPosts = [...posts];
  let delPosts = getAllPosts.filter(item => item.id !== id);
  
  dispatch(savePosts(delPosts));
  deleteData(id);

 }


  return (
    <div className='flex flex-col bg-slate-100' >
    <div className='flex flex-row justify-between px-4 md:px-14 mb-8 mt-8 w-full'>
 <h2 className='font-medium text-xl'> Todo Post </h2>
 <button onClick={() => handleTo('add')} className='cursor-pointer bg-green-100 text-green-500 font-semibold px-8 md:px-14 border border-solid border-green-200'> add </button>
    </div>
   
      <table className=" mx-auto md:mx-14 w-[95%] md:w-[80%]">
  <thead className='bg-slate-200'>
    <tr>
      <th className='w-[20%] py-2 border border-solid border-gray-200'>id</th>
      <th className='w-[20%] border border-solid border-gray-200'>title</th>
      <th className='w-[30%] border border-solid border-gray-200'>body</th>
      <th className='w-[30%] border border-solid border-gray-200'> action </th>
    </tr>
  </thead>
  <tbody className='bg-white'>
  { posts.slice(0, 5).map((item) => (
    <tr key={item.id} className="border-2 border-solid border-gray-200">
      <td className='text-center align-top py-2 md:py-4 border-r border-solid border-r-gray-200'>{item.id}</td>
      <td className='pl-2 align-top py-2 md:py-4 border-r border-solid border-r-gray-200'>{item.title}</td>
      <td className='pl-2  py-2 md:py-4 border-r border-solid border-r-gray-200'>{item.body}</td>
      <td className=' flex flex-col gap-10 pt-20 md:py-8 md:flex-row md:gap-4 px-2 items-center justify-center'> 
        <button onClick={() => handleTo(`editPost/${item.id}`)} className='cursor-pointer bg-blue-100 w-full text-blue-500 font-semibold '> Edit </button>
        <button onClick={e => handleDelete(e, item.id)} className='cursor-pointer bg-red-100 text-red-500 font-semibold w-full'> Delete </button>
      </td>
    </tr>
  ))}

  </tbody>
</table>
    </div>
  )
}

export default Home
