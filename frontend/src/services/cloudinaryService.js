import axios from "axios";

export function uploadImg(ev) {
    const CLOUD_NAME = 'dgyto5jgr'; // find it in your cloudinary account (main page)
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append('file', ev.target.files[0]);
    formData.append('upload_preset', 'b7gd0ytf'); // second parameter is the upload preset (you can find it in cloudinary settings)

    return axios.post(UPLOAD_URL,formData)
        // .then(res => res.json())
        .then(res => res.data)
        .then(res => {
            return res.url;
        })
        .catch(err => console.error(err))//syntax?
} 
