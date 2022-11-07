import  React, { useState } from "react";
import { Grid, TextField, Stack, Button, InputLabel, Card } from '@mui/material';
import Home from "../Home/Home.tsx";

const Login = (props: {onLogin?: (val:boolean) => void}) => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [toast, setToast] = useState<string>({userName: '', password: '', invalid: ''});
    const [submitClick, setSubmitClick] = useState<boolean>(false);
    const [showHomePage, setShowHomePage] = useState<boolean>(false);
    
    const credentials = [
        {
            user: 'SwathiKolli',
            password: 'Password@123'
        },
        {
            user: 'User1',
            password: 'Password'
        },
        {
            user: 'User2',
            password: 'Password'
        }
    ]
    const validateCredentials = (userName:string, password:string) => {
        return credentials.map((obj:any) => {
            return obj.user === userName && obj.password === password ? true : false; 
        })

    }
    const handleSubmit = () => {
        setSubmitClick(true);
        if(validateCredentials(userName, password).includes(true)) {
            setToast({...toast}) 
            setUserName('');
            setPassword('');
            setSubmitClick(false);
            setShowHomePage(true)
            if(props.onLogin) props.onLogin(true);
        }
        else {
            if(userName !== '' && password !== '')
            setToast({...toast, invalid:'Invalid Credentials'})
            if(props.onLogin) props.onLogin(false);
            
        }
        setTimeout(function () {
			setToast({...toast, invalid:''});
		}, 5000);
    };
    
    return (<>
        <Card style={{height: '40%', width: '70%', marginLeft: '14%', marginTop: '5%'}}>
        <h3>Login</h3>
        <Stack direction='column' spacing={2} ml={57} mr={55} mb={2}>
            <Grid item sm={3} >
            <InputLabel>User Name</InputLabel>
                <TextField
                    fullWidth
                    id='username'
                    placeholder='Enter User Name or email'
                    variant='outlined'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                {
                submitClick && userName === '' ? <h5 style={{color: 'red'}}>Please enter the user name</h5> : null
                }

            </Grid>
            <Grid item sm={3}>
            <InputLabel>Password</InputLabel>
            
                <TextField
                    fullWidth
                    id='password'
                    placeholder='Enter Password'
                    variant='outlined'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {
                submitClick && password === '' ? <h5 style={{color: 'red'}}>Please enter the password</h5> : null
                }

            </Grid>
            <Grid item sm={3}>
            <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </Grid>
        </Stack>
        {
            toast.invalid !== '' ? <h5 style={{color: 'red'}}>{toast.invalid}</h5> : null
        }
        
        </Card>
    </>)
};

export default Login;