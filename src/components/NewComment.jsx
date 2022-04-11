import React, {useState, useEffect} from 'react'
import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react';
import UserAvatar from './UserAvatar';
import data from '../data.json';
import {useComments} from '../useComments';

const AuthUser = data.currentUser;

function CommentEditor({isUpdate, replyingTo ,isNewComment, id, parentId, closeEditor}) {

  const [commentText, setCommentText] = useState('');
  const {reply, addTopLevelComment, updateComment} = useComments();
  

  useEffect(() => {
    replyingTo && setCommentText(`@${replyingTo}, `);
  },[])


  useEffect(() => {

  },[commentText])
  

  // removes the @username tag from the text to be saved
  const removeTagFromCommentText = () => {
    return commentText.substring(replyingTo.length+2);
  } 

  const _handleClick = () => {
    if(commentText === '') return;
    
    //  reply
    if(!isUpdate && !isNewComment){
      let cleanedText = removeTagFromCommentText().trim();
      reply(parentId, AuthUser, cleanedText, replyingTo);
      
      closeEditor();
    }

    // new Comment
    if(isNewComment){
      addTopLevelComment(commentText, AuthUser);
    }

    // update
    if(isUpdate){
      console.log('update clicked')
      updateComment(id,parentId, commentText);
      closeEditor();
    }

    reset();

  }

  function reset(){
    setCommentText('');
  }

  return (
    <Box className='comment' bg={'white'} borderRadius={'xl'} my={4} p={5} boxShadow={'sm'}>
     <Box>
      <Flex alignItems={'start'} justifyContent="space-between">
        {/* User Image */}
        <UserAvatar image={AuthUser.image.webp}/>
        {/*New Comment Box */}
        <Textarea resize={'none'} display={'flex'} width={'100%'} flex={1} mx={4} color={"grayish_blue"} fontWeight={'medium'}
          onChange={(e) => setCommentText(e.target.value)}
          value={commentText}
        />
      <Button bg={'moderate_blue'}
        onClick={() => _handleClick()}
        _hover={{
          opacity: 0.6
        }}
      >
          <Text fontWeight={'black'} color={'white'}>{isUpdate ? 'Update' : isNewComment ? 'Send' : 'Reply'}</Text>
        </Button>
      </Flex>
     </Box>
    </Box>
  )
}

export default CommentEditor