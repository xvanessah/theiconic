import React from "react";
import { renderToString } from "react-dom/server";
import { BrowserRouter, StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import App from "./ProductsApp";

export default (initialProps, context) => {
  let Router;

  if (context.serverSide) {
    const renderedHtml = {
      componentHtml: renderToString(
        <StaticRouter
          basename={context.base}
          location={context.location}
          context={{}}
        >
          <App initialProps={initialProps} appContext={context} />
        </StaticRouter>
      ),
      title: Helmet.renderStatic().title.toString()
    };
    return { renderedHtml };
  } else {
    return (
      <BrowserRouter basename={context.base}>
        <App initialProps={initialProps} appContext={context} />
      </BrowserRouter>
    );
  }
};