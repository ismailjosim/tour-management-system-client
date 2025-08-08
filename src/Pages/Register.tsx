import { Link } from "react-router";
import logoBlack from "@/assets/icons/logo.png"
import logoWhile from "@/assets/images/site-logo.png"
import registerBG from "@/assets/images/register.jpg"
import { useTheme } from "../hooks/useTheme";
import { RegisterForm } from "../components/modules/Auth/RegisterForm";


const Register = () => {
    const { theme } = useTheme()
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <img
                    src={registerBG}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] "
                />
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-end">
                    <Link to='/' className="flex items-center  gap-2 font-medium">
                        <img src={theme === 'dark' ? logoWhile : logoBlack} alt="Site logo" />
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <RegisterForm />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;
