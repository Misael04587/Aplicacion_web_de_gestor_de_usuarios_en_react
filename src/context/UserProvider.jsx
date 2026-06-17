import {useState} from "react";
import UserContext from "./usercontext";

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        name: "Misael Santana",
        email: "franklinmisaelsantanamora045@gmail.com",
        phone: "809-123-4567",
        city: "Santo Domingo",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;