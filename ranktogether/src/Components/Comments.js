import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import { Comment, Header, Form, Button } from "semantic-ui-react"

function Comments({ comment, idx }) {

    return (
        <Comment>
            {/* <Comment.Avatar src={`https://storage.googleapis.com/ranktogether-images/${comment.user.avatar}`} />
            <Comment.Content>
                <Comment.Author as='a'>{comment.user.username}</Comment.Author>
                <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{comment.message}</Comment.Text>
                <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
            </Comment.Content> */}
        </Comment>
    )
}

export default Comments