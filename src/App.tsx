import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostsPage, PostPage, HomePage } from './common/';
import './assets/scss/index.scss';

const App = () => {
    const message = 'Hello From ';

    return (
        <div className='main' title='Yoda article reader'>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <HomePage message={message} componentName="HomePage" /> // didn't create any content for the home page
                        }
                    >
                        <Route path="/posts" element={<PostsPage message={message} componentName="PostsPage"/>} />
                        <Route path="/post/:id" element={<PostPage message={message} componentName="PostPage"/>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
