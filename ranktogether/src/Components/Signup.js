import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Form, Button, Message, Dropdown, FormField, Icon, Header } from "semantic-ui-react"

function Signup() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [gender, setGender] = useState("")
    const [errors, setErrors] = useState("")
    const [avatarImage, setAvatarImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const genderOptions = [
        { key: 'Male', text: 'Male', value: 'Male' },
        { key: 'Female', text: 'Female', value: 'Female' },
        { key: 'Nonbinary', text: 'Nonbinary', value: 'Nonbinary' },
        { key: "Prefer not to answer", text: "Prefer not to answer", value: "Prefer noy to answer" }
    ]

    function handleSelectedGender(event, data) {
        setGender(data.value)
    }

    function fileChange(e) {
        setAvatarImage(e.target.files[0]);
    }


    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        const formData = new FormData();
        formData.append("avatar", avatarImage);
        formData.append("name", name)
        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("password", passwordConfirmation)
        formData.append("gender", gender)
        formData.append("date_of_birth", birthdate)
        fetch("/signup", {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: formData,
        })
            .then((r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then(() => navigate("/login"));
                } else {
                    r.json().then((err) => setErrors(err.errors));
                }
            });
    }
    return (
        <div className="login-padding">
            <Header 
                as='h2' 
                icon
                textAlign="center">
                <Icon name='user' />
                Create an Account!
            </Header>
            <div className="login-form">
                <Form onSubmit={handleSubmit} errors={errors.length == 0 ? "false" : "true"}>
                    <Form.Field>
                        <label>Name</label>
                        <input
                            type="text"
                            name="Name"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Username</label>
                        <input
                            type="text"
                            name="Username"
                            placeholder='Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input
                            type="email"
                            name="Email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input
                            type="password"
                            name="Password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Re-enter Password</label>
                        <input
                            type="password"
                            name="Password"
                            placeholder='Re-enter your password'
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </Form.Field>
                    <Form.Field>
                        <label>Birthdate</label>
                        <input
                            type="date"
                            name="Birthdate"
                            placeholder='Enter your date of birth'
                            value={birthdate}
                            min="1922-01-01"
                            max="2022-12-31"
                            onChange={(e) => setBirthdate(e.target.value)} />
                    </Form.Field>
                    <FormField>
                        <label>Upload your avatar!</label>
                        <Form.Input
                            fluid
                            label="Avatar Chosen: "
                            placeholder="Use button below to find your avatar"
                            readOnly
                            value={avatarImage?.name} />
                        <Button
                            as="label"
                            htmlFor="file"
                            type="button"
                            animated="fade">
                            <Button.Content visible>
                                <Icon name="file" />
                            </Button.Content>
                            <Button.Content hidden>Choose an Avatar</Button.Content>
                        </Button>
                        <input
                            type="file"
                            id="file"
                            hidden
                            onChange={fileChange} />
                    </FormField>
                    <Dropdown
                        placeholder='Gender'
                        fluid selection options={genderOptions}
                        onChange={(e, data) => handleSelectedGender(e, data)}
                        value={gender} />
                    {errors.length !== 0 ? (
                        <Message
                            error
                            header='Action Forbidden'
                            content={errors} />
                    ) : null}
                    <Button secondary style={{ marginTop: "20px" }} type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default Signup