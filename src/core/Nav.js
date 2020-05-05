import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";
import {
  Navbar,
  NavItem,
  Icon,
  Dropdown,
  SideNavItem,
} from "react-materialize";

const Nav = () => {
  return (
    <Navbar
      alignLinks="right"
      className="deep-orange"
      brand={
        <span className="brand-logo" href="/">
          <Link to="/" className="btn btn-flat white-text deep-orange" node="a">
            DOJO BOOKS
          </Link>
        </span>
      }
      id="mobile-nav"
      sidenav={
        <Fragment>
          <SideNavItem
            className="deep-orange"
            user={{
              background: "",
              email: "abc@gmail.com",
              image: "https://placeimg.com/100/100/human",
              name: "Usern Name",
            }}
            userView
          />
          <li>
            <a href="#!" className="subheader">
              Account
            </a>
          </li>
          <SideNavItem href="#!icon" icon={<Icon>shopping_basket</Icon>}>
            My Orders
          </SideNavItem>
          <SideNavItem href="#!icon" icon={<Icon>settings</Icon>}>
            Update Account
          </SideNavItem>
          <li>
            <a href="#!" className="subheader">
              Contant Us
            </a>
          </li>
          <SideNavItem href="#!icon" icon={<Icon>phone</Icon>}>
            Call
          </SideNavItem>
          <SideNavItem href="#!icon" icon={<Icon>message</Icon>}>
            Message
          </SideNavItem>
          <li>
            <a href="#!" className="subheader">
              About Us
            </a>
          </li>
          <SideNavItem href="#!icon" icon={<Icon>people</Icon>}>
            Team
          </SideNavItem>
        </Fragment>
      }
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: "left",
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true,
      }}
    >
      {!isAuthenticated() && (
        <React.Fragment>
          <Link
            to="/signup"
            className="btn white deep-orange-text hide-on-med-and-down"
            node="a"
            waves="orange"
          >
            Sign Up
            <Icon left>person_add</Icon>
          </Link>
          <Link
            to="/signin"
            className="btn-flat deep-orange white-text hide-on-med-and-down"
            node="a"
            waves="light"
          >
            Sign In
            <Icon left>person</Icon>
          </Link>
        </React.Fragment>
      )}
      {isAuthenticated() && (
        <NavItem href="/cart" className="hide-on-med-and-down">
          <Icon>shopping_cart</Icon>
        </NavItem>
      )}

      {/* for admin */}
      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <Dropdown
          id="Dropdown_6"
          options={{
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          }}
          trigger={
            <NavItem href="#" className="hide-on-med-and-down">
              <Icon left>person</Icon>
              {isAuthenticated().user.name}
              <Icon right>arrow_drop_down</Icon>
            </NavItem>
          }
        >
          <Link node="a" to="/" className="deep-orange-text">
            <Icon left>note</Icon>My Account
          </Link>
          <Link node="a" to="/admin/dashboard" className="deep-orange-text">
            <Icon left>settings</Icon>Dashboard
          </Link>

          <Link
            onClick={() => {
              signout(() => {
                console.log(this.props);
              });
            }}
            className="deep-orange-text"
            to="#!"
          >
            <Icon left>lock</Icon>Sign Out
          </Link>
        </Dropdown>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <Dropdown
          id="Dropdown_6"
          options={{
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            container: null,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          }}
          trigger={
            <NavItem href="#" className="hide-on-med-and-down">
              <Icon left>person</Icon>
              {isAuthenticated().user.name}
              <Icon right>arrow_drop_down</Icon>
            </NavItem>
          }
        >
          <Link node="a" to="/user/dashboard" className="deep-orange-text">
            <Icon left>settings</Icon>My Account
          </Link>

          <Link
            onClick={() => {
              signout(() => {
                console.log(this.props);
              });
            }}
            className="deep-orange-text"
          >
            <Icon left>lock</Icon>Sign Out
          </Link>
        </Dropdown>
      )}
    </Navbar>
  );
};

export default withRouter(Nav);
