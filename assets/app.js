import React from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./js/contexts/TodoContext";
import TodoTable from "./js/components/TodoTable";
import {CssBaseline} from "@material-ui/core";

class App extends React.Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                </CssBaseline>
            </TodoContextProvider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));