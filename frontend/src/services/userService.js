import HttpService from './HttpService'

export default {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getUser
}
async function signup(userCred) {
    const user = await HttpService.post('auth/signup', userCred)
    console.log('got to userService signup',user);
    return _handleLogin(user)
}
async function login(userCred) {
    const user = await HttpService.post('auth/login', userCred)
    return _handleLogin(user)
}

async function logout() {
    await HttpService.post('auth/logout');
    sessionStorage.clear();
}

function getUsers() {
    return HttpService.get('users')
}

function getById(userId) {
    return HttpService.get(`user/${userId}`)
}
function remove(userId) {
    return HttpService.delete(`user/${userId}`)
}

function update(user) {
    return HttpService.put(`user/${user._id}`, user)
}

function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    return user;
}

function getUser( defaultValue = {_id:'guest'}) {
    var user=sessionStorage['user']
    if(!user) return defaultValue;
    return JSON.parse(user)
}

