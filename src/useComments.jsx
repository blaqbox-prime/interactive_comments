import React, {useState, useContext} from 'react'
import data from './data.json';
import {selectionSort} from './Utils.js'

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

        let orderedComments = selectionSort(comments);

        return orderedComments;
    }

    // newComment
    function addTopLevelComment(content, user){
        let newList = comments;
        let newComment = 
        {
            id: Math.floor(Math.random() * 1000),
            createdAt: new Date(),
            content: content,
            score: 0,
            user: {...user},
            replies:[]
        } 
        newList.push(newComment);
        saveChanges(newList);
    }

    // NewReply
    function reply(parentId, user, content, replyingTo){
        
        let newList = comments;

        let ParentIdx = findParentIndex(parentId);

        let newComment = 
        {
            id: Math.floor(Math.random() * 1001),
            createdAt: new Date(),
            content: content,
            score: 0,
            replyingTo: replyingTo,
            replies:[],
            user: {...user}
        } 
        newList[ParentIdx].replies.push(newComment);
        saveChanges(newList);
    }

    function updateComment(id ,parentId, content){
        let newList = comments;
        if(!parentId){
            let idx = newList.findIndex(comment => comment.id === id);
            newList[idx].content = content;
            saveChanges(newList);
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = newList[ParentIdx].replies.findIndex(comment => comment.id === id);
            newList[ParentIdx].replies[idx].content = content;
            saveChanges(newList);
        }
    }


    // Delete Comment
    function deleteComment(id, parentId){

        let newList = comments;

        if(parentId == null){
            let idx = newList.findIndex(comment => comment.id === id);
            newList.splice(idx, 1);
            saveChanges(newList);
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = newList[ParentIdx].replies.findIndex(comment => comment.id === id);
            newList[ParentIdx].replies.splice(idx, 1);;
            saveChanges(newList);
        }
    }

    // IncrementUpvote
    function incrementUpvote(id, parentId){
        let newList = comments;
        if(parentId == null){
            let idx = newList.findIndex(comment => comment.id === id);
            newList[idx].score++;
            saveChanges(newList);
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = newList[ParentIdx].replies.findIndex(comment => comment.id === id);
            newList[ParentIdx].replies[idx].score++;
            saveChanges(newList);
        }
    }
    
    // DecrementUpvote
    function decrementUpvote(id,parentId){

        let newList = comments;

        if(parentId == null){
            let idx = newList.findIndex(comment => comment.id === id);
            if(newList[idx].score > 0){newList[idx].score--;
            saveChanges(newList);}
        } else {
            let ParentIdx = findParentIndex(parentId);
            let idx = newList[ParentIdx].replies.findIndex(comment => comment.id === id);
            if(newList[ParentIdx].replies[idx].score > 0){newList[ParentIdx].replies[idx].score--;
            saveChanges(newList);
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