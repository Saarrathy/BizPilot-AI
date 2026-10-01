
import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

import {
    Typography,
    Paper,
    TextField,
    Button,
    Box,
    Avatar
} from "@mui/material";


export default function Profile() {

    const [profile, setProfile] = useState({
        username: "",
        email: ""
    });


    const [loading, setLoading] = useState(false);



    // Get profile data

    useEffect(() => {

        fetchProfile();

    }, []);



    const fetchProfile = async () => {

        try {

            const response = await api.get("/profile/");

            setProfile(response.data);

        }
        catch(error){

            console.log(error);

        }

    };



    const handleChange = (e) => {

        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });

    };



    const updateProfile = async () => {

        try {

            setLoading(true);


            await api.put(
                "/profile/",
                profile
            );


            alert("Profile updated successfully");


        }
        catch(error){

            console.log(error);

            alert("Update failed");

        }
        finally{

            setLoading(false);

        }

    };



    return (

        <MainLayout>

            <Typography variant="h3" gutterBottom>
                👤 Profile
            </Typography>


            <Paper
                sx={{
                    p:4,
                    maxWidth:500
                }}
            >

                <Box
                    sx={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        gap:2
                    }}
                >

                    <Avatar
                        sx={{
                            width:90,
                            height:90
                        }}
                    >
                        {profile.username?.charAt(0)}
                    </Avatar>


                    <TextField
                        fullWidth
                        label="Username"
                        name="username"
                        value={profile.username}
                        onChange={handleChange}
                    />


                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                    />


                    <Button
                        variant="contained"
                        onClick={updateProfile}
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </Button>


                </Box>


            </Paper>


        </MainLayout>

    );
}