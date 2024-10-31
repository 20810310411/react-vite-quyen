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

const UpdateUserAPI = () => {

}

const FetchAllUserAPI = () => {
    const URL_BACKEND = "/api/v1/user"
    return axios.get(URL_BACKEND)
}

export {
    CreateUserAPI, UpdateUserAPI, FetchAllUserAPI
} 