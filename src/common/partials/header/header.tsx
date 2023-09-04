import { appRoutes } from '../../constants/app.navigation.routes';
import { Link } from 'react-router-dom';
import './header.scss';

export const Header = () => {

    const navigation = appRoutes.map((route) => (
        <li className='menu-item' key={route.path}>
            <Link to={route.path}>{route.title}</Link>
        </li>
    ));

    return (
        <div className="header navigation">
            <div className="nav">
                <ul className='nav-menu'>
                    {navigation}
                </ul>
            </div>
        </div>
    );
};