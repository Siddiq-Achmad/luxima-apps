import Link from "next/link";
import styles from "./login.module.scss";
import Image from 'next/image';
import { push } from "firebase/database";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

const LoginView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push, query} = useRouter();
    const callbackUrl : any = query.callbackUrl || '/';
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: form.email.value,
                password: form.password.value,
                callbackUrl
            })
            if(!res?.error) {
                form.reset();
                setIsLoading(false);
                push(callbackUrl);
            }else{
                setIsLoading(false);
                setError(res.error);
            }
        } catch (error) {
            setIsLoading(false);
            setError('Something went wrong');
        }
    };

    return (
        <div className={styles.login}>
            <div className={styles.login_container}>
            <div className={styles.login_container__card}>
                        <Image
                src="/images/backgrounds/login-bg.svg"
                width={500}
                height={500}
                alt="Login BG"
                />
            </div>
            <div className={styles.login_container__card}>
            <h1>Login</h1>
            {error && <p className={styles.login_container__card__error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    
                    <h2>Please Sign In</h2>
                    
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"  />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"  />
                    </div>
                    
                    <div><button type="submit">{isLoading ? 'Loading...' : 'Login'}</button></div>
                    
                </form>
                <div><button className={styles.login_container__card__google} type="button" onClick={() => signIn('google', { callbackUrl, redirect: false })} >Login with Google</button></div>
                    
                <div><p>Don't have an account?  <Link href="/auth/register" className="login_container__card__link">Sign up</Link></p></div>
                
            </div>
            
            
            </div>
        </div>

    )
}

export default LoginView;