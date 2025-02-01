import Home from '../pages/home';
import Global from '../pages/global';
import PrivacyPolicy from '../pages/privacy-policy';
import {
    Route,
    Routes,
    BrowserRouter
} from 'react-router-dom';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Global />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;