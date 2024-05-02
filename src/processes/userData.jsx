import Cookies from "universal-cookie";
export let developement = false;
export var isAdminLoggedIn = false;
export var isSuperAdminLoggedIn = false;
export var loginUser;
export var studentUser;

export var setStudentUser = (value) => {
    studentUser = value;
};

export const setIsAdminLoggedIn = (TorF) => {
    isAdminLoggedIn = TorF;
};

export const setIsSuperAdminLoggedIn = (TorF) => {
    isSuperAdminLoggedIn = TorF;
};

export const setData = (value) => {
    loginUser = value;
};
export const LoginOrNot = async () => {
    const cookie = new Cookies();

    const optionsForFetching = {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },

        body: JSON.stringify({
            token: cookie.get("Token") ? cookie.get("Token") : "",
        }),
    };

    try {
        const res = await fetch(
            developement ? "http://localhost:5000/getData" : "/getData",
            optionsForFetching
        );

        const data = await res.json();

        if (data.status !== 200) {
            throw Error;
        }
        setIsAdminLoggedIn(true);
        loginUser = data.data;
        return true;
    } catch (error) {
        return false;
    }
};
