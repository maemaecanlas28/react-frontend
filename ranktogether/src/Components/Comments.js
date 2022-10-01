import React, { useContext } from "react";
import { Comment, Header, Form, Button } from "semantic-ui-react"
import { AuthContext } from "../Context/AuthContext";

function Comments({ comment, idx, removeComment, handleClickCreator }) {

    const auth = useContext(AuthContext);

    return (
        <Comment>
            <Comment.Avatar
                className="avatar-border"
                src={`https://storage.googleapis.com/ranktogether-images/${comment.avatar}`} />
            <Comment.Content>
                <Comment.Author
                    onClick={() => handleClickCreator(comment.user_id)}
                    as='a'>
                    {comment.username}
                </Comment.Author>
                <Comment.Metadata>
                    <div>
                        {comment.created_at}
                    </div>
                </Comment.Metadata>
                <Comment.Text>{comment.message}</Comment.Text>
                <Comment.Actions>
                    {auth.user?.id === comment.user_id ?
                        (<Button
                            onClick={() => removeComment(comment)}
                            circular
                            icon='delete' />) : null}
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    )
}

export default Comments