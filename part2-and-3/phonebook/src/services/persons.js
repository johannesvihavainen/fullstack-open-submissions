import axios from "axios"

const baseUrl = 'https://phonebook-backend-nameless-bush-5256.fly.dev/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

export default {
    getAll,
    create,
    update,
    remove
}

