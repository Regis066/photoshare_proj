export const userQuery = (userId) =>{
    const query = `*[_type == 'user' && _id == '${userId}']`;
    return query;
}

export const searchQuery = (searchTerm) =>{
    const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}'] {
    image {
        asset ->{
          url  
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy ->{
            _id,
            userName,
            image
        },
      }
    }`
    return query;
}


export const feedQuery = `*[type == 'pin' | order(_createAt desc)] {
    image {
        asset ->{
          url  
        }
      },
      _id,
      destination,
      postedBy -> {
        _id,
        username,
        image,
      },
      save[]{
        _key,
        postedBy ->{
            _id,
            username,
            image,
        },
      },
}`
// asterix signs * finish matching terms before you finish serching them

// {} //  what we want to get back 