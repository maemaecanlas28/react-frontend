import React, { useState } from "react";
import { Button, Form, Input, TextArea, FormField, Icon } from "semantic-ui-react"

function Create() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [options, setOptions] = useState([])
    const [imageTitle, setImageTitle] = useState("")
    const [categories, setCategories] = useState([])
    const [endDate, setEndDate] = useState("")
    const [tags, setTags] = useState([])

    // function fileChange(e) {
    //     setAvatarImage(e.target.files[0]);
    // }

    // return (
        // <div className="create-form">
        //     <Form>
        //         <Form.Field>
        //             <Input
        //                 type="text"
        //                 name="title"
        //                 placeholder="Title"
        //                 value={title}
        //                 onChange={(e) => setTitle(e.target.value)} />
        //         </Form.Field>
        //         <Form.Field>
        //             <TextArea
        //                 type="text"
        //                 name="description"
        //                 placeholder="Description"
        //                 value={description}
        //                 onChange={(e) => setDescription(e.target.value)}>
        //                 Description:
        //             </TextArea>
        //         </Form.Field>
        //         <FormField>
        //             <label>Upload your options (min. 1 option - max. 6 options)</label>
        //             <Form.Input
        //                 fluid
        //                 label="Avatar Chosen: "
        //                 placeholder="Use button below to find your avatar"
        //                 readOnly
        //                 value={image?.name} />
        //             <Button
        //                 as="label"
        //                 htmlFor="file"
        //                 type="button"
        //                 animated="fade">
        //                 <Button.Content visible>
        //                     <Icon name="file" />
        //                 </Button.Content>
        //                 <Button.Content hidden>Option 1</Button.Content>
        //             </Button>
        //             <input
        //                 type="file"
        //                 id="file"
        //                 hidden
        //                 onChange={fileChange} />
        //         </FormField>
        //         <Form.Field>
        //             <Input
        //                 type="text"
        //                 name="imageTitle"
        //                 placeholder="Image Title"
        //                 value={imageTitle}
        //                 onChange={(e) => setImageTitle(e.target.value)} />
        //         </Form.Field>
        //         <Form.Field>
        //             <Input
        //                 type="text"
        //                 name="category"
        //                 placeholder="Categories"
        //                 value={categories}
        //                 onChange={(e) => setCategories(e.target.value)} />
        //         </Form.Field>
        //         <Form.Field>
        //             <TextArea
        //                 type="text"
        //                 name="tags"
        //                 placeholder="Tags"
        //                 value={tags}
        //                 onChange={(e) => setTags(e.target.value)}>
        //                 Tags:
        //             </TextArea>
        //         </Form.Field>
        //         <Form.Field>
        //             <label>End Date</label>
        //             <input
        //                 type="date"
        //                 name="End Date"
        //                 value={endDate}
        //                 min
        //                 max="2022-12-31"
        //                 onChange={(e) => setEndDate(e.target.value)} />
        //         </Form.Field>
        //         <Button
        //             secondary
        //             type="submit">
        //             Submit
        //         </Button>
        //     </Form>
        // </div>
    // )
}

export default Create