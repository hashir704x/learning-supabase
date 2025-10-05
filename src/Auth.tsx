import { useState } from "react";
import { supabase } from "./supabaseClient";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedOp, setSelectedOp] = useState<"login" | "signup">("login");
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (selectedOp === "signup") {
            const response = await supabase.auth.signUp({
                email: email,
                password: password,
            });
            console.log(response);
        } else {
            const response = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            console.log(response);
        }
    }    

    return (
        <div className="container">
            <h2>{selectedOp === "login" ? "Login" : "Signup"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>

            <button
                onClick={() => {
                    if (selectedOp === "login") setSelectedOp("signup");
                    else setSelectedOp("login");
                }}
            >
                {selectedOp === "login" ? "Switch to signup" : "Switch to login"}
            </button>
        </div>
    );
};

export default Auth;
