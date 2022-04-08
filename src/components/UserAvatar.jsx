import { Image } from '@chakra-ui/react'
import React from 'react'

function UserAvatar({image}) {
  return (
    
      <Image src={ image ? image : 'images/avatars/image-amyrobson.png'} height={10}/>
  
  )
}

export default UserAvatar