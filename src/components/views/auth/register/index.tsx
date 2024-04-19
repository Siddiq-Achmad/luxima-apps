import Link from "next/link";
import styles from "./register.module.scss";
import Image from 'next/image';
import { push } from "firebase/database";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const RegisterView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { push } = useRouter();
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement
        const data = {
            fullname: form.fullname.value,
            phone: form.phone.value,
            email: form.email.value,
            password: form.password.value,
        }
        const result = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if(result.status === 200) {
            form.reset();
            setIsLoading(false);
            push('/auth/login');
        }
        else{
            setIsLoading(false);
            setError('Something went wrong');
            
        }
    }

    return (
        <div className={styles.register}>
            <div className={styles.register_container}>
            <div className={styles.register_container__card}>
                        <Image
                src="/images/backgrounds/login-bg.svg"
                width={500}
                height={500}
                alt="Login BG"
                />
            </div>
            <div className={styles.register_container__card}>
            <h1>Register</h1>
            {error && <p className={styles.register_container__card__error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    
                    <h2>Personal Details</h2>
                    <div>
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" name="fullname" id="fullname"  />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" id="phone"  />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email"  />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password"  />
                    </div>
                    <div>
                        <label htmlFor="confirm_pwd">Confirm Password</label>
                        <input type="password" name="confirm_pwd" id="confirm_pwd"  />
                    </div>
                    <div><button type="submit">{isLoading ? 'Loading...' : 'Register'}</button></div>
                    
                </form>
                <div><p>Have an account? Sign in <Link href="/auth/login" className="register_container__card__link">Here</Link></p></div>
                
            </div>
            
            
            </div>
        </div>

    )
}

export default RegisterView;