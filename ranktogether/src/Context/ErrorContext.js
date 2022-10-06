import React from "react";

export const ErrorContext = React.createContext({ 
    isErrorShown: false,
    errorList: [],
    handleShowError: () => {},
    setErrorList: () => {}
});