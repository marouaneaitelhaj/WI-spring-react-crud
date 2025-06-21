import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import { register as _register } from "../store/authSlice";

interface RegisterFormData {
    username: string;
    password: string;
}

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>();

    const onSubmit = async (data: RegisterFormData) => {
        dispatch(_register(data))
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                    <h1 className="text-2xl font-bold text-white">Register</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                            Username *
                        </label>
                        <input
                            type="text"
                            id="username"
                            {...register("username", { required: "Username is required" })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                errors.username ? "border-red-300" : "border-slate-300"
                            }`}
                            placeholder="Enter your username"
                        />
                        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                            Password *
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register("password", { required: "Password is required" })}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                                errors.password ? "border-red-300" : "border-slate-300"
                            }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                    </div>
                    <div className="flex space-x-4 pt-6 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Logging in..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
