import React, { useState } from "react";
import { Button, Form, Input, TextArea, FormField, Icon, Grid, Card, Header } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import CreateBoard from "../Images/CreateBoard.png"

function Create() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [options, setOptions] = useState([])
    const [category, setCategory] = useState("")
    const [endDate, setEndDate] = useState(minDate())
    const [errors, setErrors] = useState("")
    const [tags, setTags] = useState("")
    const navigate = useNavigate();

    function fileChange(e) {
        // setOptions(e.target.files[0]);
        const optionsCount = options.length + e.target.files.length
        if (optionsCount > 6) {
            alert("MAX options is 6!");
            return null;
        }
        const uploadOptions = [...e.target.files].map(file => {
            return { name: file.name, option_image: file }
        })
        setOptions([...options, ...uploadOptions])
    }

    function handleOptionNameChange(e, idx) {
        const optionsCopyArray = [...options]
        const optionsCopyObj = { ...optionsCopyArray[idx] }
        optionsCopyObj.name = e.target.value
        optionsCopyArray[idx] = optionsCopyObj
        setOptions(optionsCopyArray)
    }

    function removeOption(e, idx) {
        const optionsCopyArray = [...options]
        optionsCopyArray.splice(idx, 1)
        setOptions(optionsCopyArray)
    }

    function minDate() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const day = ('0' + currentDate.getDate()).slice(-2)
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
        const year = currentDate.getFullYear()
        return `${year}-${month}-${day}`
    }

    function maxDate() {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 14);
        const day = ('0' + currentDate.getDate()).slice(-2)
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2)
        const year = currentDate.getFullYear()
        return `${year}-${month}-${day}`
    }

    function handleCreateBoard(e) {
        e.preventDefault();
        if (options.length < 2) {
            alert("Not enough options, min 2");
            return;
        }
        setErrors([]);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description)
        // formData.append("options", options)
        formData.append("category", category)
        formData.append("end_date", endDate)
        const tagsArray = tags.split(",").map(tag => {
            formData.append("tags[]", tag.trim())
        })
        options.map((option, idx) => {
            formData.append(`options[]name`, option.name)
            formData.append(`options[]option_image`, option.option_image)
        })
        fetch("/boards", {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: formData,
        })
            .then(data => data.json())
            .then(data => {
                navigate(`/board/${data.id}`)
            })
    }

    return (
        <div className="create-form">
            <img
                src={CreateBoard}
                alt="CreateBoard"
                className="create-board" />
            <Form onSubmit={handleCreateBoard}>
                <Form.Field>
                    <label>Title</label>
                    <Input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Description</label>
                    <TextArea
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </Form.Field>
                <div className="options-container">
                    <Grid>
                        <Grid.Row
                            columns={3}>
                            {options.map((option, idx) => {
                                return (
                                    <Grid.Column
                                        key={idx}>
                                        <Card>
                                            <div className="card-img-container">
                                                <div className="option-delete-btn">
                                                    <Button
                                                        circular
                                                        icon='delete'
                                                        onClick={(e) => removeOption(e, idx)} />
                                                </div>

                                                <img
                                                    className="card-img"
                                                    src={URL.createObjectURL(option.option_image)} />
                                            </div>
                                            <Card.Content>
                                                <Card.Header>
                                                    <Input
                                                        value={option.name}
                                                        size="large"
                                                        placeholder='Option Title'
                                                        onChange={(e) => handleOptionNameChange(e, idx)} />
                                                </Card.Header>
                                            </Card.Content>
                                        </Card>
                                    </Grid.Column>
                                )
                            })}
                        </Grid.Row>
                    </Grid>
                </div>
                <FormField>
                    <label>Upload your options (min. 2 options - max. 6 options)</label>
                    <Button
                        as="label"
                        htmlFor="file"
                        type="button"
                        animated="fade">
                        <Button.Content visible>
                            <Icon name="file" />
                        </Button.Content>
                        <Button.Content hidden>Upload Options!</Button.Content>
                    </Button>
                    <input
                        multiple="multiple"
                        type="file"
                        id="file"
                        hidden
                        onChange={fileChange} />
                </FormField>
                <Form.Field>
                    <label>Category</label>
                    <Input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Tags</label>
                    <TextArea
                        type="text"
                        name="tags"
                        placeholder="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>End Date</label>
                    <input
                        type="date"
                        name="End Date"
                        value={endDate}
                        min={minDate()}
                        max={maxDate()}
                        onChange={(e) => setEndDate(e.target.value)} />
                </Form.Field>
                <Button
                    secondary
                    type="submit">
                    Create Board!
                </Button>
            </Form >
        </div >
    )
}

export default Create