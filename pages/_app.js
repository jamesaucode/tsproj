import React from "react";
import App, { Container } from "next/app";
import Notification from "../src/components/Notification/Notification";
import Router from "next/router";
import NProgress from "nprogress";
import { UserProvider } from "../src/context/UserContext";
import { ThemeProvider, createGlobalStyle } from "styled-components";

Router.events.on("routeChangeStart", url => {
  console.log(`Loading ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => {
  NProgress.done();
});
const GlobalStyle = createGlobalStyle`
a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}html{font-family:Arial,Helvetica,sans-serif}

  html {
	box-sizing: border-box;
}
* {
	box-sizing: border-box;
}
.small-icon > svg {
	height: 16px;
	box-sizing: content-box;
	/* justify-self: end; */
}
.active > svg {
	fill: blue;
}

.top-right > svg {
	position: absolute;
	top: 0;
	right: 0;
}

.main-logo {
	flex: 1;
	width: 100%;
	flex-basis: 200px;
}
.main-logo > svg {
	width: 100%;
	height: 20em;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

/* Make clicks pass-through */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: #79ff3f;

  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;

  width: 100%;
  height: 4px;
}

/* Fancy blur effect */
#nprogress .peg {
  display: block;
  position: absolute;
  right: 0px;
  width: 100px;
  height: 100%;
  box-shadow: 0 0 10px #79ff3f, 0 0 5px #79ff3f;
  opacity: 1.0;

  -webkit-transform: rotate(3deg) translate(0px, -4px);
      -ms-transform: rotate(3deg) translate(0px, -4px);
          transform: rotate(3deg) translate(0px, -4px);
}

/* Remove these to get rid of the spinner */
/* #nprogress .spinner {
  display: block;
  position: fixed;
  z-index: 1031;
  top: 15px;
  right: 15px;
}

#nprogress .spinner-icon {
  width: 18px;
  height: 18px;
  box-sizing: border-box;

  border: solid 2px transparent;
  border-top-color: #29d;
  border-left-color: #29d;
  border-radius: 50%;

  -webkit-animation: nprogress-spinner 400ms linear infinite;
          animation: nprogress-spinner 400ms linear infinite;
} */

.nprogress-custom-parent {
  overflow: hidden;
  position: relative;
}

.nprogress-custom-parent #nprogress .spinner,
.nprogress-custom-parent #nprogress .bar {
  position: absolute;
}

@-webkit-keyframes nprogress-spinner {
  0%   { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes nprogress-spinner {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

`;
const themes = {
  darkTheme: {
    mainfc: "#24292e",
    fcFade: "rgba(36, 41, 46, 0.6)",
  },
  lightTheme: {},
};

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  state = {
    mode: "darkTheme",
  };
  flipTheme = () => {
    this.setState(prevState => ({
      mode: prevState === "darkTheme" ? "lightTheme" : "darkTheme",
    }));
  };
  componentDidMount() {
    console.log("My App Mounted");
  }
  render() {
    const { Component, pageProps } = this.props;
    const { mode } = this.state;
    return (
      <Container>
        <GlobalStyle />
        <UserProvider>
          <ThemeProvider theme={themes[mode]}>
            <Notification>
              <Component {...pageProps} />
            </Notification>
          </ThemeProvider>
        </UserProvider>
      </Container>
    );
  }
}
