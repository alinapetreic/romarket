import store from "../../store";
import Router from "../../router";
import { Provider } from "react-redux";
import { APIProvider } from "@vis.gl/react-google-maps";

const App = () => {
    return (
        <Provider store={store}>
            <APIProvider apiKey='AIzaSyDLK3bBhSD5-lbUb8OFycWs4orTOXY_KDQ'>
                <Router />
            </APIProvider>
        </Provider>
    )
}

export default App;