import React, {Component} from 'react'
import {Tabs, TabsItem} from 'rambler-ui/Tabs'
import {H1, H2} from 'rambler-ui/Typography';
import {NavLink, Route, Switch} from 'react-router-dom';
import XmlSchemaSettings from "./XmlSchemaSettings";
import MdxQuerySettings from "./MdxQuerySettings";

export default class SettingsPage extends Component {
    render() {
        return (
            <div>
                <H2>Settings</H2>
                <div>
                    <Tabs size='medium'>
                        <TabsItem container={ <NavLink to='/schema'/> }>XML schema</TabsItem>
                        <TabsItem container={ <NavLink to='/mdx'/> }>MDX query</TabsItem>
                    </Tabs>
                    <div className="tab-content">
                        <Switch>
                            <Route path="/schema" component={XmlSchemaSettings}/>
                            <Route path='/mdx' component={MdxQuerySettings}/>
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
