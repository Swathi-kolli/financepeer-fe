import { TextField, Button, Card, Table, TableContainer, TableHead, TableRow, TableBody } from "@mui/material";
import React, { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import TableCell from "@mui/material/TableCell/TableCell";
import Paper from '@mui/material/Paper';



const Home = (props: { onLogout?: (val: boolean) => void }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [fileData, setFileData] = React.useState<any>([]);
    const [toast, setToast] = React.useState<string>('');
    const [columnDefs, setColumnDefs] = useState([
        { headerName: 'ID', field: 'id' },
        { headerName: 'User Id', field: 'userId' },
        { headerName: 'Title', field: 'title' },
        { headerName: 'Description', field: 'body' },
    ]);



    function handleUploadButton() {
        if (inputRef.current != null) {
            inputRef.current.click();
        }
    }

    function addFileData(data) {
        fetch('https://ea74-49-204-228-163.ngrok.io/api/v1/users/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log("json", data);
                setFileData(data)
            })
    }

    function handleUpload(event: any) {
        console.log("event", event)
        setToast('')
        const uploadedFile = event.target.files[0];
        if (uploadedFile.type !== 'application/json') setToast("Upload only json type");
        else {
            const fileReader = new FileReader();
            fileReader.readAsText(uploadedFile, "UTF-8");
            fileReader.onload = (e: any) => {
                console.log("e.target.result", e.target.result);
                addFileData(JSON.parse(e.target.result))
            }
        }
    }

    const handleLogout = () => {
        if (props.onLogout) props.onLogout(false);
    }
    return (
        <>
            <Card style={{ height: '40%', width: '70%', marginLeft: '14%', marginTop: '5%' }}>
                <input ref={inputRef} id='selectImage' hidden accept="application/json" type="file" onChange={handleUpload} />
                <Button variant='outlined' style={{ marginTop: '10px' }} className='local-upload-label' onClick={handleUploadButton}>
                    Upload File
			</Button>
                <br />
                <br />
                <Button variant="contained" style={{ marginBottom: '10px' }} onClick={() => handleLogout()}>Log Out</Button>
                <br />
            </Card>            

            {

                fileData.length > 0 ?
                    <>
                        <h4 style={{color: 'orange'}}>{'Then uploaded data is'}</h4>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550, height: '100%', width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="right">User Id</TableCell>
                                        <TableCell align="left">Title</TableCell>
                                        <TableCell >Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {fileData.map((row) => (
                                        <TableRow
                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{row.id}</TableCell>
                                            <TableCell align="right">{row.userId}</TableCell>
                                            <TableCell align="right">{row.title}</TableCell>
                                            <TableCell align="right">{row.body}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    : toast !== '' ? <h5 style={{ color: 'red' }}>{toast}</h5> : null

            }
        </>
    )
};

export default Home;