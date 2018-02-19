import React, {Component} from 'react'
import {H2} from 'rambler-ui/Typography';
import XmlSchemaSettings from "./schema/XmlSchemaSettings";

export default class SettingsPage extends Component {
    render() {
        return (
            <div>
                <H2>Settings</H2>
                <div>
                    <XmlSchemaSettings/>
                </div>
            </div>
        );
    }
}


/*
 <Tabs size='medium'>
 <TabsItem container={ <NavLink to='/schema'/> }>XML schema</TabsItem>
 <TabsItem container={ <NavLink to='/mdx'/> }>MDX query</TabsItem>
 </Tabs>
 <div className="tab-content">
 <Switch>
 <Route path="/schema" component={XmlSchemaSettings}/>
 </Switch>
 </div>
 */