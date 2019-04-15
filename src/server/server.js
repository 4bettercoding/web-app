import React from "react";
import { Provider } from "react-redux";
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import configureStore from "../shared/configureStore";
import App from "../shared/app";
import "source-map-support/register";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

require('babel-register')({
    presets: [ 'es2015' ]
});

// app.get("*", (req, res) => {
//     res.send("This is not rendering HTML!");
// });

app.use(express.static("build/public"));


app.get("*", (req, res, next) => {
    console.log("1. In server after invoking from URL", req.url);
    debugger;
    const store = configureStore();
    const promises = routes.reduce((acc, route) => {
        if (
            matchPath(req.url, route) &&
            route.component &&
            route.component.initialData
        ) {
            // console.log("Value of route", route);
            // console.log("Value of initial data", route.component.initialData());
            acc.push(
                Promise.resolve(store.dispatch(route.component.initialData())).catch(
                    e => {
                        console.log("Error in promise on server side", e);
                    }
                )
            );

            //  console.log("Value of route", route);
            // console.log("Value of initial data", route.component);
            acc.push(Promise.resolve(store.dispatch(route.component.initialData())));
        }
        return acc;
    }, []);

    Promise.all(promises)
        .then(() => {
            const context = {};
            debugger;
            const markup = ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App />
                    </StaticRouter>
                </Provider>
            );

            const initialData = store.getState();
            console.log("2.  Set value of initialData", initialData);

            // console.log("markup", markup);
            res.send(`
                <!DOCTYPE html>
                <html>
                  <head>
                    <basehref="/">
                    <title></title>
                    <link rel="stylesheet" href="app.css">
                  </head>

                  <body>
                    <div id="root">${markup}</div>
                     <script src="client_bundle.js"></script>
                     <!--<script src="/reload/reload.js"></script>-->
                    <script>window.__initialData__ = ${serialize(initialData)}</script>
                  </body>
                </html>
              `);
        })
        .catch(e => {
            debugger;
            console.log("Error in promise", e);
        });
});


app.listen(PORT, () => {
    console.log("App running", PORT);
    console.log('Value of ENV', process.env.NODE_ENV)
});
