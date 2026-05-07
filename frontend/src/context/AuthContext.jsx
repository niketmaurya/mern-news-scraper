import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);

    const login = (userData) => {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);
    };

    const updateBookmarks = (bookmarks = []) => {

        setUser((prevUser) => {

            if (!prevUser) {
                return prevUser;
            }

            const updatedUser = {
                ...prevUser,
                bookmarks,
            };

            localStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            return updatedUser;
        });
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                updateBookmarks,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;