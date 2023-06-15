import React, { useState, useEffect } from "react";
import Comment from "./Comment";

const CommentBox = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Load comments from local storage on component mount
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  useEffect(() => {
    // Update local storage when comments change
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      const newComment = { id: Date.now(), content: comment, replies: [] };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const handleEditComment = (commentId, newContent) => {
    const updatedComments = comments.map((c) => {
      if (c.id === commentId) {
        return { ...c, content: newContent };
      }
      return c;
    });
    setComments(updatedComments);
  };

  const handleReplyComment = (commentId, replyContent) => {
    const updatedComments = comments.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...c.replies, { id: Date.now(), content: replyContent }]
        };
      }
      return c;
    });
    setComments(updatedComments);
  };

  return (
    <div>
      <h2>Comment Box</h2>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Enter your comment"
          value={comment}
          onChange={handleCommentChange}
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEditComment={handleEditComment}
            onReplyComment={handleReplyComment}
            level={0}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
