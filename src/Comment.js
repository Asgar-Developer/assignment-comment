import React, { useState } from "react";
import Reply from "./Reply";

const Comment = ({ comment, onEditComment, onReplyComment, level }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [replyContent, setReplyContent] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editContent.trim() !== "") {
      onEditComment(comment.id, editContent);
      setIsEditing(false);
      setEditContent("");
    }
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyContent.trim() !== "") {
      onReplyComment(comment.id, replyContent);
      setReplyContent("");
    }
  };

  const indentStyle = {
    marginLeft: `${level * 20}px`
  };

  return (
    <div className="comment" style={indentStyle}>
      <div className="comment-content">
        {!isEditing && <p>{comment.content}</p>}
        {isEditing && (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </div>
      <div>
        <button onClick={handleEditClick}>Edit</button>
        <form onSubmit={handleReplySubmit}>
          <input
            type="text"
            placeholder="Reply to this comment"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button type="submit">Reply</button>
        </form>
      </div>
      {comment.replies.map((reply) => (
        <Reply
          key={reply.id}
          reply={reply}
          onEditReply={onEditComment} // Use onEditComment for editing replies
          level={level + 1}
        />
      ))}
    </div>
  );
};

export default Comment;
