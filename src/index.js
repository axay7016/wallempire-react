import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import routers from './routes'
import { AnimatePresence } from "framer-motion";
import 'tw-elements';
require('dotenv')

ReactDOM.render(
    <React.StrictMode>
        <AnimatePresence>
            <Router>
                <Routes>
                    {routers.map((route) => (
                        <Route exact key={route.path} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </Router>
        </AnimatePresence>
    </React.StrictMode>,
    document.getElementById('root')
);
window.onunload = function () {
    window.scrollTo(0, 0);
};
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'P'.charCodeAt(0)) {
//         return false;
//     }
// }

// preventLongPressMenu(document.getElementsByTagName('img'));

// function preventLongPressMenu(nodes) {
//     for (var i = 0; i < nodes.length; i++) {
//         nodes[i].ontouchstart = false;
//         nodes[i].ontouchmove = false;
//         nodes[i].ontouchend = false;
//         nodes[i].ontouchcancel = false;
//     }
// }

reportWebVitals();
