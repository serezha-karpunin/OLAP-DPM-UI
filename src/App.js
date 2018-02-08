import React, {Component} from 'react';
import {ApplyTheme} from "rambler-ui/theme";

import './App.css';
import {Route, Switch} from 'react-router-dom';
import Header from "./component/layout/Header";
import MainPage from "./component/content/settings/MainPage";
import SettingsPage from "./component/content/settings/SettingsPage";

class App extends Component {
    render() {
        return (
            <div>
                <ApplyTheme>
                    <div className="app-wrapper">
                        <Header/>
                        <div className="app-content">
                            <Switch>
                                <Route exact path='/' component={MainPage}/>
                                <Route path='/settings' component={SettingsPage}/>
                            </Switch>
                        </div>
                    </div>
                </ApplyTheme>
            </div>
        );
    }
}

export default App;
