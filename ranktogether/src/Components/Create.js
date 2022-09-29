import React, { useState } from "react";
import { Button, Form, Input, TextArea } from "semantic-ui-react"

function Create() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [imageTitle, setImageTitle] = useState("")
    const [categories, setCategories] = useState([])
    const [endDate, setEndDate] = useState("")
    const [tags, setTags] = useState([])

    return (
        <div className="create-form">
        <Form>
            <Form.Field>
                <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <TextArea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}>
                        Description: 
                    </TextArea>
            </Form.Field>
            <Form.Field>
                <Input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <Input
                    type="text"
                    name="imageTitle"
                    placeholder="Image Title"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <Input
                    type="text"
                    name="category"
                    placeholder="Categories"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <TextArea
                    type="text"
                    name="tags"
                    placeholder="Tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}>
                        Tags: 
                    </TextArea>
            </Form.Field>
            <Form.Field>
                <Input
                    type="text"
                    name="end date"
                    placeholder="End Date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} />
            </Form.Field>
            <Button
                type="submit">
                Submit
            </Button>
        </Form>
        </div>
    )
}

export default Create