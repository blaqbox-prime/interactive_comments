import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'
import { useComments } from '../useComments';


function AlertDialog() {

    const {setDeleteDialogVisibility, deleteComment, currentCommentIdx} = useComments();

    function _handleDelete(){
        // console.log(`${currentCommentIdx.id} | ${currentCommentIdx.parentId}`)
        deleteComment(currentCommentIdx.id, currentCommentIdx.parentId);
        setDeleteDialogVisibility(false)
    }

  return (
    <Grid minHeight={'100vh'} width={'100vw'} bg={'blackAlpha.700'}
     position={'fixed'}
     top={0}
     left={0}
     alignContent={'center'}
     justifyContent={'center'}
    >
        <Box width={'250px'} p={4} bg={'white'} borderRadius={'xl'} boxShadow={'lg'}>
            <Text fontWeight={'bold'}>
                Delete comment
            </Text>
            {/* ------ */}
            <Text my={4}>
                Are you sure you want to delete this comment? This will remove the comment and can't be undone 
            </Text>
            {/* ------ */}
            <Flex alignItems={'center'} justifyContent="space-between" gap={3}>
                <Button
                 bg={'gray'}
                 color={'white'}
                 onClick={() => setDeleteDialogVisibility(false)}
                 _hover={{
                    bg:'light_gray'
                }}
                >
                    No, Cancel
                </Button>

                <Button
                bg={'soft_red'}
                color={'white'}
                onClick={() => _handleDelete()}
                _hover={{
                    bg:'pale_red'
                }}
                >
                Yes, Delete
                </Button>
            </Flex>
        </Box>
    </Grid>
  )
}

export default AlertDialog