import React from 'react'
import ApiContext from './ApiContext'

const ApiState = (props) => {

    const backendHost = process.env.BACKEND ?? "http://localhost:5000"
    
    

    return (
        <ApiContext.Provider value={{
            backendHost
        }}>
            {props?.children}
        </ApiContext.Provider>
    )
}

export default ApiState