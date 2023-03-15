import React from 'react';
import Comment from './Comment';

export default function CommentList({ comments }) {
  console.log(comments.comments)
  if (!comments) {
    return null;
  }
  
  return (
    <ul className='comments-list'>
      {comments.comments.map(comment => <Comment comment={comment} />)}
    </ul>
  );
}
