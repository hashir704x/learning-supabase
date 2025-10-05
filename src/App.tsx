import { useEffect, useState } from "react";
import Auth from "./Auth";
import { supabase } from "./supabaseClient";
import { type User } from "@supabase/supabase-js";
import Tasks from "./Tasks";
const App = () => {
    const [userData, setUserData] = useState<User | undefined>();
    useEffect(() => {
        const authState = supabase.auth.onAuthStateChange(function (event, session) {
            console.log("Listner run", event);
            setUserData(session?.user);
        });

        return function () {
            authState.data.subscription.unsubscribe();
        };
    }, []);
    return <div>{userData ? <Tasks /> : <Auth />}</div>;
};

export default App;
