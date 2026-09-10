import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import Link from "next/link";

class Header extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });



  render() {
    const { activeItem } = this.state;

      return (
        <Menu style={{ marginTop: "10px" }} pointing secondary>
        <Link href="/" className="item">BrasilChain</Link>
        <Link href="/licitacoes" className="item">Licitações</Link>
      </Menu>
    );
  }
};

export default Header;
