import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { store } from '@redux/configure-store';
import { MainPage } from './pages';
import { AuthorizationLayout } from './layouts/authorization-layout/authorization-layout';
import { Layout } from './layouts/layout';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';
import './index.variables.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/auth' element={<AuthorizationLayout />}></Route>
                    </Route>
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>,
);
