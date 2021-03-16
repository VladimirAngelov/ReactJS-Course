import React, {useState, createContext} from 'react';

export const Context = createContext();

export const Store = (props) => {
    const [user, setUser] = useState({
        _id: '',
        username: ''
    })

    return (
        <Context.Provider value={[user, setUser]}>
            {props.children}
        </Context.Provider>
    )
}