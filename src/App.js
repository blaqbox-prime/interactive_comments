import {Container} from '@chakra-ui/react';
import { useEffect } from 'react';
import './App.css';
import Comment from './components/Comment';
import CommentWithReplies from './components/CommentWithReplies';
import {useComments} from './useComments';
import NewComment from './components/NewComment';
import AlertDialog from './components/AlertDialog';

function App() {

  const {comments, loadComments, showDeleteDialog} = useComments();

  useEffect(() => {
    loadComments();
  }, [])

  // useEffect(() => {
  // }, [comments])
  

  const _buildComments = () => {
    return(comments.map(comment => comment.replies.length > 0 ?
      
      <CommentWithReplies
       CommentComponent = {
        <Comment  
        id={comment.id}
        content={comment.content}
        score={comment.score}
        replies={comment.replies}
        createdAt={comment.createdAt}
        user={comment.user}
      />}
      replies={comment.replies}
      id={comment.id}
       />
  
      :

       <Comment key={comment.id}
       id={comment.id}
        content={comment.content}
        score={comment.score}
        replies={comment.replies}
        createdAt={comment.createdAt}
        user={comment.user}
      />))
  }

  return (
    <Container minH={'100vh'} as={'section'} className="App" pt={4}
      maxW={'1024px'}
    >
      {_buildComments()}
      <NewComment isNewComment/>
      {showDeleteDialog && <AlertDialog/>}
    </Container>
  );
}

export default App;
