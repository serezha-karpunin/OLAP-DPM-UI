import React, {Component} from 'react';
import SettingsPage from "./component/SettingsPage";
import {ApplyTheme} from "rambler-ui/theme";

import './App.css';
import {Route} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <ApplyTheme>
                    <div>
                        <Route path='/' component={SettingsPage}/>
                    </div>
                </ApplyTheme>
            </div>
        );
    }
}

export default App;
