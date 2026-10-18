import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbBrandWhatsappFilled } from "react-icons/tb";
import axios from "axios";
import { BASEURL } from "../main";
import { RiWhatsappLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userSlice";
import { HiEye } from "react-icons/hi2";
import { RiEyeCloseFill } from "react-icons/ri";


export default function SignupPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [passShow, setPassShow] = useState(false)




    const handleChange = (ev) => {
        setFormData((prev) => ({
            ...prev,
            [ev.target.name]: ev.target.value
        }));
    };

    const handleSignup = async (ev) => {
        ev.preventDefault();
        
        if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
            setError("All fields are required.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                `${BASEURL}/api/auth/register-user`,
                {
                    name: formData.name.trim(),
                    email: formData.email.trim().toLowerCase(),
                    password: formData.password
                },
                { withCredentials: true }
            );

            if (response.data.success) {
                dispatch(setUserData(response.data?.data));
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-sky-800 relative px-4 py-8">
            <div className="absolute top-0 left-0 w-full h-1/3 bg-sky-700 -z-10 border-b border-sky-800" />

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-sky-100/30">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-sky-700 rounded-full flex items-center justify-center mb-4 shadow-2xl shadow-sky-100 border border-sky-200">
                        <RiWhatsappLine size={42} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-sky-700">Say Hai to Wassup</h2>
                    <p className="text-xl text-sky-700 font-semibold mt-1 text-center">
                        
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup} className="space-y-4">
                    {/* Full Name Input */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Sarah"
                            minLength={3}
                            maxLength={25}
                            required
                            className="w-full px-4 py-3 text-slate-800 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white rounded-xl focus:ring-4 focus:ring-sky-100 transition-all outline-none text-base"
                        />
                    </div>

                    {/* Email Input */}
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="sarah@example.com"
                            required
                            className="w-full px-4 py-3 text-slate-800 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white rounded-xl focus:ring-4 focus:ring-sky-100 transition-all outline-none text-base"
                        />
                    </div>

                 {/* Password Input with Eye Toggle */}
            <div>
           <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Password
           </label>
         <div className="relative">
            <input
               type={passShow ? "text" : "password"}
               name="password"
               value={formData.password}
               onChange={handleChange}
               placeholder="Enter password"
               required
               className="w-full pl-4 pr-11 py-3 text-slate-800 bg-slate-50 border border-slate-200 focus:border-sky-500 focus:bg-white rounded-xl focus:ring-4 focus:ring-sky-100 transition-all outline-none text-base"
        />
             <button type="button"
                onClick={() => setPassShow((prev) => !prev)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 transition-colors cursor-pointer "
                >
                 {passShow ? <RiEyeCloseFill className="text-sky-600" size={20} /> : <HiEye className="text-sky-600"  size={20} />}
             </button>      
        </div>
    </div>

                    <button
                        type="submit"
                        disabled={loading || !formData.email.trim() || !formData.password || !formData.name.trim()}
                        className={`w-full py-3.5 rounded-xl text-white font-semibold tracking-wide transition-all mt-3 ${
                            loading || !formData.email.trim() || !formData.password || !formData.name.trim()
                                ? "bg-slate-300 cursor-not-allowed"
                                : "bg-sky-600 hover:bg-sky-700 active:scale-[0.98] shadow-md shadow-sky-600/20"
                        }`}
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs font-semibold text-slate-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold text-sky-600 hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}