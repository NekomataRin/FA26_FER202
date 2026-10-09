import { useFormik } from 'formik';

import {
    Container, Stack, TextField, Button, Select, MenuItem, FormControl,
    InputLabel, FormControlLabel, Switch
} from '@mui/material';

const programList = [
    { id: 0, value: "Please select" },
    { id: 1, value: "Software Engineering" },
    { id: 2, value: "Information System" },
    { id: 3, value: "Information Assurance" },
    { id: 4, value: "Internet of Things" },
    { id: 5, value: "Artificial Intelligence" },
    { id: 6, value: "Digital Art & Design" }
];

function setMenu() {
    return (
        <>
            <MenuItem value={0}>
                <em>Please select</em>
            </MenuItem>
            {programList
                .filter(e => e.id !== 0)
                .map(e => (
                    <MenuItem key={e.id} value={e.id}>{e.value}</MenuItem>
                ))}
        </>
    );
}

export default function Contact() {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            phone: "",
            program: 0,
            message: "",
            agree: false
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        },
    });

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                    <TextField
                        label="Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        label="Phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                    />

                    <FormControl>
                        <InputLabel id="program-label">Program of Study</InputLabel>
                        <Select
                            labelId="program-label"
                            id="program"
                            label="Program of Study"
                            name="program"
                            value={formik.values.program}
                            onChange={formik.handleChange}
                        >
                            {setMenu()}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formik.values.message}
                        onChange={formik.handleChange}
                    />

                    <FormControlLabel
                        control={
                            <Switch
                                name="agree"
                                checked={formik.values.agree}
                                onChange={formik.handleChange}
                            />
                        }
                        label="Agree to terms and conditions."
                    />

                    <Button type="submit" variant="contained">
                        Send
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}