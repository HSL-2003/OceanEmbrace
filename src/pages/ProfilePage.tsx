import React, { useEffect, useState } from 'react'
import './ProfilePage.css'
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [file, setFile] = useState<File>()
    const [imageString, setImageString] = useState<string>('');
    const token = window.localStorage.getItem("token")
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : null);

    const firebaseConfig = {
        apiKey: "AIzaSyDOJ8_qN797WsNlY0Ski8HuvrcXjI4q-BI",
        authDomain: "aoro-duclnh.firebaseapp.com",
        projectId: "aoro-duclnh",
        storageBucket: "aoro-duclnh.appspot.com",
        messagingSenderId: "698754258333",
        appId: "1:698754258333:web:4c303ddbd3cea8d7e44b74",
        measurementId: "G-D01P81RWYX"
    };


    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    useEffect(() => {
        if (user !== null) {
            setEmail(user.emailAddress)
            setFullName(user.fullName)
            setImageString(user.avatar)
        }
    }, [])

    const handlerUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const avatarString = file !== null ? await uploadImageToFirebase() : ""
            console.log(avatarString)
            const data = {
                fullName: fullName,
                emailAddress: email,
                avatar: avatarString
            };
            const response = await axios.put(
                'http://poserdungeon.myddns.me:5000/profile',
                data,
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        "Authorization": "Bearer " + token
                    }
                }
            );
            if (response.status === 200) {
                toast.success("Update profile successful")
                setUser({
                    fullName: response.data.fullName,
                    emailAddress: response.data.emailAddress,
                    avatar: response.data.avatar
                });
                window.localStorage.setItem("user", JSON.stringify({
                    fullName: response.data.fullName,
                    emailAddress: response.data.emailAddress,
                    avatar: response.data.avatar
                }));
            } else {
                toast.error("Update profile fail")
            }
        } catch (error) {
            console.log(error)
            toast.error("Update profile fail")
        }

    }

    const uploadImageToFirebase = async () => {
        if (file == undefined) {
            return
        }
        try {
            const timestamp = Date.now();
            const imageRef = ref(storage, `images/${timestamp}_${file.name}`);
            await uploadBytes(imageRef, file);
            const url = await getDownloadURL(imageRef);
            return url;
        } catch (error) {
            console.log(error)
            toast.error("Lỗi upload ảnh lên firebase")
        }
        return ""
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files !== null && files[0]) {
            setImageString(URL.createObjectURL(files[0]))
            setFile(files[0])
        }
    }

    return (
        <div className="update-page">
            <div className="update-form">
                <h2>Cập nhật thông tin cá nhân</h2>
                <form onSubmit={handlerUpdate}>
                    <div className="form-group">
                        <label>Avatar</label>
                        <div className="avatar-upload">
                            <img
                                src={imageString || '/vongco.jpg'}
                                alt="avatar"
                                className="avatar"
                            />
                            <label className="change-avatar-btn" htmlFor="file">Thay đổi ảnh</label>
                            <input
                                type="file"
                                id="file"
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Họ và Tên</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn-submit" type="submit">Cập nhật</button>
                </form>
            </div>
        </div>
    )
}
