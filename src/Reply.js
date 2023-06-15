import React, { useState } from "react";

const Reply = ({ reply, onEditReply, level }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditContent(reply.content);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editContent.trim() !== "") {
      onEditReply(reply.id, editContent);
      setIsEditing(false);
      setEditContent("");
    }
  };

  const indentStyle = {
    marginLeft: `${level * 20}px`
  };

  return (
    <div className="comment reply" style={indentStyle}>
      <div className="comment-content">
        {!isEditing && <p>{reply.content}</p>}
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
      </div>
    </div>
  );
};

export default Reply;
