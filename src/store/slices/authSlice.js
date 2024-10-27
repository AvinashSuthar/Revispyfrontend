export const createAuthSlice = (set)=>(
    {
        userInfo : undefined,
        token: localStorage.getItem('token'),
        setToken: (token)=> set({token}),
        setUserInfo: (userInfo)=> set({userInfo})
    }
)