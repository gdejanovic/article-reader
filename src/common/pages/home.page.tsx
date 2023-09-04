import { Outlet } from "react-router-dom"
import { Header } from "../partials"

interface HomePageProps { message: string, componentName: string };

export const HomePage = (props: HomePageProps) => {
    console.log(props.message + props.componentName);
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
        </div>
    )
}