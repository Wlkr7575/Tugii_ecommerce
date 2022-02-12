import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { BrowserRouter,Routes as Switch,Route } from 'react-router-dom'
import {Provider} from 'react-redux'
import theme from './styles/theme'
import store from './store'
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
        <Body/>
    </ThemeProvider>
    </Provider>
    </BrowserRouter>
  );
}
function Body() {
  return(
    <Switch>
          <Route path="/"  element={<div>hi</div>}/>
            <Route path="/signin"  element={<div>hi</div>}/>
            <Route path="/signup"  element={<div>hi</div>}/>
            <Route path="/detail/:id"  element={<div>hi</div>}/>
            <Route path="/search"  element={<div>hi</div>}/>
            <Route path="/categories"  element={<div>hi</div>}/>
            <Route path="/list" element={<div>hi</div>}/>
            <Route path="/profile" element={<div>hi</div>}/>
            <Route path="/myCart" element={<div>hi</div>}/>
    </Switch>
  )
}
export default App;
