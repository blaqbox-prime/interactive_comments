import React, {useState, useContext} from 'react'
import data from './data.json';
import {arrayToSet, setToArray, bubbleSort} from './Utils.js'

const CommentsContext = new React.createContext();

export function useComments(){
    return useContext(CommentsContext);
}

function CommentsProvider({ children }) {

    const [comments, setComments] = useState([]);
    const [showDeleteDialog, setDeleteDialogVisibility] = useState(false);
    const [currentCommentIdx, setCurrentCommentIdx] = useState({id:null, parentId:null});

    // LoadComments
    function loadComments() {

        localStorage.getItem('comments') !== null ?
        setComments(JSON.parse(localStorage.getItem('comments'))) :
        setComments(sortByScore(data['comments']));
    }
    
    //saveChanges
    function saveChanges(newComments) {
        localStorage.setItem('comments', JSON.stringify(sortByScore(newComments)));
        loadComments();
    }

    // sort Comments
    function sortByScore(comments) {
        let scores = comments.map((comment) => Number(comment.score));
        
        // 1. convert array to set so we only have unique score values
        // 2. convert resulting set back to array because it's easier to manipulate
        // 3. sort by score in ascending order 
        let uniqueScoresOrdered = bubbleSort(setToArray(arrayToSet(scores)));
        let orderedComments = [];

        // reverse the scores order
        // filter comments for each score and append to orderedComments
        uniqueScoresOrdered.reverse().forEach((score) => {
            orderedComments = [ ...orderedComments ,...comments.filter((comment) => comment.score === score)];
        });

        return orderedComments;
    }

    // newComment
    function addTopLevelComment(content, user){
        let newComment = 
        {
            id: Math.floor(Math.random() * 1000),
            createdAt: new Date(),
            content: content,
            score: 0,
            user: {...user},
            replies:[]
        } 
        comments.push(newComment);
        saveChanges(comments);
    }

    // NewReply
    function reply(parentId, user, content, replyingTo){

        console.log(`id -> ${parentId} \n content: ${content} \n user: ${JSON.stringify(user)}`);

        let ParentIdx = findParentIndex(parentId);

        let newComment = 
        {
            id: Math.floor(Math.random() * 1000),
            createdAt: new Date(),
            content: content,
            score: 0,
            replyingTo: replyingTo,
            replies:[],
            user: {...user}
        } 
        comments[ParentIdx].replies.push(newComment);
        saveChanges(comments);
    }

    function updateComment(id ,parentId, content){
        if(!parentId){
            let idx = comments.findIndex(comment => comment.id === id);
            comments[idx].content = content;
            saveChanges(comments);
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = comments[ParentIdx].replies.findIndex(comment => comment.id === id);
            comments[ParentIdx].replies[idx].content = content;
            saveChanges(comments);
        }
    }


    // Delete Comment
    function deleteComment(id, parentId){

        if(parentId == null){
            let idx = comments.findIndex(comment => comment.id === id);
            comments.splice(idx, 1);
            saveChanges(comments);
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = comments[ParentIdx].replies.findIndex(comment => comment.id === id);
            comments[ParentIdx].replies.splice(idx, 1);;
            saveChanges(comments);
        }
    }

    // IncrementUpvote
    function incrementUpvote(id, parentId){
        if(parentId == null){
            let idx = comments.findIndex(comment => comment.id === id);
            comments[idx].score++;
            saveChanges(comments);
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = comments[ParentIdx].replies.findIndex(comment => comment.id === id);
            comments[ParentIdx].replies[idx].score++;
            saveChanges(comments);
        }
    }
    
    // DecrementUpvote
    function decrementUpvote(id,parentId){

        if(parentId == null){
            let idx = comments.findIndex(comment => comment.id === id);
            if(comments[idx].score > 0){comments[idx].score--;
            saveChanges(comments);}
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = comments[ParentIdx].replies.findIndex(comment => comment.id === id);
            if(comments[ParentIdx].replies[idx].score > 0){comments[ParentIdx].replies[idx].score--;
            saveChanges(comments);
        }
        }

    }



  const value = {
      comments,
      incrementUpvote,
      decrementUpvote,
      loadComments,
      saveChanges,
      reply,
      addTopLevelComment,
      deleteComment,
      showDeleteDialog,
      setDeleteDialogVisibility,
      currentCommentIdx,
      setCurrentCommentIdx,
      updateComment,
  }

  function findParentIndex(parentId) {
      return comments.findIndex(comment => comment.id === parentId);
  }

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;

}

export default CommentsProvider;