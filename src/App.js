import React, {Component} from 'react';
import SettingsPage from "./component/content/settings/SettingsPage";
import {ApplyTheme} from "rambler-ui/theme";

import './App.css';
import {Route} from "react-router-dom";
import Header from "./component/layout/Header";

class App extends Component {
    render() {
        return (
            <div>
                <ApplyTheme>
                    <div>
                        <Header/>
                        <div className="content-wrapper">
                            <Route path='/' component={SettingsPage}/>
                        </div>
                    </div>
                </ApplyTheme>
            </div>
        );
    }
}

export default App;
