import React, { Component } from "react";
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  SideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  SideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render () {
    return (
      <div>
        <Toolbar drawerToggleClicked={this.SideDrawerToggleHandler}/>
        <SideDrawer
        open={this.state.showSideDrawer}
        closed={this.SideDrawerCloseHandler}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout;