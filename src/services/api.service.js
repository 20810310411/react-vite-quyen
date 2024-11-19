import axios from "./axios.customize";

const CreateUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
      fullName : fullName,
      email : email,
      password: password,
      phone: phone
    }
    return axios.post(URL_BACKEND, data)
}

const UpdateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
      _id: _id,
      fullName : fullName,
      phone: phone
    }
    return axios.put(URL_BACKEND, data)
}

const DeleteUserAPI = (id) => {
    const URL_BACKEND = `/api/v1/user/${id}`
    return axios.delete(URL_BACKEND)
}

const FetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`
    return axios.get(URL_BACKEND)
}

const handleUploadFile = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config)
}

const UpdateUserAvatarAPI = (avatar ,_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user"
    const data = {
      _id: _id,
      avatar: avatar,
      fullName: fullName,
      phone: phone
    }
    return axios.put(URL_BACKEND, data)
}

const RegisterUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register"
    const data = {
      fullName : fullName,
      email : email,
      password: password,
      phone: phone
    }
    return axios.post(URL_BACKEND, data)
}

const LoginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login"
    const data = {
      username : email,
      password: password,
      delay: 5000
    }
    return axios.post(URL_BACKEND, data)
}

export {
    CreateUserAPI, UpdateUserAPI, DeleteUserAPI, FetchAllUserAPI, handleUploadFile, 
    UpdateUserAvatarAPI,
    RegisterUserAPI, LoginAPI

} 