import Link from "next/link"
import { Button } from "../ui/button";

const Header = () => {
    return (
        <div className="w-full">
            <div>
                Logo
            </div>
            <nav>
                <ul>
                    <li><a href="/features">How it Works</a></li>
                    <li><a href="/about">Features</a></li>
                    <li><a href="/blog">Pricing</a></li>
                    <li><a href="/blog">Blog</a></li>
                </ul>
            </nav>
            <Button
                title="Get Started"
            />
        </div>
    )
}

export default Header;