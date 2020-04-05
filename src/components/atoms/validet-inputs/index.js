import React from 'react';

export const validatePassword = (password) => {
    const passwordPattern = /[^\s]{6,}$/;
    return passwordPattern.test(password);
}
export const validateEmail = (email) => {
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
}
export const validateLastName = (lastName) => {
    const namePattern = /^[a-zA-Z]{3,}$/;
    return namePattern.test(lastName);
}
export const validateFirstName = (firstName) => {
    const namePattern = /^[a-zA-Z]{3,}$/;
    return namePattern.test(firstName);
}
export const validateName = (firstName) => {
    const namePattern = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]{3,}$/;
    return namePattern.test(firstName);
}
