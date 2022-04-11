import React, {useState} from 'react'
import { Box, Flex, Text } from '@chakra-ui/react';
import UserAvatar from './UserAvatar';
import { AddIcon, MinusIcon} from '@chakra-ui/icons';
import data from '../data.json';
import {useComments} from '../useComments';
import CommentEditor from './NewComment';
import IconButtonWithText from './IconButtonWithText';
import { getTimeDifference } from '../Utils';

const AuthUser = data.currentUser;

function Comment({ id,parentId,content,score,user, createdAt, replyingTo}) {

  const {incrementUpvote, decrementUpvote, setDeleteDialogVisibility, setCurrentCommentIdx} = useComments();
  const [showCommentEditor, toggleCommentEditor] = useState(false);
  const [editorMode, setEditorMode] = useState('reply');


  // Click Handler
  const _handleClick = (e) => {
    console.log(e.target.value)
    
    // delete
    if(e.target.value === 'delete'){
      setDeleteDialogVisibility(true)  
      setCurrentCommentIdx({id:id, parentId:parentId});

    }
    // update
    if(e.target.value === 'edit'){
      setEditorMode('edit');
      toggleCommentEditor(!showCommentEditor);
    }
    // reply
    if(e.target.value === 'reply'){
      setEditorMode('reply');
      toggleCommentEditor(!showCommentEditor);
    }
  }

  const renderCommentEditorByMode = (editorMode) => {
    if(editorMode === 'edit' && !parentId) return <CommentEditor  id={id} isUpdate={editorMode === 'edit'} closeEditor={() => toggleCommentEditor(false)}/>
    if(editorMode === 'edit' && parentId) return <CommentEditor  id={id} parentId={parentId} isUpdate={editorMode === 'edit'} closeEditor={() => toggleCommentEditor(false)}/>
    if(editorMode === 'reply' && !parentId) return <CommentEditor  parentId={id} closeEditor={() => toggleCommentEditor(false)} replyingTo={user.username}/>
    if(editorMode === 'reply' && parentId) return <CommentEditor  parentId={parentId} closeEditor={() => toggleCommentEditor(false)} replyingTo={user.username}/>
    
  }

  const _buildActionsDesktopView = () => {
    return window.screen.width > 960 &&
      <Box className='commentActions'>
      {/* Delete Button (Rendered Conditionally) */}
      {AuthUser.username === user.username &&
        <IconButtonWithText
        buttonType={'delete'}
        value={'delete'}
        onClick={ (e) => _handleClick(e)}
        >
        Delete
      </IconButtonWithText>
      }
    {/* Reply Button */}
    {AuthUser.username === user.username ?
            <IconButtonWithText
            buttonType={'edit'}
            value={'edit'}
            onClick={ (e) => _handleClick(e)}
            >
            Edit
          </IconButtonWithText>
          :
          <IconButtonWithText
          buttonType={'reply'}
          value={'reply'}
          onClick={ (e) => _handleClick(e)}
          >
          Reply
        </IconButtonWithText>
          }

    </Box>
  }

  const _buildCounterDesktopView = () => {
    return window.screen.width > 960 &&
        <Box marginRight={5} width={'40px'}>
          <Flex className='score_counter_desktop' alignItems={'center'} direction='column' justifyContent="space-between" p={3} bg={'very_light_gray'} borderRadius={'xl'}>
          <AddIcon as={'button'} fontSize={'.8rem'} my={2} color={'light_grayish_blue'} cursor={'pointer'} onClick={() => incrementUpvote(id,parentId)} 
          _hover={{color: "moderate_blue"}}
          />
          <Text fontWeight={'bold'} color={'moderate_blue'} mx={4}>{score}</Text>
          <MinusIcon as={'button'} my={2} fontSize={'.8rem'} color={'light_grayish_blue'} cursor={'pointer'} onClick={() => decrementUpvote(id,parentId)} 
          _hover={{color: "moderate_blue"}}
          />
          </Flex>
        </Box>
  }

  return (
    <>
    <Box className='comment' bg={'white'} borderRadius={'xl'} my={4} p={5} boxShadow={'sm'}>
     <Flex>

     
     {_buildCounterDesktopView()}
     <Box width={'100%'}>
     <Flex alignItems={'center'} justifyContent="space-between" flex={1} >
       {/* User details */}
        <Flex className="user_details" alignItems={'center'}>
          <UserAvatar image={user.image.webp}/>
          <Text fontWeight={'bold'} mx={3}>{user.username}</Text>
          {/* Badge */}
          {AuthUser.username === user.username &&
            <Text fontSize={'sm'} fontWeight={'bold'} bg={'moderate_blue'} color='white' px={2}>you</Text>
          }
          {/* Date Posted */}
          <Text fontWeight={'bold'} color={"grayish_blue"} mx={3}>{getTimeDifference(createdAt)}</Text>
          {/* Comment Actions - Desktop View */}
        </Flex>
        {_buildActionsDesktopView()}
      </Flex>
      {/* Comment content */}
      <Text color={"grayish_blue"} fontWeight={'normal'} my={5}>
      {replyingTo && <Text as={'span'} fontWeight={'bold'} color='moderate_blue'>@{replyingTo} </Text>}
      {content}
      </Text>
      
      {/* Actions - Mobile View */}
        {window.screen.width < 960 &&
      <Flex alignItems={'center'} justifyContent="space-between">
        <Flex className='score_counter_mobile' alignItems={'center'} justifyContent="space-between" p={3} bg={'very_light_gray'} borderRadius={'xl'}>
          <AddIcon as={'button'} color={'light_grayish_blue'} cursor={'pointer'} onClick={() => incrementUpvote(id,parentId)}/>
          <Text fontWeight={'bold'} color={'moderate_blue'} mx={4}>{score}</Text>
          <MinusIcon as={'button'} color={'light_grayish_blue'} cursor={'pointer'} onClick={() => decrementUpvote(id,parentId)}/>
        </Flex>
        <Box className='commentActions'>
          {/* Delete Button (Rendered Conditionally) */}
          {AuthUser.username === user.username &&
            <IconButtonWithText
            buttonType={'delete'}
            value={'delete'}
            onClick={ (e) => _handleClick(e)}
            >
            Delete
          </IconButtonWithText>
          }
        {/* Reply Button */}
        {AuthUser.username === user.username ?
            <IconButtonWithText
            buttonType={'edit'}
            value={'edit'}
            onClick={ (e) => _handleClick(e)}
            >
            Edit
          </IconButtonWithText>
          :
          <IconButtonWithText
          buttonType={'reply'}
          value={'reply'}
          onClick={ (e) => _handleClick(e)}
          >
          Reply
        </IconButtonWithText>
          }
        </Box>
      </Flex>
        }
     </Box>
    </Flex>
    </Box>

    {showCommentEditor && renderCommentEditorByMode(editorMode)}
    </>
  )
}

// Props


export default Comment