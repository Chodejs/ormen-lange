import { useToast } from "../context/ToastContext";

export default function Contact() {

     const { addToast } = useToast();

    
    return (
        <section>
            <h1>Get in Touch</h1>
            <p>Don't be shy, say hello.</p>
            <button onClick={() => {addToast('Welcome to the show!', 'success');}}>Click me</button>
        </section>
    );
}