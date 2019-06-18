
// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// // nodejs library to set properties for components
// import { PropTypes } from "prop-types";

// // javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";

// // reactstrap components
// import { Nav } from "reactstrap";

// var ps;

// class Sidebar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.activeRoute.bind(this);
//   }
//   // verifies if routeName is the one active (in browser input)
//   activeRoute(routeName) {
//     return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
//   }
//   componentDidMount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps = new PerfectScrollbar(this.refs.sidebar, {
//         suppressScrollX: true,
//         suppressScrollY: false
//       });
//     }
//   }
//   componentWillUnmount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps.destroy();
//     }
//   }
//   linkOnClick = () => {
//     document.documentElement.classList.remove("nav-open");
//   };
//   render() {
//     const { bgColor, routes, rtlActive, logo } = this.props;
//     let logoImg = null;
//     let logoText = null;
//     if (logo !== undefined) {
//       if (logo.outterLink !== undefined) {
//         logoImg = (
//           <a
//             href={logo.outterLink}
//             className="simple-text logo-mini"
//             target="_blank"
//             onClick={this.props.toggleSidebar}
//           >
//             <div className="logo-img">
//               <img src={logo.imgSrc} alt="react-logo" />
//             </div>
//           </a>
//         );
//         logoText = (
//           <a
//             href={logo.outterLink}
//             className="simple-text logo-normal"
//             target="_blank"
//             onClick={this.props.toggleSidebar}
//           >
//             {logo.text}
//           </a>
//         );
//       } else {
//         logoImg = (
//           <Link
//             to={logo.innerLink}
//             className="simple-text logo-mini"
//             onClick={this.props.toggleSidebar}
//           >
//             <div className="logo-img">
//               <img src={logo.imgSrc} alt="react-logo" />
//             </div>
//           </Link>
//         );
//         logoText = (
//           <Link
//             to={logo.innerLink}
//             className="simple-text logo-normal"
//             onClick={this.props.toggleSidebar}
//           >
//             {logo.text}
//           </Link>
//         );
//       }
//     }
//     return (
//       <div className="sidebar" data={bgColor}>
//         <div className="sidebar-wrapper" style={{backgroundColor: "#00aeff"}} ref="sidebar">
//           {logoImg !== null || logoText !== null ? (
//             <div className="logo">
//               {logoImg}
//               {logoText}
//             </div>
//           ) : null}
//           <Nav>
//             {routes.map((prop, key) => {
//               if (prop.redirect) return null;
//               return (
//                 <li
//                   className={
//                     this.activeRoute(prop.path) +
//                     (prop.pro ? " active-pro" : "")
//                   }
//                   key={key}
//                 >
//                   <NavLink
//                     to={prop.layout + prop.path}
//                     className="nav-link"
//                     activeClassName="active"
//                     onClick={this.props.toggleSidebar}
//                   >
//                     <i className={prop.icon} /> 
//                     <p style={{"fontSize": "15px", "fontWeight": 600}}>{rtlActive ? prop.rtlName : prop.name}</p>
//                   </NavLink>
//                 </li>
//               );
//             })}
//           </Nav>
//         </div>
//       </div>
//     );
//   }
// }

// Sidebar.defaultProps = {
//   rtlActive: false,
//   bgColor: "#00aeff",
//   routes: [{}]
// };

// Sidebar.propTypes = {
//   // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
//   // insde the links of this component
//   rtlActive: PropTypes.bool,
//   bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
//   routes: PropTypes.arrayOf(PropTypes.object),
//   logo: PropTypes.shape({
//     // innerLink is for links that will direct the user within the app
//     // it will be rendered as <Link to="...">...</Link> tag
//     innerLink: PropTypes.string,
//     // outterLink is for links that will direct the user outside the app
//     // it will be rendered as simple <a href="...">...</a> tag
//     outterLink: PropTypes.string,
//     // the text of the logo
//     text: PropTypes.node,
//     // the image src of the logo
//     imgSrc: PropTypes.string
//   })
// };

// export default Sidebar;













/*eslint-disable*/
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, Collapse } from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getCollapseStates(props.routes);
  }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    const { rtlActive } = this.props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p style={{"fontSize": "15px", "fontWeight": 600}}>
                    {rtlActive ? prop.rtlName : prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon" style={{"fontSize": "15px", "fontWeight": 600}}>
                    {rtlActive ? prop.rtlMini : prop.mini}
                  </span>
                  <span className="sidebar-normal" style={{"fontSize": "15px", "fontWeight": 600}}>
                    {rtlActive ? prop.rtlName : prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} activeClassName="" onClick={this.props.closeSidebar}>
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p >{rtlActive ? prop.rtlName : prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon"  style={{backgroundColor: "#00aeff",fontSize: "16px", "fontWeight": 400}}>
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
                <span className="sidebar-normal"  style={{backgroundColor: "#00aeff",fontSize: "16px", "fontWeight": 400}}>
                  {rtlActive ? prop.rtlName : prop.name}
                </span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  componentDidMount() {
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar);
    }
  }
  componentWillUnmount() {
    // we need to destroy the false scrollbar when we navigate
    // to a page that doesn't have this component rendered
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    const { activeColor, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.closeSidebar}
        
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
   
            onClick={this.props.closeSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <NavLink
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.closeSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </NavLink>
        );
        logoText = (
          <NavLink
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.closeSidebar}


          >
            {logo.text}
          </NavLink>
        );
      }
    }
    return (
      <div className="sidebar" data={activeColor}>
        <div className="sidebar-wrapper" ref="sidebar" style={{backgroundColor: "#00aeff"}} >
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>{this.createLinks(this.props.routes)}</Nav>
          <li style={{color: "white",fontSize: "16px", paddingLeft: "11px"}}><a className="sidebar-wrapper" style={{color: "white", marginLeft: "-10px", fontWeight: 500}} href="http://ui.gydpost.com:3000/phishing_home.html">Phising</a></li>
        </div>
      </div>
    );
  }
}



export default Sidebar;
