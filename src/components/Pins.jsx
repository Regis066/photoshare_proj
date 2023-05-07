import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline} from 'react-icons/md';
import {AiTwotoneDelete} from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill} from 'react-icons/bs';
import { client , urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Pins = ({pin: {postedBy , image, _id , destination, asset , save}}) => {

  const [postHovered , setPostHovered] = useState(false);
  const [savingPost , setSavingPost] = useState(false);


  const navigate = useNavigate();
  const user = fetchUser();

  //SPECIFY IF THE USER HAS SAVED A SPECIFIC POST
  let alreadySaved = !!(save && save.filter((item)=>item.postedBy._id === user && user.googleId))?.length;

  const savePin = (id) =>{
    if(!alreadySaved){
      setSavingPost(true);

      client
      .patch(id)
      .setIfMissing({ save: []})
      .insert('after', 'save[-1]',[{
        _key:uuidv4(),
        userId: user && user.googleId,
        postedBy: {
          _type:'postedBy',
          _ref: user && user.googleId,
        }
      }])
      .commit().then(()=>{
        window.location.reload();
        setSavingPost(false);
      })
    }
  }

  const deletePin = (id)=>{
    client
    .delete(id)
    .then(()=>{
      window.location.reload();
    })
  }

  // 1, [2,3,4] -> [1].length  ->1 !1 ->false !false ->true
  // 4, [2,3,5] ->[].length ->0 !0 -> true -!true -> false


  return (
    <div className='m-2'>

    <div 
    onMouseEnter={()=> setPostHovered(true)}
    onMouseLeave={()=> setPostHovered(false)}
    onClick={()=> navigate(`/pin-detail/${_id}`)}
    className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg-overflow-hidden transition-all duration-500 ease-out'
    > 
    {image && <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(250).url()} />}
    {postHovered && (
      <div
      className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 py-2 z-50'
      style={{height: '100%'}}
      >
      <div className='flex items-center justify-between'>

      <div className='flex gap-2' >
      <a
      href={`${image && image.asset && asset && asset.url}?dl=`}
      download
      onClick={(e) =>e.stopPropagation()}
      className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 '
      >
      <MdDownloadForOffline />
      </a>
      </div>
      {alreadySaved ? (
        <button type='button'  className='bg-red-500 opacity-100 text-white font-bold px-5 text-base rounded-3xl hover:shadow-md outline-none'>
        {save && (save.length)}Saved
        </button>
      ):(
        <button
        onClick={(e) =>{
          e.stopPropagation();
          savePin(_id);
        } 
        }
        type='button' className='bg-red-500 opacity-80 text-white font-bold px-5 text-base rounded-3xl hover:shadow-md outline-none'>
        Save
        </button>
      )
    }
      </div>
      <div className='flex justify-between items-center gap-0 w-full'>
      {destination && (
        <a
        href={destination}
        target='_blank'
        rel='noreferrer'
        className='bg-white flex items-center text-black font-bold p-2 pl-2 pr-2 gap-1 rounded-full opacity-70 hover:100 hover:shadow-md'
        >
        <BsFillArrowUpRightCircleFill />
         {destination.length > 15 ? `${destination.slice(0,15)}`: destination}...
        </a>
      )}
      {postedBy && postedBy._id === user.googleId && (
        <button
        type='button'
        onClick={(e) =>{
          e.stopPropagation();
          deletePin(_id);
        } 
        }
        className='bg-white p-2 opacity-70 font-bold text-dark text-base rounded-3xl hover:shadow-md hover:opacity-100 outline-none'
        >
        <AiTwotoneDelete />
        </button>
      )}
      
      </div>
      </div>
    )}
    </div>
    {postedBy && postedBy._id && (
        <Link to={`user-profile/${postedBy && postedBy._id}`} className='flex gap-2 mt-2 items-center'>
    <img 
    className='w-8 h-8 rounded-full object-cover'
    src={postedBy && postedBy.image}
    alt='user-profile'
    />
    <p className='font-semibold capitalize'>{user.name}</p>
    </Link>
    )}
    
    </div>
  )
}

export default Pins


//preventDefault() helps us when you click on a button it does redirect you to elsewhere
//stopPropagation()  is a method that is used to prevent an event from bubbling up the DOM tree. When an event is triggered on an element, it will propagate up through all of its parent elements in the DOM tree. 

