import React from 'react'
import {useState} from 'react'
import { useCreateGenreMutation, 
          useDeleteGenreMutation,
          useFetchGenresQuery,
          useUpdateGenreMutation,
 } from '../../redux/api/genre.js'

import { toast } from 'react-toastify';
import GenreForm from '../../component/GenreForm.jsx';
import Modal from '../../component/Modal.jsx';


const GenreList = () => {
  const {data: genreApiSlice, refetch} = useFetchGenresQuery();
  const [name, setName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if(!name.trim()){
      toast.error('Genre name is required');
      return;
    }
    try{
      const result = await createGenre({name}).unwrap();
      if(result?.error){
        toast.error(result?.error);
        return;
      }
      toast.success('Genre created successfully');
      setName('');
      refetch();
    }
    catch(err){
      toast.error("Creating genre failed");
    }   
  }

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if(!updatingName.trim()){
      toast.error('Genre name is required');
      return;
    }
    try{
      const result = await updateGenre({id: selectedGenre._id, updateGenre: {name: updatingName}}).unwrap();
      if(result?.error){
        toast.error(result?.error);
        return;
      }
      toast.success(`${result.name} updated successfully`);
      setModalVisible(false);
      setSelectedGenre(null);
      setUpdatingName('');
      refetch();
    }     
    catch(err){
      toast.error("Updating genre failed");
    }
  }

  const handleDeleteGenre = async () => {
    try{
      const result = await deleteGenre(selectedGenre._id).unwrap(); 
      if(result?.error){
        toast.error(result?.error);
        return;
      }
      toast.success(`Genre deleted successfully`);
      setModalVisible(false);
      setSelectedGenre(null);
      setUpdatingName('');
      refetch();
    }
    catch(err){
      toast.error("Deleting genre failed");
    }
  }

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className='md:w-3/4 p-3'>
        <h1 className='h-12'>
          Manage Genres
        </h1>
        <GenreForm value={name} setValue={setName} 
        handleSubmit={handleCreateGenre} 
        />
        <br />
        <div className='flex flex-wrap'>
          {genreApiSlice?.map((genre)=>(
            <div key={genre._id}>
              <button className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50" onClick={() =>{
                setModalVisible(true);
                setSelectedGenre(genre);
                setUpdatingName(genre.name);
              }}>
                {genre.name}
              </button>
            </div>
          ))}
        </div>
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <GenreForm value={updatingName} setValue={(value)=> setUpdatingName(value)} 
            handleSubmit={handleUpdateGenre} 
            buttonText='Update' 
            handleDelete={handleDeleteGenre} 
            />
          </Modal>
      </div>
    </div>
    
  )
}

export default GenreList;